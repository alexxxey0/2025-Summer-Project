<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\QueryException;

class AdminController extends Controller {

    // Send an email verification email
    protected function send_verification_email($email, $verification_token_hash) {
        // Generate verification link using user's unique verification token
        $verification_url = route('verify_email', ['token' => $verification_token_hash, 'email' => $email]);

        Mail::send('emails.verify_email', ['url' => $verification_url], function ($message) use ($email) {
            $message->to($email)->subject('Email address verification');
        });
    }

    public function edit_user(Request $request) {
        try {
            // Form validation
            $form_data = $request->validate([
                'name' => ['required', 'max:30'],
                'surname' => ['required', 'max:30'],
                'email' => ['required', 'email', 'max:50'],
                'phone_number' => ['nullable', 'max:20'],
                'profile_picture' => ['image', 'nullable', 'max:2048'],
                'role' => ['required', 'max:20']
            ]);

            $verification_token = Str::random(16);

            // Update user's information
            $user = User::where('user_id', $request->user_id)->first();

            // Save the profile picture to the server
            if (isset($request['profile_picture']) and !empty($request['profile_picture'])) {
                $profile_picture = $request->file('profile_picture');
                $profile_picture_path = $profile_picture->store('profile_pictures', 'public');
            } else $profile_picture_path = $user->profile_picture_path;

            $user->update([
                'name' => $form_data['name'],
                'surname' => $form_data['surname'],
                'phone_number' => $form_data['phone_number'] ?? null,
                'verification_token_hash' => bcrypt($verification_token),
                'profile_picture_path' => $profile_picture_path,
                'role' => $form_data['role']
            ]);

            if ($user->email !== $form_data['email']) {

                $user->update(['email' => $form_data['email']]);

                // Send an email confirmation link to user's email
                $this->send_verification_email($user['email'], $verification_token);
            }
            return to_route('user_profile_page', ['user_id' => $request->user_id])->with('flash_message', "User's details successfully updated!");
        } catch (QueryException $e) {
            if ($e->getCode() === '45000') {
                return back()->withErrors(['email' => 'This email is already confirmed by another user.'])->withInput();
            }
        }
    }
}

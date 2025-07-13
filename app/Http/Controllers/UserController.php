<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller {
    // Send an email verification email
    protected function send_verification_email($email, $verification_token) {
        // Generate verification link using user's unique verification token
        $verification_url = route('verify_email', ['token' => $verification_token]);

        Mail::send('emails.verify_email', ['url' => $verification_url], function ($message) use ($email) {
            $message->to($email)->subject('Email address verification');
        });
    }


    // Register a new user
    public function register(Request $request) {
        // Register an unverified user (user has to verify his email to become a verified user)

        // Form validation
        $form_data = $request->validate([
            'name' => ['required', 'max:30'],
            'surname' => ['required', 'max:30'],
            'email' => ['required', 'email', 'max:50', 'unique:users'],
            'phone_number' => ['nullable', 'max:20'],
            'profile_picture' => ['image', 'nullable', 'max:2048'],
            // Password must be at least 6 characters long, have at least one lowercase and one uppercase letter, and must have either a number or a symbol
            'password' => ['required', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/']
        ]);

        // Save the profile picture to the server
        if (isset($request['profile_picture'])) {
            $profile_picture = $request->file('profile_picture');
            $profile_picture_path = $profile_picture->store('profile_pictures', 'public');
        }

        // Generate a unique verification token
        do {
            $verification_token = Str::random(16);
            $token_exists = User::where('verification_token', $verification_token)->exists();
        } while ($token_exists);

        // Save unverified user to the database
        $unverified_user = User::create([
            'name' => $form_data['name'],
            'surname' => $form_data['surname'],
            'email' => $form_data['email'],
            'phone_number' => $form_data['phone_number'] ?? null,
            'password_hash' => bcrypt($form_data['password']),
            'verification_token' => $verification_token,
            'profile_picture_path' => $profile_picture_path ?? null
        ]);

        // Send an email confirmation link to user's email
        $this->send_verification_email($unverified_user['email'], $verification_token);

        return to_route('email_verification_notice');
    }

    // Verify user's email after they have clicked the link from the email we sent
    public function verify_email(Request $request) {
        // Find the unverified user by token
        $user = User::where('verification_token', $request->token)->first();

        if (!$user) {
            abort(404, 'Invalid or expired verification token.');
        }

        // Change email_confirmed field value to true
        $user->update(['email_confirmed' => true]);

        // Log the user in
        Auth::login($user);

        return to_route('home_page');
    }
}

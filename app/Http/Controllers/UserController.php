<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller {
    // Send an email verification email
    protected function send_verification_email($email, $verification_token_hash) {
        // Generate verification link using user's unique verification token
        $verification_url = route('verify_email', ['token' => $verification_token_hash, 'email' => $email]);

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
        if (isset($request['profile_picture']) and !empty($request['profile_picture'])) {
            $profile_picture = $request->file('profile_picture');
            $profile_picture_path = $profile_picture->store('profile_pictures', 'public');
        }

        $verification_token = Str::random(16);

        // Save unverified user to the database
        $unverified_user = User::create([
            'name' => $form_data['name'],
            'surname' => $form_data['surname'],
            'email' => $form_data['email'],
            'phone_number' => $form_data['phone_number'] ?? null,
            'password_hash' => bcrypt($form_data['password']),
            'verification_token_hash' => bcrypt($verification_token),
            'password_reset_token_hash' => null,
            'profile_picture_path' => $profile_picture_path ?? null
        ]);

        // Send an email confirmation link to user's email
        $this->send_verification_email($unverified_user['email'], $verification_token);

        return to_route('email_verification_notice');
    }

    // Verify user's email after they have clicked the link from the email we sent
    public function verify_email(Request $request) {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            abort(404, 'Invalid email address.');
        }

        $token_matches = Hash::check($request->token, $user['verification_token_hash']);

        if (!$token_matches) {
            abort(404, 'Invalid email verification token.');
        }

        // Change email_confirmed field value to true and nullify the verification token
        $user->update(['email_confirmed' => true, 'verification_token_hash' => null]);


        // Log the user in
        Auth::login($user);

        return to_route('home_page')->with('flash_message', "Your email address has been successfully verified!");
    }


    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); // prevents session fixation
            // Redirect the user to their originally intended destination after login.
            // If no intended URL exists in the session, redirect to the given fallback route (e.g., home_page).
            return redirect()->intended(route('home_page'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**

     * Log the user out of the application.

     */

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function send_password_reset_email(Request $request) {
        $request->session()->forget('flash_message');

        $request->validate([
            'email' => ['required', 'email']
        ]);

        $email = $request['email'];

        $email_exists = User::where('email', $email)->exists();

        if (!$email_exists) {
            return redirect()->back()->with('flash_message', "An account with this email address doesn't exist!");
        }

        $user = User::where('email', $email)->first();
        $password_reset_token = Str::random(16);
        $user->update(['password_reset_token_hash' => bcrypt($password_reset_token)]);

        // Generate password reset link using user's unique password reset token
        $password_reset_url = route('reset_password_page', ['token' => $password_reset_token, 'email' => $email]);

        Mail::send('emails.reset_password', ['url' => $password_reset_url], function ($message) use ($email) {
            $message->to($email)->subject('Reset your password');
        });

        return redirect()->back()->with('flash_message', "Password recovery instructions have been sent to your email.");
    }


    // Verify user's password reset token and redirect to password reset form if the token matches
    public function reset_password_page(Request $request) {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return redirect()->route('password_reset_request')->with('flash_message', "Invalid email address!");
        }

        $token_matches = Hash::check($request->token, $user['password_reset_token_hash']);

        if (!$token_matches) {
            return redirect()->route('password_reset_request')->with('flash_message', 'Invalid password reset token!');
        }

        return Inertia::render('PasswordResetForm', ['email' => $request->email, 'token' => $request->token]);
    }


    public function reset_password(Request $request) {
        $user = User::where('email', $request->email)->first();
        $token_matches = Hash::check($request->token, $user['password_reset_token_hash']);
        if (!$token_matches) {
            return redirect()->back()->with('flash_message', 'Invalid password reset token!');
        }

        $form_fields = $request->validate([
            // Password must be at least 6 characters long, have at least one lowercase and one uppercase letter, and must have either a number or a symbol
            'password' => ['required', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/']
        ]);


        $user->update(['password_hash' => bcrypt($form_fields['password'])]);

        // Nullify password reset token
        $user->update(['password_reset_token_hash' => null]);

        return to_route('home_page')->with('flash_message', "Your password has been successfully reset. You can now log in with your new password.");
    }
}

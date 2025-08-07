<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProductVariant;
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


    public function get_user_by_id(Request $request) {
        $user_exists = User::where('user_id', $request->user_id)->exists();

        if (!$user_exists) return redirect()->back()->with('flash_message', "User with this ID doesn't exist!");
        else {
            return to_route('user_profile_page', ['user_id' => $request->user_id]);
        }
    }


    public function get_product_by_id(Request $request) {
        $product_exists = Product::where('product_id', $request->product_id)->exists();

        if (!$product_exists) return redirect()->back()->with('flash_message', "Product with this ID doesn't exist!");
        else {
            return to_route('edit_product_page', ['product_id' => $request->product_id]);
        }
    }


    public function edit_product(Request $request) {

        // Form validation
        $request->validate([
            'name' => ['required', 'max:100'],
            'description' => ['required', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0', 'regex:/^\d+(\.\d{1,2})?$/'],
            'type' => ['required', 'max:30'],
            'color' => ['required', 'max:20'],
            'manufacturer' => ['required', 'max:30'],
            'gender' => ['required', 'max:1'],
            'age_category' => ['required', 'max:10'],
            'season' => ['required', 'max:10'],
            'in_stock' => ['required', 'array'],
            'in_stock.*' => ['required', 'integer', 'min:0']
        ]);

        $product = Product::where('product_id', $request->product_id)->first();
        $product->update($request->except('in_stock'));

        // Update the number of items of each size in stock
        $in_stock = $request->in_stock;
        foreach ($in_stock as $size => $items_in_stock) {
            $size_exists = ProductVariant::where('product_id', $request->product_id)->where('size', $size)->exists();

            // If there are no more items of the given size in stock that was in stock before, delete this size from the table
            if ($items_in_stock === 0 and $size_exists) {
                $product_variant = ProductVariant::where('product_id', $request->product_id)->where('size', $size)->first();
                $product_variant->delete();
                continue;
            }

            // If there are now >0 items in stock of a size that wasn't in stock before, add it to the table
            if ($items_in_stock > 0 and !$size_exists) {
                ProductVariant::create([
                    'product_id' => $request->product_id,
                    'size' => $size,
                    'in_stock' => $items_in_stock
                ]);
                continue;
            }

            // Else (size is already in stock and we change it to a non-zero value) just update number of items in stock
            if ($size_exists) {
                $product_variant = ProductVariant::where('product_id', $request->product_id)->where('size', $size)->first();
                $product_variant->update([
                    'in_stock' => $items_in_stock
                ]);
            }
        }

        return to_route('admin_panel', ['tab' => 'manage_products'])->with('flash_message', "Product's information successfully updated!");
    }
}

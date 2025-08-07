<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Controllers\ProductController;
use App\Models\ProductVariant;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home_page');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login_page');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register_page');

Route::post('/register', [UserController::class, 'register'])->name('register');

Route::post('/login', [UserController::class, 'login'])->name('login');

Route::get('/logout', [UserController::class, 'logout'])->name('logout');

Route::get('/verify_email/{email}/{token}', [UserController::class, 'verify_email'])->name('verify_email');

Route::get('/email_verification_notice', function (Request $request) {
    return Inertia::render('EmailVerificationNotice', ['action' => $request->action]);
})->name('email_verification_notice');

Route::get('/reset_password', function () {
    return Inertia::render('PasswordResetRequest');
})->name('password_reset_request');

Route::post('/send_password_reset_email', [UserController::class, 'send_password_reset_email'])->name('send_password_reset_email');

Route::get('/reset_password/{email}/{token}', [UserController::class, 'reset_password_page'])->name('reset_password_page');

Route::post('/reset_password', [UserController::class, 'reset_password'])->name('reset_password');

Route::get('/shop', [ProductController::class, 'all_products_page'])->name('all_products_page');

Route::get('/product/{product_id}', [ProductController::class, 'product_page'])->name('product_page');

Route::get('/my_profile', [UserController::class, 'my_profile_page'])->name('my_profile_page');

Route::get('/edit_personal_details', function () {
    return Inertia::render('EditPersonalDetails');
})->name('edit_personal_details_page');

Route::post('/edit_personal_details', [UserController::class, 'edit_personal_details'])->name('edit_personal_details');

Route::get('/change_password', function () {
    return Inertia::render('ChangePassword');
})->name('change_password_page');

Route::post('/change_password', [UserController::class, 'change_password'])->name('change_password');


// Admin routes
Route::middleware([EnsureUserHasRole::class . ':admin'])->group(function () {
    Route::get('/admin_panel', function (Request $request) {
        $users = User::all();
        $products = Product::all();
        $product_variants = ProductVariant::all();
        return Inertia::render('Admin/AdminPanel', ['users' => $users, 'products' => $products, 'product_variants' => $product_variants, 'tab' => $request->tab]);
    })->name('admin_panel');

    Route::get('/user_profile/{user_id}', function (Request $request) {
        $user = User::where('user_id', $request->user_id)->first();
        return Inertia::render('Admin/UserProfile', ['user' => $user]);
    })->name('user_profile_page');

    Route::get('/user_profile/{user_id}/edit', function (Request $request) {
        $user = User::where('user_id', $request->user_id)->first();
        return Inertia::render('Admin/EditUser', ['user' => $user]);
    });

    Route::post('/edit_user', [AdminController::class, 'edit_user'])->name('edit_user');

    Route::post('/get_user_by_id', [AdminController::class, 'get_user_by_id'])->name('get_user_by_id');

    Route::post('/get_product_by_id', [AdminController::class, 'get_product_by_id'])->name('get_product_by_id');

    Route::get('/product/{product_id}/edit', function (Request $request) {
        $product = Product::where('product_id', $request->product_id)->first();
        $product_variants = ProductVariant::where('product_id', $request->product_id)->get();
        $manage_products_link = route('admin_panel', ['tab' => 'manage_products']);
        return Inertia::render('Admin/EditProduct', ['product' => $product, 'product_variants' => $product_variants, 'manage_products_link' => $manage_products_link]);
    })->name('edit_product_page');

    Route::post('/edit_product', [AdminController::class, 'edit_product'])->name('edit_product');
});

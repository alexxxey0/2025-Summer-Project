<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

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

Route::get('/email_verification_notice', function () {
    return Inertia::render('EmailVerificationNotice');
})->name('email_verification_notice');

Route::get('/reset_password', function () {
    return Inertia::render('PasswordResetRequest');
})->name('password_reset_request');

Route::post('/send_password_reset_email', [UserController::class, 'send_password_reset_email'])->name('send_password_reset_email');

Route::get('/reset_password/{email}/{token}', [UserController::class, 'reset_password_page'])->name('reset_password_page');

Route::post('/reset_password', [UserController::class, 'reset_password'])->name('reset_password');

Route::get('/shop', [ProductController::class, 'all_products_page'])->name('all_products_page');

Route::get('/product/{product_id}', [ProductController::class, 'product_page'])->name('product_page');

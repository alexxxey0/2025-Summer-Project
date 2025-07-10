<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home_page');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login_page');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register_page');

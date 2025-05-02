<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/profile', function () {
    return Inertia::render('Profile');
});

Route::get('/panier', function () {
    return Inertia::render('Panier');
});

Route::get('/legal', function () {
    return Inertia::render('Legal');
});

Route::get('/terms', function () {
    return Inertia::render('Terms');
});

Route::fallback(function () {
    return Inertia::render('Page404');
});

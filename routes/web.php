<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserLogController;
use App\Http\Controllers\UserPreferenceController;



Route::resource('articles', ArticleController::class);
Route::resource('cartitems', CartItemController::class);
Route::resource('favorites', FavoriteController::class);
Route::resource('messages', MessageController::class);
Route::resource('orders', OrderController::class);
Route::resource('orderitems', OrderItemController::class);
Route::resource('sessions', SessionController::class);
Route::resource('users', UserController::class);
Route::resource('userlogs', UserLogController::class);
Route::resource('userpreferences', UserPreferenceController::class);



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

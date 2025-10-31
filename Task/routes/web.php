<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
// use App\Http\Middleware\AuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(AuthController::class)->group(function () {
    Route::middleware(['InAuth'])->group(function(){
        Route::get('/dashboard', 'dashboard')->name('dashboard');
        Route::get('/logout', 'logout')->name('user.logout.destroy');
    });
    Route::get('/registration', 'register')->name('user.register.get');
    Route::post('/registration', 'registerStore')->name('user.register.store');
    Route::get('/userLogin', 'login')->name('user.login.get');
    Route::post('/userLogin', 'loginStore')->name('user.login.store');
});

Route::controller(UserController::class)->group(function(){
    Route::middleware(['InAuth'])->group(function(){
        Route::get('/add', 'AddUser')->name('adduser');
        Route::post('/add', 'AddUserStore')->name('adduser.store');
        Route::get('/list', 'UserList')->name('list');
    });
});





// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';

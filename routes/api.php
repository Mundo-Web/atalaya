<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])
        ->name('logout');

    // Users routes
    Route::post('/users', [UsersController::class, 'save']);
    Route::post('/users/paginate', [UsersController::class, 'paginate']);
    Route::patch('/users/status', [UsersController::class, 'status']);
    Route::delete('/users/{id}', [UsersController::class, 'delete']);

    // Clients routes
    Route::post('/clients', [ClientController::class, 'save']);
    Route::post('/clients/paginate', [ClientController::class, 'paginate']);
    Route::patch('/clients/status', [ClientController::class, 'status']);
    Route::delete('/clients/{id}', [ClientController::class, 'delete']);

    // Projects routes
    Route::post('/projects', [ProjectController::class, 'save']);
    Route::post('/projects/paginate', [ProjectController::class, 'paginate']);
    Route::patch('/projects/status', [ProjectController::class, 'status']);
    Route::delete('/projects/{id}', [ProjectController::class, 'delete']);
});

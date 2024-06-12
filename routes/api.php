<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LandingFormController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
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
    Route::post('/users', [UserController::class, 'save']);
    Route::post('/users/paginate', [UserController::class, 'paginate']);
    Route::patch('/users/status', [UserController::class, 'status']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);

    // Users routes
    Route::get('/roles/user/{id}', [RoleController::class, 'byUser']);
    Route::post('/roles', [RoleController::class, 'save']);
    Route::post('/roles/paginate', [RoleController::class, 'paginate']);
    Route::patch('/roles/status', [RoleController::class, 'status']);
    Route::delete('/roles/{id}', [RoleController::class, 'delete']);

    // Users routes
    Route::post('/permissions', [PermissionController::class, 'save']);
    Route::post('/permissions/paginate', [PermissionController::class, 'paginate']);
    Route::get('/permissions/role/{id}', [PermissionController::class, 'byRole']);
    Route::patch('/permissions/role', [PermissionController::class, 'massiveByRole']);
    Route::patch('/permissions/status', [PermissionController::class, 'status']);
    Route::delete('/permissions/{id}', [PermissionController::class, 'delete']);

    // Clients routes
    Route::post('/clients', [ClientController::class, 'save']);
    Route::post('/clients/paginate', [ClientController::class, 'paginate']);
    Route::patch('/clients/status', [ClientController::class, 'status']);
    Route::patch('/clients/client-status', [ClientController::class, 'clientStatus']);
    Route::delete('/clients/{id}', [ClientController::class, 'delete']);

    // Types routes
    Route::post('/types', [TypeController::class, 'save']);
    Route::post('/types/paginate', [TypeController::class, 'paginate']);
    Route::patch('/types/status', [TypeController::class, 'status']);
    Route::delete('/types/{id}', [TypeController::class, 'delete']);

    // Statuses routes
    Route::post('/statuses', [StatusController::class, 'save']);
    Route::post('/statuses/paginate', [StatusController::class, 'paginate']);
    Route::patch('/statuses/status', [StatusController::class, 'status']);
    Route::delete('/statuses/{id}', [StatusController::class, 'delete']);

    // Projects routes
    Route::post('/projects', [ProjectController::class, 'save']);
    Route::post('/projects/paginate', [ProjectController::class, 'paginate']);
    Route::patch('/projects/status', [ProjectController::class, 'status']);
    Route::patch('/projects/project-status', [ProjectController::class, 'projectStatus']);
    Route::delete('/projects/{id}', [ProjectController::class, 'delete']);

    // Payments routes
    Route::post('/payments', [PaymentController::class, 'save']);
    Route::post('/payments/paginate', [PaymentController::class, 'paginate']);
    Route::get('/payments/project/{id}', [PaymentController::class, 'byProject']);
    Route::patch('/payments/status', [PaymentController::class, 'status']);
    Route::delete('/payments/{id}', [PaymentController::class, 'delete']);

    // Statuses routes
    Route::post('/landing-forms', [LandingFormController::class, 'save']);
    Route::post('/landing-forms/paginate', [LandingFormController::class, 'paginate']);
    Route::patch('/landing-forms/status', [LandingFormController::class, 'status']);
    Route::delete('/landing-forms/{id}', [LandingFormController::class, 'delete']);

    // Statuses routes
    Route::post('/tables', [TableController::class, 'save']);
    Route::post('/tables/paginate', [TableController::class, 'paginate']);
    Route::patch('/tables/status', [TableController::class, 'status']);
    Route::delete('/tables/{id}', [TableController::class, 'delete']);

    Route::get('/profile/{uuid}', [ProfileController::class, 'full']);
    Route::get('/profile/thumbnail/{uuid}', [ProfileController::class, 'full']);
    Route::post('/profile', [ProfileController::class, 'saveProfile']);
    Route::patch('/profile', [ProfileController::class, 'save']);
});

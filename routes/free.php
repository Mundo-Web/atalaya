<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::get('/token', fn() => response()->json(['token' => csrf_token()]));
Route::post('/clients', [ClientController::class, 'save']);

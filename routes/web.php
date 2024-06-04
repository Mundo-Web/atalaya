<?php

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

require __DIR__ . '/router.php';

Route::get(
    'login',
    fn () => Auth::check()
        ? redirect('/home')
        : Inertia::render('Login', [
            'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
            'token' => csrf_token()
        ])
)->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/', function (Request $request) {
        return redirect(
            session('url.intended', RouteServiceProvider::HOME),
        );
    });

    foreach (Router::components as $path => $page) {
        if (isset($page['adminto-instance']) && $page['adminto-instance']) {
            Route::get('/' . $path, function (Request $request) use ($page) {
                return Inertia::render($page['component'], [
                    'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
                    'token' => csrf_token(),
                    'session' => auth()->user()
                ]);
            })->name($path);
        }
    }
});

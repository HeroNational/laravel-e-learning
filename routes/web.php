<?php

use App\Models\Cour;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QrController;
use App\Http\Controllers\EnseignantController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('eclipse-interface.index',["cours"=>Cour::All()]);
})->name("home");


Route::get('/profile', function () {
    return view('profile');
})->middleware(['auth'])->name('profile');

Route::post('/profile',[EnseignantController::class,"create"])->middleware(['auth'])->name('profile');


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/qr', [QrController::class,'qr_create'])->middleware(["auth"])->name('qr-generate');
Route::post('/qr', function () {
    return view('qr');
})->name('qr-generate');
require __DIR__.'./my-routes.php';
//require __DIR__.'./admin.php';
require __DIR__.'./user_dashboard.php';
require __DIR__.'./eclipse.php';
require __DIR__.'./auth.php';

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QrController;
use App\Models\Cour;

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

Route::get('/qr', [QrController::class,'qr_create'])->middleware(["auth"])->name('qr-generate');
Route::post('/qr', function () {
    return view('qr');
})->name('qr-generate');
Route::get('/admin-my-course', [CourController::class,"adminmycourse"])->middleware(['auth'])->name('admin-course');

Route::get('/admin-my-course/{id}', [CourController::class,"showSingle"])->middleware(['auth'])->name('admin-courses-detail');

require __DIR__.'./my-routes.php';
//require __DIR__.'./admin.php';
require __DIR__.'./user_dashboard.php';
require __DIR__.'./eclipse.php';
require __DIR__.'./auth.php';

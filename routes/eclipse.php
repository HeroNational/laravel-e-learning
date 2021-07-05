<?php

use Illuminate\Support\Facades\Route;
/* Route::get('/courses/{id}', function () {
    return view('eclipse-interface.course-detail');
})->name("eclipse-course-detail");

Route::get('/courses/', function () {
    return view('eclipse-interface.courses');
})->name("eclipse-courses");
 */
Route::get('/contact', function () {
    return view('eclipse-interface.contact');
})->name("contact");


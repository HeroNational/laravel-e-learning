<?php

use App\Models\Cour;
use Illuminate\Http\Request;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourController;
use App\Http\Controllers\LessonController;

/* Lessons */
Route::get('/edit-lesson',[LessonController::class,"editlesson"])->middleware(['auth'])->name('edit-lesson');
Route::post('/edit-lesson', [LessonController::class,"submitlesson"])->middleware(['auth'])->name('edit-lesson');
Route::get('/courses/{name}/{id}', [LessonController::class,"showLesson"])->middleware(['auth'])->name('lesson');

/*courses*/
Route::get('/edit-course', [CourController::class,"editcourse"])->middleware(['auth'])->name('edit-course');
Route::post('/edit-course', [CourController::class,"submitEditCourse"])->middleware(['auth'])->name('edit-course');
Route::get('/courses/{id}', [CourController::class,"showSingle"])->middleware(['auth'])->name('course');
//Route::get('/courses/', [CourController::class,"show"])->middleware(['auth'])->name('courses');
Route::get('/courses', function () {
    return view('all-courses',["courses"=>Cour::all()]);
})->name('courses');



/* Route::get('/admin-my-course', [CourController::class,"adminmycourse"])->middleware(['auth'])->name('admin-course');

Route::get('/admin-my-course/{id}', [CourController::class,"showSingle"])->middleware(['auth'])->name('admin-courses-detail');
 */

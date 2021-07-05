<?php
use App\Models\Cour;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\LessonController;

/* Route::get('/all-courses', function () {
    return view('all-courses',["courses"=>Cour::all()]);
})->name('all-courses');
 */
Route::get('/courses/{name}/', function () {
    return view('courses');
})->middleware(['auth'])->name('course-detail');


Route::get('/my-courses', function () {
    return view("my-courses");
})->middleware(['auth'])->name('my-courses');

Route::get('/profile', function () {
    return view('profile');
})->middleware(['auth'])->name('profile');

Route::post('/profile',[EnseignantController::class,"create"])->middleware(['auth'])->name('profile');


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

/* Route::get('/my-courses/{id}/', function () {
        return view('admin-courses',["course"=>Cour::where('enseignant_id',$id)->get()]
    );
})->middleware(['auth'])->name('course-detail');
 */

Route::get('/courses/{name}/{id}', [LessonController::class,"showLesson"])->middleware(['auth'])->name('course-detail');

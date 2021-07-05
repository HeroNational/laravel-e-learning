<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\Leçon;
use Illuminate\Http\Request;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{

    /**
     * Show the form for creating a new lesson.
     *
     * @return \Illuminate\Http\Response
     */
    public function submitlesson(Request $request)
    {

        if(isset(Auth::user()->enseignant->id)){
            $request->validate([
                "titre"=>"required",
                "descriptif"=>"string",
                "courseid"=>"integer",
                "editorvalue"=>"required",
            ]);
            function lessonimg($request){
                return $request->lessonimg?Storage::disk("public")->put("lessons",$request->lessonimg):"lessons/default".mt_rand(0,2).".png";
            }
            Leçon::create([
                "title"=>"$request->titre",
                "descriptif"=>"$request->descriptif",
                "cour_id"=>"$request->courseid",
                "objectif"=>"$request->objectif",
                "image"=>lessonimg($request),
                "contenu"=>new HtmlString($request->editorvalue),
            ]);;
            return view('dashboard');
        }else{
            return view("dashboard");
        }
    }

    /**
     * Show the form for creating a new lesson.
     *
     * @return \Illuminate\Http\Response
     */
    public function editlesson(Request $request)
    {

        if(isset(Auth::user()->enseignant->id)){
            return view("admin-publish-lesson",["cours"=>Cour::where('enseignant_id',Auth::user()->enseignant->id)->get() ]);
        }else{
            return view("dashboard");
        }
    }
      /**
     * Show the form for showing a lesson.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLesson($name,$id)
    {

//        if(isset(Auth::user()->enseignant->id)){
              $leçon=Leçon::where('id',"like",$id)->firstOrFail();
              return view('course-detail',["leçon"=>$leçon]);
//        }else{
//            $leçon=Leçon::where('id',"like",$id)->firstOrFail();
//            return view('course-detail',["leçon"=>$leçon]);
 //       }
    }

}

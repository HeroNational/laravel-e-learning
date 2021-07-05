<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\User;
use App\Models\Leçon;
use App\Models\Categorie;
use App\Models\Enseignant;
use Illuminate\Http\Request;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CourController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    /**
     * Submit an edited course to publish.
     *
     * @return \Illuminate\Http\Response
     */


     public function submitEditCourse(Request $request)
    {
        $request->validate([
            "titre"=>"string",
            'descriptif'=>"string|required",
            "objectif"=>"string|required",
            "competences"=>"required|string",
            "difficulte"=>"integer|max:10",
            "cout"=>"integer",
        ]);
         function courseimg(Request $request){
            return $request->courseimg?Storage::disk("public")->put("courses",$request->courseimg):"courses/default".mt_rand(0,2).".png";
        }
        Cour::create([
            'title'=>$request->titre,
            'enseignant_id'=>Auth::user()->enseignant->id,
            'descriptif'=>$request->descriptif,
            'image'=>courseimg($request),
            "objectif"=>$request->objectif,
            "competences_requises"=>$request->competences,
            "niveau_de_difficulte"=>$request->difficulte,
            "coût_du_cours"=>$request->cout,
            "created_at"=>now(),
        ]);
        return view(
            "admin-courses",
            [
                "courses"=>Cour::where('enseignant_id',Auth::user()->enseignant->id)->get()
            ]);
    }

    /**
     * Show the form for creating a new course.
     *
     * @return \Illuminate\Http\Response
     */
    public function editcourse()
    {
        if(isset(Auth::user()->enseignant->id)){
            return view("admin-publish-course",["categories"=>Categorie::All()]);
        }else{
            return view("dashboard");
        }
    }



    /**
     * Show the form for showing a single course.
     *
     * @return \Illuminate\Http\Response
     */
    public function showSingle($id)
    {

        if(isset(Auth::user()->enseignant->id)){
            $course=Cour::where('id',$id)->firstOrFail();
            return view('admin-courses-detail',["course"=>$course]);
        }else{
            return view("dashboard");
        }
    }


    /**
     * Show the form for creating a new course.
     *
     * @return \Illuminate\Http\Response
     */
    public function adminmycourse()
    {

        if(isset(Auth::user()->enseignant->id)){
            return view('admin-courses',["courses"=>Cour::where('enseignant_id',Auth::user()->enseignant->id)->firstOrFail()->get()]);
        }else{
            return view("dashboard");
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cour  $cour
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return view('admin-courses',["courses"=>Cour::All()]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cour  $cour
     * @return \Illuminate\Http\Response
     */
    public function edit(Cour $cour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cour  $cour
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cour $cour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cour  $cour
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cour $cour)
    {
        //
    }
}

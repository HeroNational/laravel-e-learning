<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\CssSelector\Parser\Token;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            "pseudo"=>"unique:users|required|string|max:15",
            'email' => 'required|string|email|max:255|unique:users',
            "country"=>"required",
            "gender"=>"required",
            //"role"=>"required",
            "phone"=>"required",
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            "avatar"=>"image",
        ]);
        //Storage::disk("local")->put("avatar/",$request->avatar);
        //$name=Storage::disk("local")->put("avatar",$request->avatar);
        //dd($request->file("avatar")->store("avatar"));
        //$url=$request->avatar->storeAs("avatar",$request->email.".".$request->name.".".$request->country.".jpg");
        //$url=$request->avatar->store("avatar");
        /* $url=$request
        ->avatar
        ->storeAs(
            "avatar",
            $request->email.".".$request->name.".".$request->country.".".$request->avatar->extension(),
            "public"
        ); */

        //dd($request->avatar);
        function avatar(Request $request){
            if($request->gender=="male"){
                return $request->avatar?Storage::disk("public")->put("avatar",$request->avatar):"avatar/male/".mt_rand(1,47).".png";
            }if($request->gender=="female"){
                return $request->avatar?Storage::disk("public")->put("avatar",$request->avatar):"avatar/female/".mt_rand(1,19).".png";
            }else{
                return $request->avatar?Storage::disk("public")->put("avatar",$request->avatar):"avatar/other/".mt_rand(1,39).".png";
            }
        }
        $user = User::create([
            'nom_utilisateur' => $request->name,
            'pays' => $request->country,
            'email' => $request->email,
            'pseudo' => $request->pseudo,
            'genre' => $request->gender,
            'telephone' => $request->phone,
            "biographie"=>$request->biographie,
            //'role' => $request->role,
            'remember_token'=> str_shuffle(Str::random(5).$request->name.now()),
            'avatar'=> avatar($request),
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect(RouteServiceProvider::HOME);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}

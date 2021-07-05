<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QrController extends Controller
{
    public function qr_create(){
        return view('qr',['Qrsize'=>300]);
    }
    public function qr_generate(Request $request){
        return view('qr',["request",$request]);
    }
}

<?php

namespace App\Models;

use App\Models\Cour;
use App\Models\User;
use App\Models\Leçon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enseignant extends Model
{
    use HasFactory;

    protected $fillable=[
        "formation",
        "profession",
        "user_id",
        "updated_at"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function cours(){
        return $this->hasMany(Cour::class);
    }

    public function leçons(){
        return $this->hasMany(Leçon::class);
    }
}

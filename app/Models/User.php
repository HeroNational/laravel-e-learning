<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Cour;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom_utilisateur',
        'email',
        "pays",
        "avatar",
        "ville_residence",
        "telephone",
        "biographie",
        "newsletter",
        'password',
        "role",
        "genre",
        'email_verified_at',
        "pseudo",
        'remember_token',
        "updated_at"
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        //'password',
        //'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function enseignant(){
        return $this->hasOne(Enseignant::class);
    }
    
    public function administrateur(){
        return $this->hasOne(Administrateur::class);
    }
    public function cours(){
        return $this->belongsToMany(Cour::class);
    }
}

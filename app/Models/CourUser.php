<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourUser extends Model
{
    use HasFactory;
    protected $fillable=[
        "user_id",
        "cour_id",
        "payement"
    ];

/*     public function users(){
        return $this->belongsTo(User::class);
    }
 */
    public function cours(){
        return $this->hasMany(Cour::class);
    }

    public function users(){
        return $this->hasMany(User::class);
    }

    public function leçons(){
        return $this->belongsToMany(Leçon::class);
    }
}

<?php

namespace App\Models;

use App\Models\Cour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Leçon extends Model
{
    use HasFactory;

/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'idLeçon',
        'title',
        "objectif",
        "contenu",
        "descriptif",
        "image",
        "cour_id",
        "updated_at",
        "enseignant_id",
    ];
    public function cour(){
        return $this->belongsTo(Cour::class);
    }
}

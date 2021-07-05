<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesleconTableCategorieLecon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categorie_leçon', function (Blueprint $table) {
            $table->id();
            $table->foreignId("categorie_id")->constrained()->onDelete("cascade");
            $table->foreignId("leçon_id")->constrained()->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categorie_leçon');
    }
}

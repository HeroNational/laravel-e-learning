<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeçonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leçons', function (Blueprint $table) {
            $table->id();
            $table->foreignId("cour_id")->constrained()->onDelete("cascade");
            $table->string("title");
            $table->text("descriptif")->nullable();
            $table->string("image");
            $table->text("objectif")->nullable();
            $table->text("contenu");
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
        Schema::dropIfExists('leçons');
    }
}

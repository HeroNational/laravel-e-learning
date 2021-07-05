<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursleconTableCourLecon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cour_leçon', function (Blueprint $table) {
            $table->id();
            $table->foreignId("cour_id")->constrained()->onDelete("cascade");
            $table->foreignId("leçon_id")->constrained()->onDelete("cascade");
            $table->date("date_ajout");
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
        Schema::dropIfExists('cour_leçon');
    }
}

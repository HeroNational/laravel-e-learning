<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nom_utilisateur');
            $table->string('email')->unique();
            $table->string('pays')->nullable();
            $table->enum('genre',['Female','male','Transgender']);
            $table->string('ville_residence')->nullable();
            $table->string('telephone',20)->nullable();
            $table->text('biographie')->nullable();
            $table->boolean('newsletter')->default("0");
            $table->string('password');
            $table->enum('role',["administrator","student","teacher"])->default("student");
            $table->timestamp('email_verified_at')->nullable();
            $table->string('pseudo')->nullable()->unique();
            $table->string("avatar")->default("avatar/default.png");
            $table->rememberToken()->unique("token");
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
        Schema::dropIfExists('users');
    }
}

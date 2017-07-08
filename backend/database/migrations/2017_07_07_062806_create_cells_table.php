<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCellsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('cells', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('pressed');
      $table->integer('has_mine');
      $table->integer('flag');
      $table->integer('x');
      $table->integer('y');
      $table->integer('game_id');
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
    Schema::dropIfExists('cells');
  }
}

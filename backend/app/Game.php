<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
  public function cells() {
    return $this->hasMany("App\Cell");
  }
}

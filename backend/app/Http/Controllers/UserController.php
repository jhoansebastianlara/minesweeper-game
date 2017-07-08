<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller {
  /**
   * generate token for user
   *
   * @param  Request  $request
   * @return Response
   */
  public function login(Request $request) {
    // get body parameters
    $username = $request->input('username');
    // Find user with username
    $user = User::where('username', $username)->first();

    $games = [];
    if ($user) {
      // Retrieve games for user
      $games = $user->games;
    } else {
      // Create user for new username
      $user = new User;
      $user->username = $username;
      $user->save();
    }

    // Creating a token for user
    $token = $user->createToken('MineSweeperToken')->accessToken;

    // Response
    return [
      "user"=>[
        "id"=>$user->id,
        "games"=>$games
      ],
      "token"=>$token
    ];
  }
}

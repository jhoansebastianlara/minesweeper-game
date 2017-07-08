<?php

namespace App\Http\Controllers;

use App\Game;
use App\Cell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class GameController extends Controller {
  /**
   * Obtain a list of the games.
   *
   * @param Request $request
   * @return Response
   */
  public function index(Request $request) {
    // load games for logged user
    $games = Game::where('user_id', $request->user()->id)->get();
    return ['games'=>$games];
  }

  /**
   * Create a new game for logged user.
   *
   * @param Request $request
   * @return Response
   */
  public function create(Request $request) {

    $rows = $request->input('rows');
    $columns = $request->input('columns');
    $cells = $request->input('cells');

    // Verify inputs
    if (!$rows || !$columns || !$cells) {
      return [ 'error' => [
        'code' => Config::get('constants.http_status.BAD_REQUEST'),
        'message' => Config::get('constants.responses.MISSING_FIELDS_OR_WRONG_INPUTS')
      ]];
    }

    $userId = $request->user()->id;

    // Build a new game
    $game = new Game;
    $game->user_id = $userId;
    $game->status = 0;
    $game->time = 0;
    $game->score = 0;
    $game->rows = $rows;
    $game->columns = $columns;

    // Store game
    $game->save();

    // Next, store cells for game

    // transform cells matrix, from string to object
    $cells = json_decode($cells);

    $createdCells = [];
    // Build each cell for new game
    foreach ($cells as $cellRow) {
      foreach ($cellRow as $cell) {
        $newCell = new Cell;

        $newCell->game_id = $game->id;
        $newCell->pressed = 0;
        $newCell->has_mine = $cell->has_mine;
        $newCell->flag = 0;
        $newCell->x = $cell->x;
        $newCell->y = $cell->y;

        $newCell->save();

        $createdCells[] = [
          'id'=>$newCell->id,
          'x'=>$newCell->x,
          'y'=>$newCell->y,
        ];
      }
    }

    // Response ids of created elements
    return [
      'game'=>[
        'id'=>$game->id,
        'cells'=>$createdCells
      ]
    ];
  }

  /**
   * Get the specified game.
   *
   * @param Request $request
   * @param  Game  $game
   * @return Response
   */
  public function show(Request $request, Game $game) {
    // Verify owner
    if ($game->user_id != $request->user()->id) {
      return [ 'error' => [
        'code' => Config::get('constants.http_status.FORBIDDEN'),
        'message' => 'User cannot access this game'
      ]];
    }
    // Retrieve cells for game
    $game->cells;
    return [
      'game'=>$game
    ];
  }

  /**
   * Update the specified game: time, score and its cells.
   *
   * @param  Request $request
   * @param  Game $game
   * @return Response
   */
  public function updateWithCells(Request $request, Game $game) {

    $time = $request->input('time');
    $score = $request->input('score');
    $cells = $request->input('cells');

    // Verify owner
    if ($game->user_id != $request->user()->id) {
      return [ 'error' => [
        'code' => Config::get('constants.http_status.FORBIDDEN'),
        'message' => 'User cannot update this game'
      ]];
    }

    // Verify inputs
    if (!$time || !$score || !$cells) {
      return [ 'error' => [
        'code' => Config::get('constants.http_status.BAD_REQUEST'),
        'message' => Config::get('constants.responses.MISSING_FIELDS_OR_WRONG_INPUTS')
      ]];
    }

    $game->time = $time;
    $game->score = $score;

    // Update time and score for game
    $game->save();

    // Next, update cells for game

    // transform cells array, from string to object
    $cells = json_decode($cells);

    // Update each revealed cell
    foreach ($cells as $cell) {
      $updateData = [];
      $needsUpdate = false;
      // Verify if there is comething to update in cell
      if (property_exists($cell, 'flag')) {
        $updateData['flag'] = $cell->flag;
        $needsUpdate = true;
      }
      if (property_exists($cell, 'pressed')) {
        $updateData['pressed'] = $cell->pressed;
        $needsUpdate = true;
      }

      if ($needsUpdate) {
        // Update cell info
        Cell::where('id', $cell->id)->update($updateData);
      }
    }

    return $game;
  }

  /**
   * Update status for the game.
   *
   * @param  Request $request
   * @param  Game $game
   * @return Response
   */
  public function update(Request $request, Game $game) {
    $status = $request->input('status');

    // Verify owner
    if ($game->user_id != $request->user()->id) {
      return [ 'error' => [
        'code' => Config::get('constants.http_status.FORBIDDEN'),
        'message' => 'User cannot update this game'
      ]];
    }

    // Verify inputs
    if (!$status) {
      return [ 'error' => [
        'code' => Config::get('constants.http_status.BAD_REQUEST'),
        'message' => Config::get('constants.responses.MISSING_FIELDS_OR_WRONG_INPUTS')
      ]];
    }

    $game->status = $status;

    // Update the status for game
    $game->save();

    return $game;
  }
}

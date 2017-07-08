<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth', 'UserController@login');

// Game endpoints
Route::get('games', 'GameController@index')->middleware('auth:api');
Route::get('games/{game}', 'GameController@show')->middleware('auth:api');
Route::post('games', 'GameController@create')->middleware('auth:api');
Route::put('games/{game}/cells', 'GameController@updateWithCells')->middleware('auth:api');
Route::put('games/{game}', 'GameController@update')->middleware('auth:api');

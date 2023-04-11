<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'api','cors'], function ($router) {
    Route::post('/register', 'AuthController@register');
    Route::post('/login', 'AuthController@login');
});

Route::group(['middleware' => 'myAuth'], function ($router) {
    Route::get('/getRankLevel', 'RankController@getRankLevel');
    Route::post('/changeEmail', 'SettingsController@changeEmail');
    Route::post('/changePassword', 'SettingsController@changePassword');
    Route::get('/getCategories', 'ShopController@getCategories');
    Route::get('/getShopItems', 'ShopController@getShopItems');
    Route::get('/getCharacters', 'ShopController@getCharacters');
});
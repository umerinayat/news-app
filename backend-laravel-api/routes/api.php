<?php

use App\Http\Controllers\Api\ArticlesAggregatorController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsAggregatorController;
use App\Http\Controllers\Api\SourcesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/articles', [ArticlesAggregatorController::class, 'searchAndFilterArticles']);
    Route::post('/sources', [SourcesController::class, 'getSources']);
    Route::get('/sources-meta', [SourcesController::class, 'getSourcesMeta']);
    Route::post('/news', [NewsAggregatorController::class, 'personalizedNewsFeed']);
    Route::get('/news-settings', [NewsAggregatorController::class, 'getNewsSettings']);
    Route::post('/news-settings', [NewsAggregatorController::class, 'saveNewsSettings']);
    
    // Logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});


// Register user
Route::post('/register', [AuthController::class, 'register']);
// login user
Route::post('/login', [AuthController::class, 'login']);

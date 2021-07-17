<?php

use App\Http\Controllers\PastaController;
use App\Http\Controllers\UserPastaController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route for user's pastas //
// Last 10
Route::middleware('auth:sanctum')->get("/my-pasta", [UserPastaController::class, 'index']);
// Pages
Route::middleware('auth:sanctum')->get('/my-pasta/{page}', [UserPastaController::class, 'show']);

// Route for all public and unlisted pastas
Route::apiResources([
    'pasta' => PastaController::class,
]);
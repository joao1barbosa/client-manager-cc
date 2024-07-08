<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CardController;

Route::apiResource('clients', ClientController::class);
Route::apiResource('cards', CardController::class);

<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AddressController;

Route::apiResource('clients', ClientController::class);
Route::apiResource('cards', CardController::class);
Route::apiResource('addresses', AddressController::class);

<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AddressController;

Route::apiResource('clients', ClientController::class)->parameters([
    'clients' => 'uuid'
]);
Route::apiResource('cards', CardController::class);
Route::apiResource('addresses', AddressController::class)->parameters([
    'addresses' => 'client_uuid'
]);

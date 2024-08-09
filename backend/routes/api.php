<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AddressController;

Route::apiResource('clients', ClientController::class)->parameters([
    'clients' => 'uuid'
]);
Route::apiResource('addresses', AddressController::class)->parameters([
    'addresses' => 'client_uuid'
]);
Route::apiResource('cards', CardController::class);
Route::get('/clients/{client_uuid}/cards', [CardController::class, 'indexByClient']);

<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\AddressController;

Route::apiResource('addresses', AddressController::class)->parameters([
    'addresses' => 'client_uuid'
]);

Route::apiResource('cards', CardController::class);
Route::get('/clients/{client_uuid}/cards', [CardController::class, 'indexByClient']);

Route::get('/clients/search', [ClientController::class, 'search']);

Route::get('/clients', [ClientController::class, 'index']);
Route::get('/clients/{uuid}', [ClientController::class, 'show']);
Route::post('/clients', [ClientController::class, 'store']);
Route::put('/clients/{uuid}', [ClientController::class, 'update']);
Route::delete('/clients/{uuid}', [ClientController::class, 'destroy']);

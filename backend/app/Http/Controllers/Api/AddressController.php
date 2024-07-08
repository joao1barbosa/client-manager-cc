<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cep' => 'required|string|max:8',
            'logradouro' => 'required|string|max:255',
            'unidade' => 'nullable|string|max:20',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'required|string|max:50',
            'localidade' => 'required|string|max:50',
            'uf' => 'required|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $address = Address::create($request->all());
        return response()->json($address, 201);
    }

    public function show($uuid)
    {
        $address = Address::find($uuid);

        if (is_null($address)) {
            return response()->json([], 404);
        }

        return response()->json($address, 200);
    }

    public function update(Request $request, $uuid)
    {
        $address = Address::find($uuid);

        if (is_null($address)) {
            return response()->json(['message' => 'Endereço não encontrado'], 404);

        }

        $validator = Validator::make($request->all(), [
            'cep' => 'required|string|max:8',
            'logradouro' => 'required|string|max:255',
            'unidade' => 'nullable|string|max:20',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'required|string|max:50',
            'localidade' => 'required|string|max:50',
            'uf' => 'required|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $address->update($request->all());
        return response()->json($address, 200);
    }

}

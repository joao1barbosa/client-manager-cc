<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function index()
    {
        return response()->json(Address::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cep' => 'required|string|max:8',
            'endereco' => 'required|string|max:255',
            'numero' => 'required|string|max:20',
            'complemento' => 'required|string|max:255',
            'bairro' => 'required|string|max:50',
            'cidade' => 'required|string|max:50',
            'uf' => 'required|string|max:2',
        ]);
    }

    public function show($uuid)
    {
        $address = Address::find($uuid);

        if (is_null($address)) {
            return response()->json(['message' => 'Endereço não encontrado'], 404);
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
            'cep' => 'sometimes|string|max:8',
            'endereco' => 'sometimes|string|max:255',
            'numero' => 'sometimes|string|max:20',
            'complemento' => 'sometimes|string|max:255',
            'bairro' => 'sometimes|string|max:50',
            'cidade' => 'sometimes|string|max:50',
            'uf' => 'sometimes|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $address->update($request->all());
        return response()->json($address, 200);
    }

    public function destroy($uuid)
    {
        $address = Address::find($uuid);

        if (is_null($address)) {
            return response()->json(['message' => 'Endereço não encontrado'], 404);
        }

        $address->delete();
        return response()->json(['mensage' => 'Endereço não encontrado'], 200);
    }
}

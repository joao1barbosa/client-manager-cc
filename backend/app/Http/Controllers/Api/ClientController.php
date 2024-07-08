<?php
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'aniversario' => 'required|string|max:10',
            'telefone' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cliente = Client::create($request->all());
        return response()->json($cliente, 201);

    }

    public function show($uuid)
    {
        $cliente = Client::find($uuid);

        if (is_null($cliente)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        return response()->json($cliente, 200);
    }

    public function update(Request $request, $uuid)
    {
        $cliente = Client::find($uuid);

        if (is_null($cliente)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|string|max:255',
            'sobrenome' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:clients',
            'aniversario' => 'sometimes|string|max:10',
            'telefone' => 'sometimes|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cliente->update($request->all());
        return response()->json($cliente, 200);
    }

    public function destroy($uuid)
    {
        $cliente = Client::find($uuid);

        if (is_null($cliente)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        $cliente->delete();
        return response()->json(['message' => 'Cliente deletado com sucesso'], 204);
    }
}

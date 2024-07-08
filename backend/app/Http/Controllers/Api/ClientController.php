<?php
namespace App\Http\Controllers\Api;

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

        $client = Client::create($request->all());
        return response()->json($client, 201);

    }

    public function show($uuid)
    {
        $client = Client::find($uuid);

        if (is_null($client)) {
            return response()->json([], 404);
        }
        return response()->json($client, 200);
    }

    public function update(Request $request, $uuid)
    {
        $client = Client::where('uuid', $uuid)->first();

        if (is_null($client)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|string|max:255',
            'sobrenome' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:clients,email,' . $client->id . ',uuid',
            'aniversario' => 'sometimes|string|max:10',
            'telefone' => 'sometimes|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $client->update($request->all());
        return response()->json($client, 200);
    }

    public function destroy($uuid)
    {
        $client = Client::where('uuid', $uuid)->first();

        if (is_null($client)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        $client->delete();
        return response()->json(['message' => 'Cliente deletado com sucesso'], 204);
    }
}

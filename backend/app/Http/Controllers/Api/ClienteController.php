<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    public function index()
    {
        return response()->json(Cliente::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clientes',
            'aniversario' => 'required|date',
            'telefone' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cliente = Cliente::create($request->all());
        return response()->json($cliente, 201);
    }

    public function show($uuid)
    {
        $cliente = Cliente::find($uuid);

        if (is_null($cliente)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        return response()->json($cliente, 200);
    }

    public function update(Request $request, $uuid)
    {
        $cliente = Cliente::find($uuid);

        if (is_null($cliente)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|string|max:255',
            'sobrenome' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:clientes,email,' . $uuid,
            'aniversario' => 'sometimes|date',
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
        $cliente = Cliente::find($uuid);

        if (is_null($cliente)) {
            return response()->json(['message' => 'Cliente não encontrado'], 404);
        }

        $cliente->delete();
        return response()->json(['message' => 'Cliente deletado com sucesso'], 204);
    }
}

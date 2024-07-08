<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{
    public function index()
    {
        return response()->json(Card::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'numero' => 'required|unique:cards',
            'validade' => 'required',
            'cvv' => 'required',
            'client_uuid' => 'required|exists:clients,uuid',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $card = Card::create($request->all());
        return response()->json($card, 201);
    }

    public function show($numero)
    {
        $card = Card::find($numero);

        if (is_null($card)) {
            return response()->json(['message' => 'Cartão não encontrado'], 404);
        }

        return response()->json($card, 200);
    }

    public function update(Request $request, $numero)
    {
        $card = Card::find($numero);

        $validator = Validator::make($request->all(), [
            'numero' => 'sometimes|string|max:20',
            'validade' => 'sometimes|string|max:6',
            'cvv' => 'sometrimes|string|max:3',
        ]);

        $card->update($request->all());

        return response()->json($card, 200);
    }

    public function destroy($numero)
    {
        $card = Card::find($numero);

        if (is_null($card)) {
            return response()->json(['message' => 'Cartão não encontrato'], 404);
        }

        $card->delete();
        return response()->json(['message' => 'Cartão deletado com sucesso'], 200);
    }
}

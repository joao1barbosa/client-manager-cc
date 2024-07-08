<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{
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

    public function show($client_uuid)
    {
        $cards = Card::where('client_uuid', $client_uuid)->get();

        if ($cards->isEmpty()) {
            return response()->json(['message' => 'Nenhum cartão encontrado para este cliente'], 404);
        }

        return response()->json($cards, 200);
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

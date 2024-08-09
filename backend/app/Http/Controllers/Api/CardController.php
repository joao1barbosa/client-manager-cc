<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CardRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Card;
use Exception;
use Illuminate\Support\Facades\DB;


class CardController extends Controller
{
    /**
     * Lista os cartões vinculados a um cliente específico com paginação.
     *
     * @example GET /api/clients/{client_uuid}/cards?per_page=15&page=2
     * @param  string $client_uuid O uuid do cliente para filtrar os cartões.
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByClient(Request $request, $client_uuid): JsonResponse
    {
        /**
         * Verifica se existe cartões vinculados a este cliente e pagina
         * a resposta de acordo com o que foi passado na requisição, se não
         * utiliza 20 como padrão.
         */
        $cards = Card::where('client_uuid', $client_uuid)
            ->paginate($request->input('per_page', 20));

        if ($cards->isEmpty()) {
            return response()->json([
                'message' => "Nenhum cartão encontrado para o cliente com o UUID fornecido.",
            ], 404);
        }

        return response()->json($cards, 200);
    }

    /**
     * Cria novo cartão com os dados fornecidos na requisição.
     *
     * @example POST /api/cards/ Enviando o json com os dados do cartão a ser criado.
     * @param  \App\Http\Requests\ClientRequest  $request O objeto de requisição contendo os dados do cartão.
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CardRequest $request): JsonResponse
    {
        // Inicia a operação
        DB::beginTransaction();

        try {
            // Cadastra cliente no banco de dados
            $card = Card::create([
                'numero' => $request->numero,
                'nome' => $request->nome,
                'validade' => $request->validade,
                'cvv' => $request->cvv,
                'client_uuid' => $request->client_uuid,
            ]);

            // Conclui a operação
            DB::commit();

            return response()->json($card, 201);
        } catch (Exception $e) {
            // Não conclui a operação
            DB::rollBack();

            return response()->json([
                'message' => "Cartão não cadastrado!",
            ], 400);
        }
    }

    /**
     * Exclui um cartão no banco de dados.
     *
     * @example DELETE /api/cards/{uuid}
     * @param  $uuid O uuid do cartão que está buscando no banco de dados.
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($uuid): JsonResponse
    {
        $card = Card::where('uuid', $uuid)->firstOr(function () {
            return ['message' => "Informe um uuid de cliente válido!"];
        });

        if (isset($card['message'])) {
            return response()->json($card, 400);
        }

        try {
            $card->delete();

            return response()->json($card, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Cartão não apagado!",
            ], 400);
        }
    }
}

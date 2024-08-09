<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Client;
use Exception;
use Illuminate\Support\Facades\DB;


class ClientController extends Controller
{
    /**
     * Este método recupera uma lista paginada de clientes do banco de dados
     * e a retorna como uma resposta JSON.
     *
     * @example GET /api/clients?per_page=15&page=2
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        //Obtem o número de elementos por página da requisição, se não for enviado o padrão é 10
        $perPage = $request->input('per_page', 10);

        $clients = Client::paginate($perPage);

        return response()->json([$clients], 200);
    }

    /**
     * Este método retorna os detalhes de um cliente específico em formato JSON.
     *
     * @example GET /api/clients/{uuid}
     * @param  $uuid O uuid do cliente que está buscando no banco de dados
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($uuid): JsonResponse
    {
        $client = Client::find($uuid);

        if (is_null($client)) {
            return response()->json([
                'message' => "Cliente não cadastrado!",
            ], 404);
        }
        return response()->json($client, 200);
    }

    /**
     * Cria novo cliente com os dados fornecidos na requisição.
     *
     * @example POST /api/clients/ Enviando o json com os dados do cliente a ser criado.
     * @param  \App\Http\Requests\ClientRequest  $request O objeto de requisição contendo os dados do cliente.
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ClientRequest $request): JsonResponse
    {
        // Inicia a operação
        DB::beginTransaction();

        try {
            // Cadastra cliente no banco de dados
            $client = Client::create([
                'nome' => $request->nome,
                'sobrenome' => $request->sobrenome,
                'email' => $request->email,
                'aniversario' => $request->aniversario,
                'telefone' => $request->telefone,
            ]);

            // Conclui a operação
            DB::commit();

            return response()->json($client, 201);
        } catch (Exception $e) {
            // Não conclui a operação
            DB::rollBack();

            return response()->json([
                'message' => "Cliente não cadastrado!",
            ], 400);
        }
    }

    /**
     * Atualiza os dados de um cliente existente com base no uuid fornecido na requisição.
     *
     * @example PUT /api/clients/{uuid} Enviando o json com os dados do cliente a ser atualizado.
     * @param  \App\Http\Requests\ClientRequest  $request O objeto de requisição contendo os dados do cliente.
     * @param  $uuid O uuid do client que está buscando no banco de dados.
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ClientRequest $request, $uuid): JsonResponse
    {
        $client = Client::where('uuid', $uuid)->first();

        if (is_null($client)) {
            return response()->json([
                'message' => "Informe um uuid válido!",
            ], 400);
        }

        // Iniciar a operação
        DB::beginTransaction();

        try {

            // Editar o registro no banco de dados
            $client->update([
                'nome' => $request->nome,
                'sobrenome' => $request->sobrenome,
                'email' => $request->email,
                'aniversario' => $request->aniversario,
                'telefone' => $request->telefone,
            ]);

            // Conclui a operação
            DB::commit();

            return response()->json($client, 200);
        } catch (Exception $e) {

            // Não conclui a operação
            DB::rollBack();

            return response()->json([
                'message' => "Cliente não editado!",
            ], 400);
        }
    }

    /**
     * Exclui cliente no banco de dados.
     *
     * @example POST /api/clients/{uuid}
     * @param  $uuid O uuid do cliente que está buscando no banco de dados.
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($uuid): JsonResponse
    {
        $client = Client::where('uuid', $uuid)->first();
        try {

            $client->delete();

            return response()->json($client, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Cliente não apagado!",
            ], 400);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Address;
use Exception;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    /**
     * Este método retorna o endereço de um cliente específico em formato JSON.
     *
     * @example GET /api/addresses/{client_uuid}
     * @param  $client_uuid O uuid do cliente o qual está buscando o endereço
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($client_uuid): JsonResponse
    {
        $address = Address::where('client_uuid', $client_uuid)->firstOr(function () {
            return ['message' => 'Endereço não encontrado!'];
        });
        return response()->json($address, (isset($address['message']) ? 404 : 200));
    }

    /**
     * Atualiza os dados de um endereço existente com base no client_uuid fornecido na requisição.
     *
     * @example PUT /api/addresses/{client_uuid} Enviando o json com os dados do endereço a ser atualizado.
     * @param  \App\Http\Requests\AddressRequest  $request O objeto de requisição contendo os dados do endereço.
     * @param  $client_uuid O uuid do cliente o qual deseja o endereço.
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(AddressRequest $request, $client_uuid): JsonResponse
    {
        // Iniciar a operação
        DB::beginTransaction();

        try {
            $address = Address::firstOrCreate(
                ['client_uuid' => $client_uuid], // Condição de busca
                [ // Dados para criar se não existir
                    'cep' => $request->cep,
                    'logradouro' => $request->logradouro,
                    'unidade' => $request->unidade,
                    'complemento' => $request->complemento,
                    'bairro' => $request->bairro,
                    'localidade' => $request->localidade,
                    'uf' => $request->uf,
                ]
            );

            // Se o endereço já existia, atualiza os dados fornecidos
            if (!$address->wasRecentlyCreated) {
                $address->update([
                    'cep' => $request->cep,
                    'logradouro' => $request->logradouro,
                    'unidade' => $request->unidade,
                    'complemento' => $request->complemento,
                    'bairro' => $request->bairro,
                    'localidade' => $request->localidade,
                    'uf' => $request->uf,
                ]);
            }

            // Conclui a operação
            DB::commit();

            return response()->json($address, 200);

        } catch (Exception $e) {
            // Não conclui a operação
            DB::rollBack();

            return response()->json([
                'message' => "Erro ao salvar o endereço!",
            ], 400);
        }
    }

    /**
     * Exclui o endereço no banco de dados.
     *
     * @example DELETE /api/address/{client_uuid}
     * @param  $client_uuid O uuid do cliente o qual deseja o endereço.
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($client_uuid): JsonResponse
    {
        $address = Address::where('client_uuid', $client_uuid)->firstOr(function () {
            return ['message' => "Informe um uuid de cliente válido!"];
        });

        if (isset($address['message'])) {
            return response()->json($address, 400);
        }

        try {

            $address->delete();

            return response()->json($address, 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Cliente não apagado!",
            ], 400);
        }
    }
}

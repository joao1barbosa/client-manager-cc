<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Manipular falha de validação e retornar uma resposta JSON com os erros de validação.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator Objeto de validação que contém os erros de validação.
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'erros' => $validator->errors(),
        ], 422));
    }

    /**
     *Retorna as regras de validação para os dados do cliente.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'numero' => 'required|max:20|unique:cards',
            'nome' => 'required|string|max:255',
            'validade' => 'required|string|max:5',
            'cvv' => 'required|string|max:4',
            'client_uuid' => 'required|exists:clients,uuid',
        ];
    }

    /**
     * Retorna as mensagens de erro personalizadas para as regras de validação.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'numero.required' => 'O número do cartão é obrigatório.',
            'nome.required' => 'O nome no cartão é obrigatório.',
            'validade.required' => 'A validade do cartão é obrigatória.',
            'cvv.required' => 'O CVV do cartão é obrigatório.',
            'client_uuid.required' => 'O UUID do cliente é obrigatório.',
            'numero.unique' => 'Este número de cartão já está cadastrado.',
            'client_uuid.exists' => 'O UUID do cliente informado não existe.',
            'numero.max' => 'O campo número deve ter um número de cartão válido.',
        ];
    }
}

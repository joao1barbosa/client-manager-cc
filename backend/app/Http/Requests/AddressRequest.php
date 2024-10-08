<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddressRequest extends FormRequest
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
     * Retorna as regras de validação para os dados do endereço.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $client_uuid = $this->route('client_uuid');

        $rules = [
            'cep' => 'required|string|min:8|max:8',
            'logradouro' => 'required|string|max:255',
            'unidade' => 'nullable|string|max:20',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'required|string|max:50',
            'localidade' => 'required|string|max:50',
            'uf' => 'required|string|max:2',
        ];

        if ($this->isMethod('post')) {
            $rules['client_uuid'] = 'required|exists:clients,uuid|unique:addresses,client_uuid';
        }

        return $rules;
    }

    /**
     * Retorna as mensagens de erro personalizadas para as regras de validação.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'cep.required' => 'O campo cep é obrigatório.',
            'logradouro.required' => 'O campo logradouro é obrigatório.',
            'bairro.required' => 'O campo bairro é obrigatório.',
            'localidade.required' => 'O campo localidade é obrigatório.',
            'uf.required' => 'O campo uf é obrigatório.',
            'client_uuid.required' => 'O UUID do cliente é obrigatório.',
            'cep.max' => 'O campo cep deve ter um cep válido.',
            'cep.min' => 'O campo cep deve ter um cep válido.',
            'uf.max' => 'O campo uf deve ter :max caracteres',
            'client_uuid.exists' => 'O UUID do cliente informado não existe.',
            'client_uuid.unique' => 'Este cliente já possui um endereço cadastrado.',
        ];
    }
}

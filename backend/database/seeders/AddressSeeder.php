<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\Client;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Buscar 12 clientes aleatórios
        $clients = Client::inRandomOrder()->take(17)->get();

        $addresses = [
            [
                'cep' => '01001000',
                'logradouro' => 'Praça da Sé',
                'unidade' => 'Bloco A',
                'complemento' => 'Apt 101',
                'bairro' => 'Sé',
                'localidade' => 'São Paulo',
                'uf' => 'SP',
            ],
            [
                'cep' => '20040020',
                'logradouro' => 'Avenida Rio Branco',
                'unidade' => '',
                'complemento' => '2º andar',
                'bairro' => 'Centro',
                'localidade' => 'Rio de Janeiro',
                'uf' => 'RJ',
            ],
            [
                'cep' => '30140071',
                'logradouro' => 'Avenida do Contorno',
                'unidade' => 'Bloco B',
                'complemento' => 'Cobertura',
                'bairro' => 'Funcionários',
                'localidade' => 'Belo Horizonte',
                'uf' => 'MG',
            ],
            [
                'cep' => '40110903',
                'logradouro' => 'Avenida Sete de Setembro',
                'unidade' => 'Ed. Oceania',
                'complemento' => 'Apt 302',
                'bairro' => 'Barra',
                'localidade' => 'Salvador',
                'uf' => 'BA',
            ],
            [
                'cep' => '60025160',
                'logradouro' => 'Rua Barão do Rio Branco',
                'unidade' => 'Sala 10',
                'complemento' => '1º andar',
                'bairro' => 'Centro',
                'localidade' => 'Fortaleza',
                'uf' => 'CE',
            ],
            [
                'cep' => '80030220',
                'logradouro' => 'Rua XV de Novembro',
                'unidade' => 'Ed. Garibaldi',
                'complemento' => '',
                'bairro' => 'Centro',
                'localidade' => 'Curitiba',
                'uf' => 'PR',
            ],
            [
                'cep' => '70040900',
                'logradouro' => 'Esplanada dos Ministérios',
                'unidade' => '',
                'complemento' => 'Ministério da Justiça',
                'bairro' => 'Zona Cívico-Administrativa',
                'localidade' => 'Brasília',
                'uf' => 'DF',
            ],
            [
                'cep' => '69005020',
                'logradouro' => 'Avenida Eduardo Ribeiro',
                'unidade' => 'Ed. Amazonas',
                'complemento' => 'Apt 701',
                'bairro' => 'Centro',
                'localidade' => 'Manaus',
                'uf' => 'AM',
            ],
            [
                'cep' => '66050000',
                'logradouro' => 'Avenida Presidente Vargas',
                'unidade' => '',
                'complemento' => '5º andar',
                'bairro' => 'Campina',
                'localidade' => 'Belém',
                'uf' => 'PA',
            ],
            [
                'cep' => '58010000',
                'logradouro' => 'Avenida Presidente Epitácio Pessoa',
                'unidade' => 'Casa 33',
                'complemento' => 'Fundos',
                'bairro' => 'Centro',
                'localidade' => 'João Pessoa',
                'uf' => 'PB',
            ],
            [
                'cep' => '90200000',
                'logradouro' => 'Avenida Farrapos',
                'unidade' => 'Sala 302',
                'complemento' => '',
                'bairro' => 'Navegantes',
                'localidade' => 'Porto Alegre',
                'uf' => 'RS',
            ],
            [
                'cep' => '78110510',
                'logradouro' => 'Rua Cônego Mendonça',
                'unidade' => 'Casa 20',
                'complemento' => 'Ao lado da padaria',
                'bairro' => 'Centro',
                'localidade' => 'Cuiabá',
                'uf' => 'MT',
            ],
        ];

        foreach ($clients as $index => $client) {
            Address::create(array_merge($addresses[$index], ['client_uuid' => $client->uuid]));
        }
    }
}

<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddressControllerTest extends TestCase
{
    use RefreshDatabase;

    private $client;

    protected function setUp(): void
    {
        parent::setUp();

        // Criação de um cliente válido para associar ao endereço
        $this->client = Client::factory()->create();
    }

    public function test_can_show_address()
    {
        $address = Address::factory()->create(['client_uuid' => $this->client->uuid]);

        $response = $this->get('/api/addresses/' . $this->client->uuid);

        $response->assertStatus(200)
            ->assertJson([
                'cep' => $address->cep,
                'logradouro' => $address->logradouro,
                'unidade' => $address->unidade,
                'complemento' => $address->complemento,
                'bairro' => $address->bairro,
                'localidade' => $address->localidade,
                'uf' => $address->uf,
                'client_uuid' => $address->client_uuid,
            ]);
    }

    public function test_show_address_not_found()
    {
        $response = $this->get('/api/addresses/invalid-uuid');

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'Endereço não encontrado!',
            ]);
    }

    public function test_store_address()
    {
        $data = [
            'cep' => '65901192',
            'logradouro' => '275 Reynolds Parkway Suite 464',
            'unidade' => '61882',
            'complemento' => 'Apt 4B',
            'bairro' => 'burgh',
            'localidade' => 'East Zitahaven',
            'uf' => 'TN',
            'client_uuid' => $this->client->uuid,
        ];

        $response = $this->post('/api/addresses', $data);

        $response->assertStatus(201)
            ->assertJson($data);
    }

    public function test_store_address_failure()
    {
        $data = [
            // Dados inválidos para forçar falha
            'client_uuid' => 'invalid-uuid',
        ];

        $response = $this->post('/api/addresses', $data);

        $response->assertStatus(422);
    }

    public function test_update_address()
    {
        $address = Address::factory()->create(['client_uuid' => $this->client->uuid]);

        $data = [
            'cep' => '27506902',
            'logradouro' => '75644 Howe Village Suite 580',
            'unidade' => '87153',
            'complemento' => 'Suite 9',
            'bairro' => 'haven',
            'localidade' => 'West Alexandre',
            'uf' => 'NV',
        ];

        $response = $this->put('/api/addresses/' . $address->client_uuid, $data);

        $response->assertStatus(200)
            ->assertJson($data);
    }

    public function test_update_address_not_found()
    {
        $data = [
            'cep' => '74721123',
            'logradouro' => '75644 Howe Village Suite 580',
            'unidade' => '87153',
            'complemento' => 'Suite 9',
            'bairro' => 'haven',
            'localidade' => 'West Alexandre',
            'uf' => 'NV',
        ];

        $response = $this->put('/api/addresses/invalid-uuid', $data);

        $response->assertStatus(400)
            ->assertJson([
                'message' => "Informe um uuid de cliente válido!",
            ]);
    }

    public function test_delete_address()
    {
        $address = Address::factory()->create(['client_uuid' => $this->client->uuid]);

        $response = $this->delete('/api/addresses/' . $address->client_uuid);

        $response->assertStatus(200)
            ->assertJson($address->toArray());
    }

    public function test_delete_address_not_found()
    {
        $response = $this->delete('/api/addresses/invalid-uuid');

        $response->assertStatus(400)
            ->assertJson([
                'message' => "Informe um uuid de cliente válido!",
            ]);
    }
}

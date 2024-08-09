<?php

namespace Tests\Feature;

use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_clients_with_pagination()
    {
        Client::factory()->count(20)->create();

        $response = $this->get('/api/clients?per_page=10&page=1');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['uuid', 'nome', 'sobrenome', 'email', 'aniversario', 'telefone']
                ],
                'links',
                'current_page',
                'from',
                'last_page',
                'links',
                'next_page_url',
                'path',
                'per_page',
                'prev_page_url',
                'to',
                'total',
            ]);
    }

    /** @test */
    public function it_can_show_a_client()
    {
        $client = Client::factory()->create();

        $response = $this->get('/api/clients/' . $client->uuid);

        $response->assertStatus(200)
            ->assertJson([
                'uuid' => $client->uuid,
                'nome' => $client->nome,
                'sobrenome' => $client->sobrenome,
                'email' => $client->email,
                'aniversario' => $client->aniversario,
                'telefone' => $client->telefone
            ]);
    }

    /** @test */
    public function it_returns_404_if_client_not_found()
    {
        $response = $this->get('/api/clients/' . Str::uuid());

        $response->assertStatus(404)
            ->assertJson(['message' => 'Cliente não cadastrado!']);
    }

    /** @test */
    public function it_can_store_a_client()
    {
        $data = [
            'nome' => 'João',
            'sobrenome' => 'Ribeiro',
            'email' => 'joao.ribeiro@email.com',
            'aniversario' => '19/02/2003',
            'telefone' => '(74) 99876-1932',
        ];

        $response = $this->post('/api/clients', $data);

        $response->assertStatus(201)
            ->assertJson($data);
    }

    /** @test */
    public function it_can_update_a_client()
    {
        $client = Client::factory()->create();

        $data = [
            'nome' => 'João',
            'sobrenome' => 'Ribeiro',
            'email' => 'joao.ribeiro@email.com',
            'aniversario' => '19/02/2003',
            'telefone' => '(74) 99876-1932',
        ];

        $response = $this->put('/api/clients/' . $client->uuid, $data);

        $response->assertStatus(200)
            ->assertJson($data);
    }

    /** @test */
    public function it_can_delete_a_client()
    {
        $client = Client::factory()->create();

        $response = $this->delete('/api/clients/' . $client->uuid);

        $response->assertStatus(200)
            ->assertJson([
                'uuid' => $client->uuid,
                'nome' => $client->nome,
                'sobrenome' => $client->sobrenome,
                'email' => $client->email,
                'aniversario' => $client->aniversario,
                'telefone' => $client->telefone
            ]);

        $this->assertDatabaseMissing('clients', ['uuid' => $client->uuid]);
    }
}

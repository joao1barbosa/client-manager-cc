<?php

namespace Tests\Feature;

use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        Client::factory()->create([
            'nome' => 'Maria',
            'sobrenome' => 'Silva',
            'email' => 'maria@email.com',
            'aniversario' => '10/03/2002',
            'telefone' => '(99) 99112-9883'
        ]);

        Client::factory()->create([
            'nome' => 'Luiza',
            'sobrenome' => 'Sousa',
            'email' => 'Luiza@email.com',
            'aniversario' => '19/03/2000',
            'telefone' => '(96) 99322-9333'
        ]);
    }

    /** @test */
    public function it_can_list_clients_with_pagination()
    {
        Client::factory()->count(20)->create();

        $response = $this->get('/api/clients?per_page=10&page=1');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'first',
                'prev',
                'next',
                'last',
                'page',
                'pages',
                'items',
                'data' => [
                    '*' => ['uuid', 'nome', 'sobrenome', 'email', 'aniversario', 'telefone']
                ],
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

    public function it_can_search_clients_by_name()
    {

        $response = $this->json('GET', '/api/clients/search', ['name' => 'Mari']);

        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                'nome' => 'Maria',
                'sobrenome' => 'Silva',
                'email' => 'maria@email.com',
                'aniversario' => '10/03/2002',
                'telefone' => '(99) 99112-9883'
            ])
            ->assertJsonMissing([
                'nome' => 'Luiza',
                'sobrenome' => 'Sousa',
                'email' => 'Luiza@email.com',
                'aniversario' => '19/03/2000',
                'telefone' => '(96) 99322-9333'
            ]);
    }

    /** @test */
    public function it_returns_empty_array_when_no_clients_found()
    {
        $response = $this->json('GET', '/api/clients/search', ['name' => 'Nonexistent']);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [],
                'items' => 0,
                'page' => 1,
                'pages' => 1,
            ]);
    }

    /** @test */
    public function it_handles_invalid_search_query()
    {
        $response = $this->json('GET', '/api/clients/search', ['invalid_field' => 'value']);

        $response
            ->assertStatus(400)
            ->assertJson([
                'message' => "Parâmetro 'name' é obrigatório para a busca.",
            ]);
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

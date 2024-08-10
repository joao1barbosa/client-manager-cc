<?php

namespace Tests\Unit;

use App\Models\Card;
use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CardControllerTest extends TestCase
{
    use RefreshDatabase;

    private $client;

    protected function setUp(): void
    {
        parent::setUp();

        // Criação de um cliente válido para associar ao cartão
        $this->client = Client::factory()->create();
    }

    public function it_lists_cards_by_client()
    {
        Card::factory()->count(5)->create(['client_uuid' => $this->client->uuid]);

        $response = $this->get("/api/clients/{$this->client->uuid}/cards");

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
                    '*' => ['uuid', 'numero', 'nome', 'validade', 'cvv', 'client_uuid'],
                ],
            ]);
    }

    /** @test */
    public function it_returns_404_if_no_cards_found_for_client()
    {
        $client_uuid = 'invalid-uuid';

        $response = $this->get("/api/clients/{$client_uuid}/cards");

        $response->assertStatus(404)
            ->assertJson([
                'message' => "Nenhum cartão encontrado para o cliente com o UUID fornecido.",
            ]);
    }

    /** @test */
    public function it_creates_a_new_card()
    {
        $data = [
            'numero' => '1234 1234 1234 1234',
            'nome' => 'Francisco R Silva',
            'validade' => '12/28',
            'cvv' => '345',
            'client_uuid' => $this->client->uuid,
        ];

        $response = $this->post('/api/cards', $data);

        $response->assertStatus(201)
            ->assertJson($data);

        $this->assertDatabaseHas('cards', ['numero' => $data['numero']]);
    }

    /** @test */
    public function it_returns_400_if_card_creation_fails()
    {
        $data = [
            'client_uuid' => 'invalid-uuid',
        ];

        $response = $this->post('/api/cards', $data);

        $response->assertStatus(422);
    }

    /** @test */
    public function it_deletes_a_card()
    {
        $card = Card::factory()->create(['client_uuid' => $this->client->uuid]);

        $response = $this->delete("/api/cards/{$card->uuid}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('cards', ['uuid' => $card->uuid]);
    }

    /** @test */
    public function it_returns_400_if_card_deletion_fails()
    {
        $response = $this->delete("/api/cards/invalid-uuid");

        $response->assertStatus(400)
            ->assertJson([
                'message' => "Informe um uuid de cliente válido!",
            ]);
    }
}

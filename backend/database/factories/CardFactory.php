<?php

namespace Database\Factories;

use App\Models\Card;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CardFactory extends Factory
{
    protected $model = Card::class;

    public function definition()
    {
        return [
            'uuid' => Str::uuid()->toString(),
            'numero' => $this->faker->creditCardNumber(),
            'nome' => $this->faker->name(),
            'validade' => $this->faker->creditCardExpirationDateString(),
            'cvv' => $this->faker->numberBetween(100, 999),
            'client_uuid' => Str::uuid()->toString(), // Ajuste conforme necessário
        ];
    }
}

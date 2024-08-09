<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition()
    {
        return [
            'nome' => $this->faker->name,
            'sobrenome' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'aniversario' => $this->faker->date,
            'telefone' => $this->faker->phoneNumber,
            'uuid' => $this->faker->uuid,
        ];
    }
}

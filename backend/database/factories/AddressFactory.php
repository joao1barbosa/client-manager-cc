<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition()
    {
        return [
            'cep' => $this->faker->postcode,
            'logradouro' => $this->faker->streetAddress,
            'unidade' => $this->faker->buildingNumber,
            'complemento' => $this->faker->optional()->word,
            'bairro' => $this->faker->citySuffix,
            'localidade' => $this->faker->city,
            'uf' => $this->faker->stateAbbr,
            'client_uuid' => $this->faker->uuid,
        ];
    }
}

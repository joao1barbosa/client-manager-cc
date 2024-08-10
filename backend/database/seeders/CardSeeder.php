<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Client;
use App\Models\Card;

class CardSeeder extends Seeder
{
    public function run()
    {
        $clients = Client::all();

        $totalCards = 45;

        // Crie os cartões
        for ($i = 0; $i < $totalCards; $i++) {
            // Escolha um cliente aleatório
            $client = $clients->random();

            // Gere um número de cartão e uma validade aleatória
            $numero = $this->generateCardNumber();
            $validade = $this->generateExpirationDate();
            $cvv = str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT); // CVV com 3 dígitos

            // Crie o cartão
            Card::create([
                'numero' => $numero,
                'nome' => Str::random(5) . 'Card', // Nome aleatório para o cartão
                'validade' => $validade,
                'cvv' => $cvv,
                'client_uuid' => $client->uuid,
            ]);
        }
    }

    /**
     * Gera um número de cartão no formato 'xxxx xxxx xxxx xxxx'
     *
     * @return string
     */
    private function generateCardNumber()
    {
        return implode(' ', [
            str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT),
            str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT),
            str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT),
            str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT),
        ]);
    }

    /**
     * Gera uma data de validade no formato 'mm/aa'
     *
     * @return string
     */
    private function generateExpirationDate()
    {
        $month = str_pad(rand(1, 12), 2, '0', STR_PAD_LEFT);
        $year = str_pad(rand(date('y'), date('y') + 10), 2, '0', STR_PAD_LEFT);
        return $month . '/' . $year;
    }
}

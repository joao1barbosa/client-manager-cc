<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::create([
            'nome' => 'João',
            'sobrenome' => 'Barbosa',
            'email' => 'joao1.barbosa@outlook.com',
            'aniversario' => '03/08/2001',
            'telefone' => '(62) 99664-1935',
        ]);

        Client::create([
            'nome' => 'Maria',
            'sobrenome' => 'Silva',
            'email' => 'maria@email.com',
            'aniversario' => '15/05/1990',
            'telefone' => '(62) 99444-5678',
        ]);

        Client::create([
            'nome' => 'Pedro',
            'sobrenome' => 'Alves',
            'email' => 'pedro.alves@email.com',
            'aniversario' => '23/09/1985',
            'telefone' => '(21) 99888-1111',
        ]);

        Client::create([
            'nome' => 'Ana',
            'sobrenome' => 'Costa',
            'email' => 'ana.costa@email.com',
            'aniversario' => '12/07/1992',
            'telefone' => '(11) 99977-2222',
        ]);

        Client::create([
            'nome' => 'Carlos',
            'sobrenome' => 'Pereira',
            'email' => 'carlos.pereira@email.com',
            'aniversario' => '10/04/1978',
            'telefone' => '(13) 99665-3333',
        ]);

        Client::create([
            'nome' => 'Fernanda',
            'sobrenome' => 'Oliveira',
            'email' => 'fernanda.oliveira@email.com',
            'aniversario' => '22/11/1988',
            'telefone' => '(19) 99555-4444',
        ]);

        Client::create([
            'nome' => 'Ricardo',
            'sobrenome' => 'Souza',
            'email' => 'ricardo.souza@email.com',
            'aniversario' => '15/03/1983',
            'telefone' => '(41) 99433-5555',
        ]);

        Client::create([
            'nome' => 'Juliana',
            'sobrenome' => 'Lima',
            'email' => 'juliana.lima@email.com',
            'aniversario' => '08/12/1995',
            'telefone' => '(45) 99322-6666',
        ]);

        Client::create([
            'nome' => 'Rafael',
            'sobrenome' => 'Mendes',
            'email' => 'rafael.mendes@email.com',
            'aniversario' => '18/02/1987',
            'telefone' => '(61) 99211-7777',
        ]);

        Client::create([
            'nome' => 'Camila',
            'sobrenome' => 'Rocha',
            'email' => 'camila.rocha@email.com',
            'aniversario' => '25/06/1993',
            'telefone' => '(31) 99100-8888',
        ]);

        Client::create([
            'nome' => 'Bruno',
            'sobrenome' => 'Ferreira',
            'email' => 'bruno.ferreira@email.com',
            'aniversario' => '04/10/1980',
            'telefone' => '(65) 99099-9999',
        ]);

        Client::create([
            'nome' => 'Patrícia',
            'sobrenome' => 'Martins',
            'email' => 'patricia.martins@email.com',
            'aniversario' => '21/01/1979',
            'telefone' => '(51) 98988-1111',
        ]);

        Client::create([
            'nome' => 'Marcos',
            'sobrenome' => 'Gomes',
            'email' => 'marcos.gomes@email.com',
            'aniversario' => '30/07/1982',
            'telefone' => '(83) 98877-2222',
        ]);

        Client::create([
            'nome' => 'Tatiana',
            'sobrenome' => 'Fernandes',
            'email' => 'tatiana.fernandes@email.com',
            'aniversario' => '17/04/1984',
            'telefone' => '(67) 98766-3333',
        ]);

        Client::create([
            'nome' => 'Rodrigo',
            'sobrenome' => 'Ribeiro',
            'email' => 'rodrigo.ribeiro@email.com',
            'aniversario' => '19/11/1991',
            'telefone' => '(54) 98655-4444',
        ]);

        Client::create([
            'nome' => 'Isabela',
            'sobrenome' => 'Santana',
            'email' => 'isabela.santana@email.com',
            'aniversario' => '14/06/1997',
            'telefone' => '(27) 98544-5555',
        ]);

        Client::create([
            'nome' => 'Lucas',
            'sobrenome' => 'Teixeira',
            'email' => 'lucas.teixeira@email.com',
            'aniversario' => '29/03/1986',
            'telefone' => '(95) 98433-6666',
        ]);

        Client::create([
            'nome' => 'Vanessa',
            'sobrenome' => 'Carvalho',
            'email' => 'vanessa.carvalho@email.com',
            'aniversario' => '06/09/1994',
            'telefone' => '(85) 98322-7777',
        ]);

        Client::create([
            'nome' => 'Eduardo',
            'sobrenome' => 'Araújo',
            'email' => 'eduardo.araujo@email.com',
            'aniversario' => '02/12/1990',
            'telefone' => '(31) 98211-8888',
        ]);

        Client::create([
            'nome' => 'Renata',
            'sobrenome' => 'Pinto',
            'email' => 'renata.pinto@email.com',
            'aniversario' => '27/08/1981',
            'telefone' => '(21) 98100-9999',
        ]);

        Client::create([
            'nome' => 'Guilherme',
            'sobrenome' => 'Almeida',
            'email' => 'guilherme.almeida@email.com',
            'aniversario' => '11/01/1989',
            'telefone' => '(51) 98099-1111',
        ]);

        Client::create([
            'nome' => 'Aline',
            'sobrenome' => 'Sousa',
            'email' => 'aline.sousa@email.com',
            'aniversario' => '09/05/1992',
            'telefone' => '(61) 97988-2222',
        ]);

        Client::create([
            'nome' => 'Fernando',
            'sobrenome' => 'Oliveira',
            'email' => 'fernando.oliveira@email.com',
            'aniversario' => '14/02/1988',
            'telefone' => '(83) 97877-3333',
        ]);

        Client::create([
            'nome' => 'Luciana',
            'sobrenome' => 'Moreira',
            'email' => 'luciana.moreira@email.com',
            'aniversario' => '05/07/1985',
            'telefone' => '(67) 97766-4444',
        ]);

        Client::create([
            'nome' => 'André',
            'sobrenome' => 'Barros',
            'email' => 'andre.barros@email.com',
            'aniversario' => '28/04/1983',
            'telefone' => '(19) 97655-5555',
        ]);

        Client::create([
            'nome' => 'Bianca',
            'sobrenome' => 'Nascimento',
            'email' => 'bianca.nascimento@email.com',
            'aniversario' => '10/10/1995',
            'telefone' => '(31) 97544-6666',
        ]);

        Client::create([
            'nome' => 'Thiago',
            'sobrenome' => 'Rezende',
            'email' => 'thiago.rezende@email.com',
            'aniversario' => '03/06/1987',
            'telefone' => '(27) 97433-7777',
        ]);

        Client::create([
            'nome' => 'Carla',
            'sobrenome' => 'Santos',
            'email' => 'carla.santos@email.com',
            'aniversario' => '24/11/1993',
            'telefone' => '(95) 97322-8888',
        ]);

        Client::create([
            'nome' => 'Fábio',
            'sobrenome' => 'Freitas',
            'email' => 'fabio.freitas@email.com',
            'aniversario' => '13/03/1982',
            'telefone' => '(85) 97211-9999',
        ]);

        Client::create([
            'nome' => 'Larissa',
            'sobrenome' => 'Campos',
            'email' => 'larissa.campos@email.com',
            'aniversario' => '17/08/1996',
            'telefone' => '(61) 97100-1111',
        ]);
    }
}

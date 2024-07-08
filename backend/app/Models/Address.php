<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $primaryKey = 'client_uuid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'client_uuid',
        'cep',
        'logradouro',
        'unidade',
        'complemento',
        'bairro',
        'localidade',
        'uf'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_uuid', 'uuid');
    }
}

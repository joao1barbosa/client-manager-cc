<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'nome',
        'sobrenome',
        'email',
        'aniversario',
        'telefone'
    ];

    public function address(): HasOne
    {
        return $this->hasOne(Address::class, 'client_uuid', 'uuid');
    }

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'client_uuid', 'uuid');
    }
}

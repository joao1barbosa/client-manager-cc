<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $primary = 'numero';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'numero',
        'validade',
        'cvv',
        'client_uuid'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_uuid', 'uuid');
    }

}

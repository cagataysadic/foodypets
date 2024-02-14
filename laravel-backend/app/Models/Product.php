<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $casts = [
        'name' => 'string',
        'species' => 'string',
        'type' => 'string',
        'price' => 'float',
        'description' => 'string',
        'image_url' => 'string',
        'flavor' => 'string',
        'form' => 'string',
        'dimensions' => 'string',
        'material' => 'string'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductImage extends Model {
    use HasFactory;
    
    protected $guarded = [];
    protected $primaryKey = 'product_image_id';
}

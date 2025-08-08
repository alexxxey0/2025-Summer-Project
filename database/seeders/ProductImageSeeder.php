<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductImageSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        for ($i = 0; $i < 200; $i++) {
            ProductImage::factory()->count(1)->create();
        }
    }
}

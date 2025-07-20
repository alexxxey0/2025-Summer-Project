<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariant>
 */
class ProductVariantFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $sizes = ['XS', 'S', 'M', 'L', 'XL'];
        $products = Product::pluck('product_id')->toArray();

        // Generate a unique pair (product_id, size)
        do {
            $product_id = fake()->randomElement($products);
            $size = fake()->randomElement($sizes);
            $product_size_exists = ProductVariant::where('product_id', $product_id)->where('size', $size)->exists();
        } while ($product_size_exists);



        return [
            'product_id' => $product_id,
            'size' => $size,
            'in_stock' => fake()->numberBetween(0, 1000),
        ];
    }
}

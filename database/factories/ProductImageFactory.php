<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductImage>
 */
class ProductImageFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        do {
            $products = Product::pluck('product_id')->toArray();
            $product_id = fake()->randomElement($products);
            $images_exist = ProductImage::where('product_id', $product_id)->count();
        } while ($images_exist >= 4); // Make sure there are 4 images for every product

        $main_image_exists = ProductImage::where('product_id', $product_id)->where('main_image', true)->exists();

        return [
            'product_id' => $product_id,
            'image_path' => 'product_images/random_product' . fake()->numberBetween(1, 5) . '.jpg',
            'main_image' => $main_image_exists ? false : true
        ];
    }
}

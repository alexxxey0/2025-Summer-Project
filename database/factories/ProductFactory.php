<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $types = ['Shoes', 'T-shirt', 'Pants', 'Hoodie'];
        $sizes = ['XS', 'S', 'M', 'L', 'XL'];
        $colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Yellow'];
        $manufacturers = ['Adidas', 'Nike', 'Puma', 'Reebok', 'Vans'];
        $genders = ['M', 'F', 'U'];
        $ageCategories = ['Baby', 'Kid', 'Teenager', 'Adult', 'Senior'];
        $seasons = ['Summer', 'Winter'];

        $type = fake()->randomElement($types);
        $color = fake()->randomElement($colors);
        $manufacturer = fake()->randomElement($manufacturers);
        $season = fake()->randomElement($seasons);

        return [
            // Generate a more realistic product name
            'name' => "{$manufacturer} {$color} {$type} - {$season} Collection",

            // Description can still be a longer text
            'description' => fake()->paragraphs(3, true),

            'price' => fake()->randomFloat(2, 10, 500), // Min $10, max $500
            'type' => $type,
            'color' => $color,
            'manufacturer' => $manufacturer,
            'gender' => fake()->randomElement($genders),
            'age_category' => fake()->randomElement($ageCategories),
            'season' => $season,
            'main_image_path' => 'products_images/random_product' . fake()->numberBetween(1, 5) . '.jpg'
        ];
    }
}

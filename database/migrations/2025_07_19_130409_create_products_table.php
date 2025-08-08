<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id'); // Primary key
            $table->string('name', 100);
            $table->string('description', 2000)->nullable();
            $table->decimal('price', 6, 2);
            $table->string('type', 30); // shirt/pants/shoes etc.
            $table->string('color', 20)->nullable();
            $table->string('manufacturer', 30)->nullable();
            $table->char('gender', 1)->nullable(); // M/F
            $table->string('age_category', 10)->nullable(); // kid/adult
            $table->string('season', 10)->nullable(); // summer/winter
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('products');
    }
};

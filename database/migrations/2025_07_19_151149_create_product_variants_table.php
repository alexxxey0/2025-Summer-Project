<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id('product_variant_id'); // Primary key
            $table->unsignedBigInteger('product_id');
            $table->string('size', 10)->nullable();
            $table->integer('in_stock')->default(0);
            $table->timestamps(); // created_at & updated_at

            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
            $table->unique(['product_id', 'size']); // There shouldn't be multiple entries for same size of the same product
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('product_variants');
    }
};

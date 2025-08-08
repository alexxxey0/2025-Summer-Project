<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('product_images', function (Blueprint $table) {
            $table->id('product_image_id'); // Primary key
            $table->unsignedBigInteger('product_id');
            $table->string('image_path', 100);
            $table->boolean('main_image')->default(false);
            $table->timestamps(); // created_at & updated_at

            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('product_images');
    }
};

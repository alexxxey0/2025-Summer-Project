<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function all_products_page() {
        $products = Product::all();

        return Inertia::render('AllProducts', ['products' => $products]);
    }
}

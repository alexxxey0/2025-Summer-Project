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


    public function product_page(Request $request) {
        $product = Product::where('product_id', $request->product_id)->first();
        $product['main_image_path'] = asset('images/' . $product['main_image_path']);

        return Inertia::render('Product', ['product' => $product]);
    }
}

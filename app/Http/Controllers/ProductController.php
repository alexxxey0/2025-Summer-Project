<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function all_products_page() {
        $products = Product::all();

        $filter_columns = ['type', 'manufacturer', 'color', 'gender', 'age_category', 'season'];
        $filter_columns_values = array();
        foreach ($filter_columns as $filter_column) {
            $values = Product::select($filter_column)->distinct()->get()->toArray();
            foreach ($values as $value) {
                $filter_columns_values[$filter_column][] = $value[$filter_column];
            }
        }
        

        return Inertia::render('AllProducts', ['products' => $products, 'filter_columns_values' => $filter_columns_values]);
    }


    public function product_page(Request $request) {
        $product = Product::where('product_id', $request->product_id)->first();
        $product['main_image_path'] = asset('images/' . $product['main_image_path']);

        $in_stock = array();
        $product_variants = ProductVariant::where('product_id', $request->product_id)->get();
        foreach ($product_variants as $product_variant) {
            $in_stock[$product_variant->size] = $product_variant->in_stock;
        }
        $product['in_stock'] = $in_stock;

        $sizes = array();
        foreach ($product_variants as $product_variant) {
            $sizes[] = $product_variant->size;
        }
        $product['sizes'] = $sizes;

        return Inertia::render('Product', ['product' => $product]);
    }
}

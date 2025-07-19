<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function all_products_page() {
        return Inertia::render('AllProducts');
    }
}

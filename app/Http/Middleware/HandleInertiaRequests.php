<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Inertia\Middleware;
use App\Models\CartItem;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Models\ProductVariant;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array {
        $cart_items_db = $request->user() !== null ? CartItem::where('user_id', $request->user()->user_id)->get() : [];

        for ($i = 0; $i < count($cart_items_db); $i++) {
            $product_variant = ProductVariant::where('product_variant_id', $cart_items_db[$i]['product_variant_id'])->first();
            $product = Product::where('product_id', $product_variant['product_id'])->first();
            $main_image = ProductImage::where('product_id', $product['product_id'])->where('main_image', true)->first();
            
            $cart_items_db[$i]['name'] = $product->name;
            $cart_items_db[$i]['size'] = $product_variant->size;
            $cart_items_db[$i]['price'] = $product->price;
            $cart_items_db[$i]['image_path'] = asset("storage/" . $main_image->image_path);
            $cart_items_db[$i]['total_price'] = intval($product->price) * intval($cart_items_db[$i]['quantity']);
        }

        // From Inertia documentation (https://inertiajs.com/shared-data)
        return array_merge(parent::share($request), [
            // Synchronously...
            'appName' => config('app.name'),

            // Lazily...
            'auth.user' => fn() => $request->user()
                ? $request->user()
                : null,

            'flash_message' => $request->session()->get('flash_message') ? $request->session()->get('flash_message') : null,
            'asset_path' => asset(''),
            'cart_items_db' => $cart_items_db,
            'csrf_token' => csrf_token()
        ]);
    }
}

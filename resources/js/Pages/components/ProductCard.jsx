import React from "react";
import { Link } from "@inertiajs/react";

function ProductCard({ product }) {
    return (
        
        <Link href={'/product/' + product.product_id} className="flex flex-col p-2 bg-gray-100 rounded">
            <img className="w-full aspect-square" src={"images/" + product.main_image_path} alt="Product image" />
            <div className="flex flex-row justify-between">
                <p>{product.name}</p>
                <p className="font-bold">{product.price}€</p>
            </div>
        </Link>
    );
}

export default ProductCard;
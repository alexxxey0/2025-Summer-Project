import React from "react";

function ProductCard({ product }) {
    return (
        <div className="flex flex-col p-2 bg-gray-100 rounded">
            <img className="w-full aspect-square" src={"images/" + product.main_image_path} alt="Product image" />
            <div className="flex flex-row justify-between">
                <p>{product.name}</p>
                <p className="font-bold">{product.price}€</p>
            </div>
        </div>
    );
}

export default ProductCard;
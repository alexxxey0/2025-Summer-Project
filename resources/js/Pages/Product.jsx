import React, { useState } from "react";
import SizeButton from "./components/SizeButton";

function Product({ product }) {
    const sizes = product.sizes;

    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);


    function handleSizeButtonClick(e) {
        setSelectedSize(e.target.value);
        setQuantity(1);
    }

    function add_to_cart() {

    }

    return (
        <div className="my-8">
            <h1 className="text-center font-bold text-3xl">{product.name}</h1>

            <div className="flex flex-row w-10/12 mx-auto mt-16">
                <div className="w-3/12 flex flex-col items-center">
                    <img className="w-full" src={product.main_image_path} alt="Product main image" />
                    <div className="flex flex-row justify-center gap-x-2 mt-8 w-8/12 *:w-3/12">
                        {sizes.map((size) => {
                            return selectedSize === size ?
                                <SizeButton key={size} value={size} onClick={handleSizeButtonClick} selected={true}></SizeButton>
                                :
                                <SizeButton key={size} value={size} onClick={handleSizeButtonClick} selected={false}></SizeButton>
                        }
                        )}
                    </div>
                    <div className="flex flex-col w-full mt-16 items-start gap-y-2">
                        <p>In stock: {product.in_stock[selectedSize] ? product.in_stock[selectedSize] : 0}</p>
                        <div className="flex flex-row gap-x-4 w-full">
                            <button className="bg-black text-white rounded-xl px-2 py-2 w-4/12 cursor-pointer h-10/12" onClick={add_to_cart}>Add to cart</button>
                            <div className="flex flex-col">
                                <input className="border-2 border-black rounded-xl p-1 w-10/12" type="number" name="quantity" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} min={1} max={product.in_stock[selectedSize]} />
                                <label htmlFor="quantity" className="text-sm">Quantity</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Product;
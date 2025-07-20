import React, { useState } from "react";
import SizeButton from "./components/SizeButton";

function Product({ product }) {
    const [selectedSize, setSelectedSize] = useState('M');
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    function handleSizeButtonClick(e) {
        setSelectedSize(e.target.value);
    }

    return (
        <div className="my-8">
            <h1 className="text-center font-bold text-3xl">{product.name}</h1>

            <div className="flex flex-row w-10/12 mx-auto">
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
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Product;
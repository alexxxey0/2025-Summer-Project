import React, { useState } from "react";
import SizeButton from "./components/SizeButton";

function Product({ product }) {
    let sizes = product.sizes;

    let weights = {
        'XXS': 1,
        'XS': 2,
        'S': 3,
        'M': 4,
        'L': 5,
        'XL': 6,
        'XXL': 7
    };

    // If the size is in the weights array (which contains letter sizes), get the weight for this size for comparison.
    // Otherwise, if the size is not in the weights table, it must be a number, so compare it as a number.
    // This way, we can sort both letter sizes (S, M, L...) and numeric sizes (40, 41, 42, 43...).
    sizes.sort((a, b) => (weights[a] ? weights[a] : Number(a)) - (weights[b] ? weights[b] : Number(b)));

    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);


    function handleSizeButtonClick(e) {
        setSelectedSize(e.target.value);
        setQuantity(1); // Reset the quantity to 1 when user changes sizes
    }

    function add_to_cart() {
        // TODO
    }

    return (
        <div className="my-8">
            <h1 className="text-center font-bold text-3xl">{product.name}</h1>

            <div className="flex flex-col lg:flex-row gap-y-8 gap-x-32 w-10/12 mx-auto mt-16">
                <div className="w-full lg:w-6/12 xl:w-4/12 flex flex-col items-center">
                    <img className="w-full" src={product.main_image_path} alt="Product main image" />

                    <div className="flex flex-col gap-y-2 lg:hidden mt-8">
                        <p className="border-2 rounded-xl p-2">{product.description}</p>
                        <p className="font-bold text-xl">{product.price.replace(".", ",")} €</p>
                    </div>

                    {/* Size buttons */}
                    <div className="flex flex-row justify-center gap-x-2 mt-8 w-8/12 *:w-3/12">
                        {sizes.map((size) => {
                            // The button that is currently selected is rendered in a different color (by passing the selected prop)
                            return selectedSize === size ?
                                <SizeButton key={size} value={size} onClick={handleSizeButtonClick} selected={true}></SizeButton>
                                :
                                <SizeButton key={size} value={size} onClick={handleSizeButtonClick} selected={false}></SizeButton>
                        }
                        )}
                    </div>



                    {/* In stock, Total price, Add to cart, Quantity */}
                    <div className="flex flex-col w-full mt-4 lg:mt-16 items-start gap-y-2">
                        <p>In stock: {product.in_stock[selectedSize] ? product.in_stock[selectedSize] : 0}</p>
                        <p>Total price: {(product.price * quantity).toFixed(2).toString().replace(".", ",") + " €"}</p>
                        <div className="flex flex-row gap-x-4 w-full">
                            <button className="bg-black text-white rounded-xl px-2 py-2 w-4/12 cursor-pointer h-10/12" onClick={add_to_cart}>Add to cart</button>
                            <div className="flex flex-col">
                                <input className="border-2 border-black rounded-xl p-1 w-10/12" type="number" name="quantity" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} min={1} max={product.in_stock[selectedSize]} />
                                <label htmlFor="quantity" className="text-sm">Quantity</label>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Description, Price, Product details */}
                <div className="flex flex-col w-full lg:w-8/12 gap-y-8">
                    <div className="hidden lg:flex flex-col gap-y-4">
                        <p className="border-2 rounded-xl p-2">{product.description}</p>
                        <p className="font-bold text-xl">{product.price.replace(".", ",")} €</p>
                    </div>

                    <div className="flex flex-row gap-x-20 text-lg">
                        <div className="flex flex-col font-bold gap-y-2">
                            <p>Manufacturer</p>
                            <p>Type</p>
                            <p>Color</p>
                            <p>Gender</p>
                            <p>Age category</p>
                            <p>Season</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p>{product.manufacturer}</p>
                            <p>{product.type}</p>
                            <p>{product.color}</p>
                            <p>{product.gender}</p>
                            <p>{product.age_category}</p>
                            <p>{product.season}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
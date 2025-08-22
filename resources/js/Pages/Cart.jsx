import React, { useContext } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { CartItemsContext } from './components/Layout';

function Cart() {
    const { asset_path } = usePage().props;
    const { cartItems, setCartItems } = useContext(CartItemsContext);

    let cartTotalPrice = 0;
    cartItems.forEach(cartItem => {
        cartTotalPrice += Number(cartItem.total_price);
    });
    // console.log(cartItems);

    return (
        <div className="flex flex-col mt-10 justify-center mb-20">
            <div className="mx-auto w-full max-w-6xl">

                {/* Shopping cart heading */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="font-bold text-4xl">Shopping cart</h1>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-[300px_1fr_150px_100px_150px] justify-items-center pb-8 font-bold items-center border-b">
                    <div></div>
                    <div></div>
                    <div className="text-center">Price (per item)</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-center">Price</div>
                </div>

                {cartItems.map((cartItem) =>
                    <div key={cartItem.cart_item_id} className="grid grid-cols-[300px_1fr_150px_100px_150px] justify-items-center border-b py-6 items-center">
                        <img className="object-cover w-[300px]" src={cartItem.image_path} alt="" />
                        <div>
                            <h3 className="font-bold">{cartItem.name}</h3>
                            <h4 className="text-gray-500">Size: {cartItem.size}</h4>
                        </div>
                        <div className="text-center">{cartItem.price} €</div>
                        <div className="text-center">{cartItem.quantity}</div>
                        <div className="text-center">{cartItem.total_price} €</div>
                    </div>
                )}

                {/* Lower panel with total price */}
                <div className="flex justify-end items-center mt-6 gap-4">
                    <p className="text-lg font-bold">
                        Total: <span className="font-normal">{cartTotalPrice.toFixed(2)} €</span>
                    </p>
                    <Link
                        href=""
                        className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Continue
                    </Link>
                </div>

                <div className="flex flex-row gap-x-6 justify-center mt-20">
                    <div className="flex flex-col items-center text-2xl">
                        <h1 className="font-bold">1</h1>
                        <h2>Shopping Cart</h2>
                    </div>

                    <div className="flex flex-row items-center text-3xl">
                        <p>. . . . . . . . . . . .</p>
                    </div>

                    <div className="flex flex-col items-center text-2xl text-gray-400">
                        <h1 className="font-bold">2</h1>
                        <h2>Shipping</h2>
                    </div>

                    <div className="flex flex-row items-center text-3xl text-gray-400">
                        <p>. . . . . . . . . . . .</p>
                    </div>

                    <div className="flex flex-col items-center text-2xl text-gray-400">
                        <h1 className="font-bold">3</h1>
                        <h2>Payment</h2>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Cart;

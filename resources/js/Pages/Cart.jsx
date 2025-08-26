import React, { useContext } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { CartItemsContext } from './components/Layout';
import { FlashMessageContext } from './components/Layout';

function Cart() {
    const { asset_path } = usePage().props;
    const { cartItems, setCartItems } = useContext(CartItemsContext);
    const { flashMessage, setFlashMessage } = useContext(FlashMessageContext);
    const { auth } = usePage().props;
    const { csrf_token } = usePage().props;

    let cartTotalPrice = 0;
    cartItems.forEach(cartItem => {
        cartTotalPrice += Number(cartItem.total_price);
    });


    async function removeCartItemDb(e, idToDelete) {
        e.preventDefault();
        await fetch('/remove_from_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token
            },
            body: JSON.stringify({ id_to_delete: idToDelete })
        })
            .then(response => response.json())
            .then(response => {
                setFlashMessage(response.flash_message);
                setCartItems(cartItems => cartItems.filter(cartItem => cartItem.cart_item_id !== idToDelete));
            });
    }

    function removeCartItemSession(e, idToDelete) {
        e.preventDefault();

        // Retrieve and parse the existing array
        let cartItemsSession = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        // Delete the item with the passed id from the array
        cartItemsSession = cartItemsSession.filter(cartItem => cartItem.cart_item_id !== idToDelete);

        // Save the updated array back to sessionStorage
        sessionStorage.setItem('cartItems', JSON.stringify(cartItemsSession));
        setCartItems(cartItemsSession);
        setFlashMessage('Product removed from cart!');
    }

    async function changeCartItemQuantityDb(e, idToChange, increase) {
        e.preventDefault();

        const itemToChange = cartItems.find(cartItem => cartItem.cart_item_id === idToChange);

        // Prevent decreasing if quantity is 1
        if (!(itemToChange.quantity === 1 && !increase)) {

            await fetch('/change_cart_item_quantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token
                },
                body: JSON.stringify({ id_to_change: idToChange, increase: increase })
            })
                .then(response => response.json())
                .then(response => {
                    setCartItems(cartItems =>
                        cartItems.map((cartItem) =>
                            cartItem.cart_item_id === idToChange ? {
                                ...cartItem,
                                quantity: increase ? cartItem.quantity + 1 : cartItem.quantity - 1,
                                total_price: increase ? (cartItem.quantity + 1) * Number(cartItem.price) : (cartItem.quantity - 1) * Number(cartItem.price)
                            } : cartItem)
                    );
                });
        }
    }

    function changeCartItemQuantitySession(e, idToChange, increase) {
        e.preventDefault();

        const itemToChange = cartItems.find(cartItem => cartItem.cart_item_id === idToChange);

        // Prevent decreasing if quantity is 1
        if (!(itemToChange.quantity === 1 && !increase)) {
            // Retrieve and parse the existing array
            let cartItemsSession = JSON.parse(sessionStorage.getItem('cartItems')) || [];

            // Change the quantity of the product and adjust the total price accordingly
            cartItemsSession = cartItemsSession.map((cartItem) =>
                cartItem.cart_item_id === idToChange ? {
                    ...cartItem,
                    quantity: increase ? cartItem.quantity + 1 : cartItem.quantity - 1,
                    total_price: increase ? (cartItem.quantity + 1) * Number(cartItem.price) : (cartItem.quantity - 1) * Number(cartItem.price)
                } : cartItem
            );

            // Save the updated array back to sessionStorage
            sessionStorage.setItem('cartItems', JSON.stringify(cartItemsSession));
            setCartItems(cartItemsSession);
        }
    }


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
                    <div key={cartItem.cart_item_id} className="relative grid grid-cols-[300px_1fr_150px_100px_150px] justify-items-center border-b py-6 items-center">
                        <img className="object-cover w-[300px]" src={cartItem.image_path} alt="" />
                        <div className='flex flex-col justify-between h-full w-[300px]'>
                            <button className='invisible' >Empty button</button>
                            <div className=''>
                                <h3 className="font-bold">{cartItem.name}</h3>
                                <h4 className="text-gray-500">Size: {cartItem.size}</h4>
                            </div>
                            <button type='button' className='bg-black text-white px-5 py-2 rounded cursor-pointer w-4/12 hover:scale-105 transition' onClick={auth.user ? (e) => { removeCartItemDb(e, cartItem.cart_item_id) } : (e) => { removeCartItemSession(e, cartItem.cart_item_id) }}>Remove</button>
                        </div>
                        <div className="text-center">{Number(cartItem.price).toFixed(2)} €</div>
                        <div className="flex gap-x-1 justify-center items-center w-full">
                            <p className={(cartItem.quantity === 1 ? 'text-gray-300' : '') + ' text-3xl cursor-pointer'} onClick={auth.user ? (e) => { changeCartItemQuantityDb(e, cartItem.cart_item_id, false) } : (e) => { changeCartItemQuantitySession(e, cartItem.cart_item_id, false) }}>−</p>
                            <p className='border-1 p-1 rounded w-3/12 text-center'>{cartItem.quantity}</p>
                            <p className='text-3xl cursor-pointer' onClick={auth.user ? (e) => { changeCartItemQuantityDb(e, cartItem.cart_item_id, true) } : (e) => { changeCartItemQuantitySession(e, cartItem.cart_item_id, true) }}>+</p>
                        </div>
                        <div className="text-center">{Number(cartItem.total_price).toFixed(2)} €</div>
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

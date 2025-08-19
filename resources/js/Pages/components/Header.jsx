import React, { useState, useContext } from "react";
import SmallIcon from "./SmallIcon";
import { Link } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';
import { RiAdminFill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartItemsContext } from "./Layout";
import { FlashMessageContext } from "./Layout";
import { router } from '@inertiajs/react';



function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartIsHovered, setCartIsHovered] = useState(false);
    const { auth } = usePage().props;
    const { asset_path } = usePage().props;
    const { csrf_token } = usePage().props;
    //const { cart_items_db } = usePage().props;
    //const cartItemsSession = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // For authenticated users, cart items are stored in the database
    // For unauthenticated users, cart items are stored in the session
    //const cartItems = auth.user ? cart_items_db : cartItemsSession;
    const { cartItems, setCartItems } = React.useContext(CartItemsContext);

    let cartTotalPrice = 0;
    cartItems.forEach(cartItem => {
        cartTotalPrice += Number(cartItem.total_price);
    });

    const { flashMessage, setFlashMessage } = React.useContext(FlashMessageContext);
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

    function logOut() {
        setCartItems([]);
        sessionStorage.setItem('cartItems', JSON.stringify([]));
        location.href = "/logout";
    }

    return (

        <header>
            <div className="border-b-2 border-black px-16 py-10 flex flex-row justify-between items-center">
                {/* Social media icons */}
                <div className="flex flex-row gap-x-2 w-[10%] justify-around items-center">
                    <a href=""><SmallIcon src={asset_path + "images/facebook_icon.svg"} alt="Facebook icon" /></a>
                    <a href=""><SmallIcon src={asset_path + "images/instagram_icon.svg"} alt="Instagram icon" /></a>
                    <a href=""><SmallIcon src={asset_path + "images/youtube_icon.svg"} alt="Youtube icon" /></a>
                    <a href=""><SmallIcon src={asset_path + "images/pinterest_icon.svg"} alt="Pinterest icon" /></a>
                </div>

                {/* Special offer text */}
                <div>
                    <p className="text-lg"><span className="font-bold">Special offer: </span>free shipping on all the orders above 100€</p>
                </div>

                {/* Contact/Cart/Login links */}
                <div className="flex flex-col">
                    {auth.user && <p className="text-gray-500">Welcome, {auth.user.name} {auth.user.surname}!</p>}
                    <div className="w-[10%] flex flex-row justify-around items-center gap-x-2">
                        <a className="border-12 border-l-0 border-transparent" href="">Contact</a>
                        <Link href="/cart" className="border-12 border-transparent">Cart</Link>
                        {auth.user ?
                            <Link onClick={logOut} className="border-12 border-transparent whitespace-nowrap">Log out</Link>
                            :
                            <div className="flex flex-col gap-y-2 relative items-end" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}
                            >
                                <a href="" className="border-12 border-transparent">Login</a>

                                {/* Login/Register menu */}
                                {isOpen && (
                                    <div
                                        onMouseEnter={() => setIsOpen(true)}
                                        onMouseLeave={() => setIsOpen(false)}
                                        className="absolute top-full w-40 flex flex-col gap-y-4 p-4 bg-white border border-gray-300 rounded shadow-lg z-50"
                                    >

                                        {/* Arrow */}
                                        <div
                                            className="absolute -top-2 right-3 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-gray-300"
                                            style={{ borderBottomColor: "gray-300" }}
                                        ></div>

                                        <Link className="bg-black text-white p-2 rounded shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition" href="/login">Log in</Link>
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">Not registered yet?</p>
                                            <Link className="bg-black text-white p-2 rounded shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition" href="/register">Register</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>


            </div>

            {/* Navbar */}
            <div className="px-16 mt-4 flex flex-row items-center justify-between">
                {/* Stylish online store heading */}
                <Link href="/">
                    <h1 className="font-bold font-bebas text-6xl">STYLISH</h1>
                    <h2>Online Store</h2>
                </Link>

                {/* Categories */}
                <div className="flex flex-row text-xl gap-x-20 items-center">
                    <Link href="/">HOME</Link>
                    <a href="">MEN</a>
                    <a href="">WOMEN</a>
                    <Link href="/shop">SHOP</Link>
                    <a href="">PAGE</a>
                    <a href="">SALE</a>
                    <a href="" className="bg-black text-white rounded-full px-2 py-1">Get PRO</a>
                </div>

                {/* Icons */}
                <div className="flex flex-row gap-x-4 items-center">
                    {auth.user && auth.user.role === 'admin' && <Link href="/admin_panel"><SmallIcon src={asset_path + "images/admin_icon.svg"} alt="Admin icon" /></Link>}
                    <Link href="/my_profile"><SmallIcon src={asset_path + "/images/user_icon.svg"} alt="User icon" /> </Link>
                    <a href=""><SmallIcon src={asset_path + "images/search_icon.svg"} alt="Search icon" /> </a>
                    <div
                        className="relative inline-block bg-clip-content"
                        onMouseEnter={() => setCartIsHovered(true)}
                        onMouseLeave={() => setCartIsHovered(false)}
                    >
                        {/* Icon */}
                        <Link className="relative" href="/cart">
                            <SmallIcon src={asset_path + "images/cart_icon.svg"} alt="Cart icon" />
                            {cartItems.length > 0 && <div className="flex justify-center items-center absolute w-[24px] h-[24px] -top-2 -left-2 rounded-full bg-black">
                                <p className="text-white">{cartItems.length}</p>
                            </div>
                            }
                        </Link>



                        {/* Popup */}
                        {cartIsHovered && (
                            <div>
                                <div
                                    className="absolute right-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#E5E5E5]"
                                    style={{ borderBottomColor: "gray-300" }}
                                ></div>
                                <div className="pt-2 absolute right-0">
                                    <div className="w-[300px] bg-[#E5E5E5] rounded-md border border-gray-300 shadow-lg p-2 text-sm z-10 flex flex-col gap-y-8">
                                        {cartItems.length > 0 && cartItems.map((cartItem) =>
                                            <div key={cartItem.cart_item_id} className="flex gap-x-4 items-start">
                                                <div className="flex flex-col">
                                                    <p className="mb-1">{cartItem.name}</p>
                                                    <p>Size: {cartItem.size}</p>
                                                    <p>Price per item: {cartItem.price} €</p>
                                                    <p>Quantity: {cartItem.quantity}</p>
                                                    <p className="font-bold text-lg">{cartItem.total_price.toFixed(2)} €</p>
                                                </div>
                                                <img className="w-6/12" src={cartItem.image_path} alt="" />
                                                <FaRegTrashAlt className="text-2xl cursor-pointer hover:scale-115 transition" onClick={auth.user ? (e) => { removeCartItemDb(e, cartItem.cart_item_id) } : (e) => { removeCartItemSession(e, cartItem.cart_item_id) }} />
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col text-lg">
                                                <p>Total:</p>
                                                <p className="font-bold">{cartTotalPrice.toFixed(2)} €</p>
                                            </div>
                                            <Link href="/cart" className='bg-black p-2 text-white text-lg font-bold rounded-md shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Order</Link>
                                        </div>
                                        {cartItems.length === 0 && <p>Your cart is empty</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
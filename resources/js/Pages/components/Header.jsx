import React, { useState } from "react";
import SmallIcon from "./SmallIcon";
import { Link } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';
import { RiAdminFill } from "react-icons/ri";



function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage().props
    const { asset_path } = usePage().props;

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
                            <Link href="/logout" className="border-12 border-transparent whitespace-nowrap">Log out</Link>
                            :
                            <div className="flex flex-col gap-y-2 relative items-end" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}
                            >
                                <a href="" className="border-12 border-transparent">Login</a>

                                {/* Login/Register menu */}
                                {isOpen && (
                                    <div
                                        onMouseEnter={() => setIsOpen(true)}
                                        onMouseLeave={() => setIsOpen(false)}
                                        className="absolute top-full w-40 flex flex-col gap-y-4 p-4 bg-white border border-gray-300 rounded shadow-lg"
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
                    <a href=""><SmallIcon src={asset_path + "images/cart_icon.svg"} alt="Cart icon" /> </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
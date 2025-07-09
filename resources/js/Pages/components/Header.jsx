import React from "react";
import SmallIcon from "./SmallIcon";



function Header(props) {

    return (
        <header>
            <div className="border-b-2 border-black px-16 py-10 flex flex-row justify-between">
                {/* Social media icons */}
                <div className="flex flex-row gap-x-2 w-[10%] justify-around items-center">
                    <SmallIcon src="images/facebook_icon.svg" alt="Facebook icon" />
                    <SmallIcon src="images/instagram_icon.svg" alt="Instagram icon" />
                    <SmallIcon src="images/youtube_icon.svg" alt="Youtube icon" />
                    <SmallIcon src="images/pinterest_icon.svg" alt="Pinterest icon" />
                </div>

                {/* Special offer text */}
                <div>
                    <p className="text-lg"><span className="font-bold">Special offer: </span>free shipping on all the orders above 100€</p>
                </div>

                {/* Contact/Cart/Login links */}
                <div className="w-[10%] flex flex-row justify-around items-center gap-x-2">
                    <a href="">Contact</a>
                    <a href="">Cart</a>
                    <a href="">Login</a>
                </div>


            </div>

            {/* Navbar */}
            <div className="px-16 mt-4 flex flex-row items-center justify-between">
                {/* Stylish online store heading */}
                <div>
                    <h1 className="font-bold font-bebas text-6xl">STYLISH</h1>
                    <h2>Online Store</h2>
                </div>

                {/* Categories */}
                <div className="flex flex-row text-xl gap-x-20 items-center">
                    <a href="">HOME</a>
                    <a href="">MEN</a>
                    <a href="">WOMEN</a>
                    <a href="">SHOP</a>
                    <a href="">PAGE</a>
                    <a href="">SALE</a>
                    <a href="" className="bg-black text-white rounded-full px-2 py-1">Get PRO</a>
                </div>

                {/* Icons */}
                <div className="flex flex-row gap-x-4">
                    <SmallIcon src="images/user_icon.svg" alt="User icon" />
                    <SmallIcon src="images/search_icon.svg" alt="Search icon" />
                    <SmallIcon src="images/cart_icon.svg" alt="Cart icon" />
                </div>
            </div>
        </header>
    );
}

export default Header;
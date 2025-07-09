import React from "react";
import SmallIcon from "./SmallIcon";



function Header(props) {

    return (
        <header className="border-b-2 border-black px-16 py-8 flex flex-row justify-between">
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
            <div className="w-[10%] flex flex-row justify-around items-center">
                <a href="">Contact</a>
                <a href="">Cart</a>
                <a href="">Login</a>
            </div>
        </header>
    );
}

export default Header;
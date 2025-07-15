import React from "react";

function Footer(props) {

    return (
        <footer>
            <div className="flex flex-row gap-20 justify-around border-t-2 pt-8 pb-8">

                <div className="flex flex-col list-none">
                    <ul>
                        <li className="font-bold text-lg">Info</li>
                        <li>Our blog</li>
                        <li>Privacy policy</li>
                        <li>Shipping</li>
                        <li>Contact Us</li>
                        <li>Help</li>
                        <li>Community</li>
                    </ul>
                </div>

                <div className="flex flex-col list-none">
                    <li className="font-bold text-lg">About</li>
                    <li>History</li>
                    <li>Our Team</li>
                    <li>Services</li>
                    <li>Company</li>
                    <li>Manufacture</li>
                    <li>Wholesale</li>
                </div>

                <div className="flex flex-col list-none">
                    <li className="font-bold text-lg">Women Shoes</li>
                    <li>Track Your Order</li>
                    <li>Our Blog</li>
                    <li>Privacy Policy</li>
                    <li>Shipping</li>
                    <li>Contact Us</li>
                    <li>Help</li>
                    <li>Community</li>
                </div>

                <div className="flex flex-col list-none">
                    <li className="font-bold text-lg">Popular</li>
                    <li>Prices Drop</li>
                    <li>New Products</li>
                    <li>Best Sales</li>
                    <li>Stores</li>
                    <li>Login</li>
                    <li>Cart</li>
                </div>

                <div className="flex flex-col list-none">
                    <li className="font-bold text-lg">Mens Collection</li>
                    <li>Delivery</li>
                    <li>About Us</li>
                    <li>Shoes</li>
                    <li>Contact Us</li>
                </div>

                <div className="flex flex-col list-none">
                    <li className="font-bold text-lg">Get In Touch</li>
                    <li>123 Main Street</li>
                    <li>Toulouse - France</li>
                    <li>+(33) 800 456 789-987</li>
                    <li>contact@yourwebsite.com</li>
                </div>
            
            </div>
        </footer>
    );
}

export default Footer;
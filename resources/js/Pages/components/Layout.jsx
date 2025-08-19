import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FlashMessage from "./FlashMessage";
import { usePage } from '@inertiajs/react';



export const CartItemsContext = React.createContext();
export const FlashMessageContext = React.createContext();

function Layout(props) {
    const [flashMessage, setFlashMessage] = useState(usePage().props.flash_message);
    //const { flash_message } = usePage().props;
    const { auth } = usePage().props;

    const { cart_items_db } = usePage().props;
    const cartItemsSession = JSON.parse(sessionStorage.getItem('cartItems')) || [];


    // For authenticated users, cart items are stored in the database
    // For unauthenticated users, cart items are stored in the session
    const [cartItems, setCartItems] = useState(auth.user ? cart_items_db : cartItemsSession);



    return (
        <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
            <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
                {flashMessage && <FlashMessage key={Date.now()} text={flashMessage}></FlashMessage>}
                <Header></Header>
                {props.children}
                <Footer></Footer>
            </FlashMessageContext.Provider>
        </CartItemsContext.Provider>
    );
}

export default Layout;
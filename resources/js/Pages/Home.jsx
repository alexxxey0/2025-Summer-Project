import React from 'react';

function Home() {
    return ( 
        <div className="font-bebas">
            <div className="navbar flex flex-row justify-between">

                <div className="logo">
                    <h1 className="text-4xl ml-1">Stylish</h1>
                    <h5 className="text-xl ml-2">Online Store</h5>
                </div>

                <div className="navbar-buttons">

                    <a href="">Home</a>
                    <a href="">Men</a>
                    <a href="">Women</a>
                    <a href="">Page</a>
                    <a href="">Shop</a>
                    <a href="">Sale</a>
                    <a href="">Get PRO</a>

                    <div className="navbar-icons">
                        <p>icon 1</p>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Home;
import React from 'react';

function Home() {
    return (
        <div className="flex flex-col">
            
            { /* Men/Women/Kids grid */ }
            <div className="grid grid-cols-2 gap-4 mb-5 w-[60%] mx-auto mt-5">
                <div className="row-span-2 relative">
                    <a href="">
                        <img className="w-full h-full object-cover shadow-sm hover:shadow-md" src="images/women-clothes.jpg" alt="Women Clothes" />
                        <p className="absolute bottom-4 left-4 text-white text-2xl font-bold">Women</p>
                    </a>
                </div>

                <div className="relative">
                    <a href="">
                        <img className="w-full h-full object-cover shadow-sm hover:shadow-md" src="images/men-clothes.jpg" alt="Men Clothes" />
                        <p className="absolute bottom-4 right-4 text-white text-2xl font-bold">Men</p>
                    </a>
                </div>

                <div className="relative">
                    <a href="">
                        <img className="w-full h-full object-cover shadow-sm hover:shadow-md" src="images/kids-clothes.jpg" alt="Kids Clothes" />
                    <p className="absolute bottom-4 right-4 text-white text-2xl font-bold">Kids</p>
                    </a>
                </div>
            </div>

            { /* 10% OFF Discount Coupon Section */ }
            <div className="flex justify-center mt-10">
                    <div className="flex flex-col bg-gray-300 p-8 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 transition-transform duration-300 hover:scale-110" >
                        <h1 className="font-bold text-4xl">10% OFF Discount coupons</h1>
                        <div className="flex flex-row">
                            <p className="pt-2 text-2xl">Subscribe us to get 10% OFF on all the purchases</p>
                            <a href="" className="ml-20 bg-black text-white p-2 rounded-md text-2xl">EMAIL ME</a>
                        </div>
                    </div>
                    
            </div>
            
            { /* Featured Products Section */ }
            <div className="flex justify-center mt-7 p-10">

                <div className="flex flex-col">

                    <div className="flex justify-between mb-5">
                        <p className="font-bold text-xl">FEATURED PRODUCTS</p>
                        <a href="" className="font-bold text-xl">VIEW ALL</a>
                    </div>

                    <div className="flex flex-row gap-x-6">
                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>

                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>
                        
                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>

                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>

                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>
                    
                    </div>

                </div>


            </div>

            { /* Collections Section*/ }

            <div className="flex justify-center mt-10">
                
                <div className="flex gap-x-5">
                    <div className="relative rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                        <img className="rounded-md border w-[500px] object-cover" src="images/samba.jpg" alt="Adidas Collection" />
                        <div className="absolute bottom-4 left-4">
                            <p className="font-bold text-4xl">Adidas Collection</p>
                            <a href="">SHOP NOW</a>
                        </div>
                    </div>
                
                    <div className="relative rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                        <img className="rounded-md border w-[500px] object-cover " src="images/vans.jpg" alt="Vans Collection" />
                        <div className="absolute bottom-4 left-4">
                            <p className="font-bold text-4xl">Vans Collection</p>
                            <a href="">SHOP NOW</a>
                        </div>
                    </div>
                </div>
                
            </div>


            { /* Latest Products Section */ }
            <div className="flex justify-center mt-10 mb-10">

                <div className="flex flex-col">

                    <div className="flex justify-between mb-5">
                        <p className="font-bold text-xl">LATEST PRODUCTS</p>
                        <a href="" className="font-bold text-xl">VIEW ALL</a>
                    </div>

                    <div className="flex flex-row gap-x-6">
                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>

                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>
                        
                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>

                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>

                        <div>
                            <img className="object-cover w-[300px] shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:scale-105" src="images/product.jpg" alt="featured 1" />
                            <div className="flex flex-row mt-2 justify-between">
                                <p>Running shoes for men</p>
                                <p className="font-bold">150€</p>
                            </div>
                        </div>
                    
                    </div>

                </div>


            </div>

        </div>
        
    );
}

export default Home;
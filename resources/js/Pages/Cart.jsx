import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";

function Cart() {
    const { asset_path } = usePage().props;

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

                {/* 1st product */}
                <div className="grid grid-cols-[300px_1fr_150px_100px_150px] justify-items-center border-b py-6 items-center">
                    <img className="object-cover w-[300px]" src={asset_path + "images/vans.jpg"} alt="" />
                    <div>
                        <h3 className="font-bold">Vans Old Skool</h3>
                        <h4 className="text-gray-500">Size: 43</h4>
                    </div>
                    <div className="text-center">121,00$</div>
                    <div className="text-center">1</div>
                    <div className="text-center">121,00$</div>
                </div>

                {/* 2nd product */}
                <div className="grid grid-cols-[300px_1fr_150px_100px_150px] justify-items-center border-b py-6 items-center">
                    <img className="object-cover w-[300px]" src={asset_path + "images/vans.jpg"} alt="" />
                    <div>
                        <h3 className="font-bold">Vans Old Skool</h3>
                        <h4 className="text-gray-500">Size: 43</h4>
                    </div>
                    <div className="text-center">121,00$</div>
                    <div className="text-center">1</div>
                    <div className="text-center">121,00$</div>
                </div>

                {/* 3rd product */}
                <div className="grid grid-cols-[300px_1fr_150px_100px_150px] justify-items-center border-b py-6 items-center">
                    <img className="object-cover w-[300px]" src={asset_path + "images/vans.jpg"} alt="" />
                    <div>
                        <h3 className="font-bold">Vans Old Skool</h3>
                        <h4 className="text-gray-500">Size: 43</h4>
                    </div>
                    <div className="text-center">121,00$</div>
                    <div className="text-center">1</div>
                    <div className="text-center">121,00$</div>
                </div>

                {/* Lower panel with total price */}
                <div className="flex justify-end items-center mt-6 gap-4">
                    <p className="text-lg font-bold">
                        Total: <span className="font-normal">$363.00</span>
                    </p>
                    <Link
                        href=""
                        className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
                    >
                        Continue
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Cart;

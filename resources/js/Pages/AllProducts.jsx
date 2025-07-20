import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import { usePage } from '@inertiajs/react';

function AllProducts(props) {
    const [sortedProducts, setSortedProducts] = useState(props.products); // local state for sorted list

    const handleSort = (e) => {
        const sortOption = e.target.value; // get the sort option from the <select> element
        let sorted = [...sortedProducts]; // make a copy so we don’t mutate state directly

        if (sortOption === "price_low_to_high") {
            sorted.sort((a, b) => a.price - b.price); // ascending
        } else if (sortOption === "price_high_to_low") {
            sorted.sort((a, b) => b.price - a.price); // descending
        } else {
            sorted = [...props.products]; // reset to original order
        }

        setSortedProducts(sorted); // update state => triggers re-render
    }

    return (
        <div className="my-16">
            <h1 className="text-center font-bold text-5xl mb-8">All products</h1>

            <div className="w-10/12 mx-auto">
                <div className="flex flex-row items-center mb-4 gap-x-8">
                    <label htmlFor="sort_by">Sort by</label>
                    <select onChange={handleSort} className="border-2 border-gray-500 rounded p-2" name="sort_by" id="sort_by">
                        <option value="price_low_to_high">Price (from lowest to highest)</option>
                        <option value="price_high_to_low">Price (from highest to lowest)</option>
                    </select>
                </div>
                <div className="grid grid-cols-6 gap-y-4 gap-x-4">
                    {sortedProducts.map(product =>
                        <ProductCard key={product.product_id} product={product}></ProductCard>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;
import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import FilterDropdownButton from "./components/FilterDropdownButton";
import { usePage } from '@inertiajs/react';
import { IoIosArrowDown } from "react-icons/io";

function AllProducts(props) {

    // variable for the products that are currently displayed
    const [displayedProducts, setDisplayedProducts] = useState(props.products);


    const handleSort = (e) => {
        const sortOption = e.target.value; // get the sort option from the <select> element
        let sorted = [...displayedProducts]; // make a copy so we don’t mutate state directly

        if (sortOption === "price_low_to_high") {
            sorted.sort((a, b) => a.price - b.price); // ascending
        } else if (sortOption === "price_high_to_low") {
            sorted.sort((a, b) => b.price - a.price); // descending
        } else {
            sorted = [...props.products]; // reset to original order
        }

        setDisplayedProducts(sorted); // update state => triggers re-render
    }

    const handleFilter = (e) => {
        const selected_checkboxes = document.querySelectorAll('.filter_checkbox:checked'); // get all the selected checkboxes
        let currentFilterParameters = {};

        // Build an array of currently selected filter parameters based on the selected checkboxes.
        // It looks like this: {'type': ['Pants', 'Shoes'], 'manufacturer': ['Puma', 'Nike']}
        // The array is recreated every time a checkbox is selected or unselected.
        selected_checkboxes.forEach((checkbox) => {
            if (checkbox.dataset.column in currentFilterParameters) currentFilterParameters[checkbox.dataset.column].push(checkbox.value);
            else {
                currentFilterParameters[checkbox.dataset.column] = [];
                currentFilterParameters[checkbox.dataset.column].push(checkbox.value);
            }
        });


        // Filter the products down to only the ones that match the filter parameters
        const filtered = props.products.filter((product) => {
            for (const [key, value] of Object.entries(currentFilterParameters)) {
                /*
                If product's attribute's value is not among the selected values for this attribute, the product is not displayed.
                With the example above, if product's type is neither Pants or Shoes, it is not shown.
                If no checkbox is selected for particular attribute, then the currentFilterParameters won't contain this attribute
                and it won't be taken into account during filtering.
                */
                if (!(currentFilterParameters[key].includes(product[key]))) return false;
            }
            return true;
        });

        // Update the setDisplayedProducts state variable with the filtered list of products, which will automatically trigger a rerender.
        setDisplayedProducts(filtered);
    }

    return (
        <div className="my-16">
            <h1 className="text-center font-bold text-5xl mb-8">All products</h1>

            <div className="w-10/12 mx-auto flex flex-row gap-x-32">
                {/* Filter options */}
                <div className="text-lg">
                    <p className="mb-8">Filters</p>
                    <div className="flex flex-col gap-y-4">
                        <FilterDropdownButton onCheckboxSelection={handleFilter} column="type" title="Type" values={props.filter_columns_values.type}></FilterDropdownButton>
                        <FilterDropdownButton onCheckboxSelection={handleFilter} column="manufacturer" title="Manufacturer" values={props.filter_columns_values.manufacturer}></FilterDropdownButton>
                        <FilterDropdownButton onCheckboxSelection={handleFilter} column="color" title="Color" values={props.filter_columns_values.color}></FilterDropdownButton>
                        <FilterDropdownButton onCheckboxSelection={handleFilter} column="gender" title="Gender" values={props.filter_columns_values.gender}></FilterDropdownButton>
                        <FilterDropdownButton onCheckboxSelection={handleFilter} column="age_category" title="Age" values={props.filter_columns_values.age_category}></FilterDropdownButton>
                        <FilterDropdownButton onCheckboxSelection={handleFilter} column="season" title="Season" values={props.filter_columns_values.season}></FilterDropdownButton>
                    </div>
                </div>

                <div className="mx-auto">
                    <div className="flex flex-row items-center mb-4 gap-x-8">
                        <label htmlFor="sort_by">Sort by</label>
                        <select onChange={handleSort} className="border-2 border-gray-500 rounded p-2" name="sort_by" id="sort_by">
                            <option value="price_low_to_high">Price (from lowest to highest)</option>
                            <option value="price_high_to_low">Price (from highest to lowest)</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-5 gap-y-4 gap-x-4">
                        {displayedProducts.length === 0 ?
                            <h1 className="text-4xl mt-8">No matching products</h1>
                            :
                            displayedProducts.map(product =>
                                <ProductCard key={product.product_id} product={product}></ProductCard>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllProducts;
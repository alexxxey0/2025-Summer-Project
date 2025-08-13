import React, { useState, useEffect } from "react";
import { useForm } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import AdminPanelInput from "../AdminPanelInput";
import ProductsTableRow from "../ProductsTableRow";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../../css/slider-custom.css';

function ManageProducts(props) {

    const [pageSize, setPageSize] = useState(10);
    const [displayedProducts, setDisplayedProducts] = useState(props.products);
    const [pageCount, setPageCount] = useState(Math.ceil(displayedProducts.length / pageSize));
    const [currentPage, setCurrentPage] = useState(1);
    const maxSliderValue = 500;
    const [priceRange, setPriceRange] = useState([0, maxSliderValue]);


    const marks = {};
    for (let i = 0; i <= maxSliderValue; i += 50) {
        marks[i] = `${i}€`;
    }

    // When slider moves
    const onSliderChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
    };

    // When min input changes
    const onMinInputChange = (e) => {
        let newMin = Number(e.target.value);

        // Clamp newMin between 0 and current max
        if (newMin < 0) newMin = 0;
        if (newMin > priceRange[1]) newMin = priceRange[1];

        setPriceRange([newMin, priceRange[1]]);
    };

    // When max input changes
    const onMaxInputChange = (e) => {
        let newMax = Number(e.target.value);

        // Clamp newMax between current min and maxSliderValue
        if (newMax > maxSliderValue) newMax = maxSliderValue;
        if (newMax < priceRange[0]) newMax = priceRange[0];

        setPriceRange([priceRange[0], newMax]);
    };

    useEffect(() => {
        handleSearch();
    }, [priceRange]);

    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        product_id: ''
    });

    function submit(e) {
        e.preventDefault();
        post('/get_product_by_id');
    }

    const handleSearch = (e) => {
        const inputs = document.querySelectorAll('.search_products input'); // get all the inputs

        let currentSearchParameters = {};
        inputs.forEach((input) => {
            // Get all the non-empty search parameters
            if (input.value !== '' && input.name !== 'max_price' && input.name !== 'min_price') currentSearchParameters[input.name] = input.value;
        });

        let filtered_products = {};
        // Filter the products down to only the ones that match the search parameters
        if (Object.keys(currentSearchParameters).length > 0) {
            filtered_products = props.products.filter((product) => {
                for (const [key, value] of Object.entries(currentSearchParameters)) {
                    // As all the search parameters here are not unique, we are searching using substring instead of exact match
                    // The search is case insensitive
                    if (!(product[key].toLowerCase().includes(value.toLowerCase()))
                    ) return false;
                }
                return true;
            });
        } else {
            filtered_products = props.products;
        }

        // Filter the products down to the ones in the selected price range
        filtered_products = filtered_products.filter((product) => {
            if (Number(product.price) < priceRange[0] || Number(product.price) > priceRange[1]) return false;
            return true;
        });

        setDisplayedProducts(filtered_products);
        setPageCount(Math.ceil(filtered_products.length / pageSize));
        setCurrentPage(1);
    }

    function showNextPage() {
        if (currentPage < pageCount) setCurrentPage(currentPage => currentPage + 1);
    }

    function showPreviousPage() {
        if (currentPage >= 2) setCurrentPage(currentPage => currentPage - 1);
    }

    function changePageSize(e) {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
        setPageCount(Math.ceil(displayedProducts.length / newPageSize));
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col gap-y-12">
            <p>Click on a row to get more detailed information about a product and edit it.</p>

            {/* Search products, Get product by ID */}
            <div className="flex flex-col xl:flex-row gap-x-8 items-start xl:items-end gap-y-4">
                <div className="border-2 rounded-lg p-2 w-10/12 xl:w-4/12">
                    <h1 className="font-bold mb-4 text-lg">Search products</h1>
                    <div className="search_products flex flex-col gap-y-4">
                        <AdminPanelInput onChange={handleSearch} name="name" />
                        <AdminPanelInput onChange={handleSearch} name="type" />
                        <AdminPanelInput onChange={handleSearch} name="manufacturer" />

                        <div className="flex flex-col gap-y-4 mt-4">
                            <p>Price</p>
                            <div className="text-xs self-center w-11/12 hidden xl:block">
                                <Slider range value={priceRange} min={0} max={maxSliderValue} step={10} allowCross={false} marks={marks}
                                    onChange={(e) => { onSliderChange(e) }}
                                ></Slider>
                            </div>
                            <div className="flex flex-row gap-x-2 mt-2">
                                <div className="flex flex-col">
                                    <label htmlFor="min_price">Min</label>
                                    <input className="border-2 rounded-md" min={0} type="number" name="min_price" id="" value={priceRange[0]} max={priceRange[1]} onChange={(e) => { onMinInputChange(e) }} step={10} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="max_price">Max</label>
                                    <input className="border-2 rounded-md" min={priceRange[0]} type="number" name="max_price" value={priceRange[1]} max={maxSliderValue} onChange={(e) => { onMaxInputChange(e) }} step={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-1">
                    <h1 className="font-bold text-lg">Get product directly by ID</h1>
                    <form onSubmit={submit} className="flex flex-row items-center gap-x-4">
                        <div className="flex flex-row gap-x-2">
                            <label className="w-6/12" htmlFor="product_id">Product ID</label>
                            <input value={data.product_id} onChange={e => setData('product_id', e.target.value)} className="border-2 border-gray-300 rounded w-6/12" type="number" min="1" name="product_id" />
                        </div>
                        <button type="submit" className="bg-black text-white px-4 text-lg rounded-lg shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer">Get</button>
                    </form>
                </div>
            </div>

            <Link href="/add_new_product_page" className="flex flex-row items-center gap-x-2 w-6/12 xl:w-2/12 bg-black text-white px-4 py-2 text-xl rounded-lg shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer">+ Add new product</Link>

            {/* Products table */}
            <div className="grid grid-cols-6 bg-[#5b5b5b]  *:p-2 *:overflow-x-scroll gap-0.5 border-2 border-[#5b5b5b] rounded">
                <div className="contents *:bg-[#f5f5f5] *:p-2 font-bold text-base">
                    <p>Product ID</p>
                    <p>Name</p>
                    <p>Type</p>
                    <p>Manufacturer</p>
                    <p>Available sizes</p>
                    <p>Price</p>
                </div>

                {displayedProducts.slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).map(product =>
                    <ProductsTableRow
                        product={product}
                        key={product.product_id}
                        productVariants={props.productVariants.filter(productVariant => { return productVariant.product_id === product.product_id })}
                    />
                )}
            </div>

            <div className="self-center flex flex-col items-center">
                <p>Page {currentPage} of {pageCount}</p>
                <div className="flex flex-row gap-x-2">
                    <IoIosArrowBack onClick={showPreviousPage} className="text-3xl cursor-pointer" />
                    <IoIosArrowForward onClick={showNextPage} className="text-3xl cursor-pointer" />
                </div>
                <div className="flex flex-row gap-x-1 justify-center items-center mt-4">
                    <label htmlFor="products_per_page">Products per page:</label>
                    <input className="border-2 rounded w-2/12 p-1" type="number" min="1" value={pageSize} onChange={changePageSize} />
                </div>
            </div>
        </div>
    );
}

export default ManageProducts;
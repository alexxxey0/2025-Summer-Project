import React, { useState } from "react";
import { Link } from "@inertiajs/react";

function ProductsTableRow(props) {
    const [highlighted, setHighlighted] = useState(false);

    Object.entries(props.product).forEach(([key, value]) => {
        // Change undefined or null values to "Not provided" for better representation
        if (value === null || value === undefined) {
            props.product[key] = 'Not provided';
        }
    });

    let weights = {
        'XXS': 1,
        'XS': 2,
        'S': 3,
        'M': 4,
        'L': 5,
        'XL': 6,
        'XXL': 7
    };

    // If the size is in the weights array (which contains letter sizes), get the weight for this size for comparison.
    // Otherwise, if the size is not in the weights table, it must be a number, so compare it as a number.
    // This way, we can sort both letter sizes (S, M, L...) and numeric sizes (40, 41, 42, 43...).
    props.productVariants.sort((a, b) => (weights[a.size] ? weights[a.size] : Number(a.size)) - (weights[b.size] ? weights[b.size] : Number(b.size)));

    return (
        <Link href={'/product_profile/' + props.product.product_id} onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} className={(highlighted ? '*:bg-gray-300 ' : '*:bg-[#f5f5f5] ') + "contents *:cursor-pointer *:p-2 *:overflow-x-scroll"}>
            <p>{props.product.product_id}</p>
            <p>{props.product.name}</p>
            <p>{props.product.type}</p>
            <p>
                {props.productVariants.length === 0 ?
                    <span>No sizes available</span>
                    :
                    props.productVariants.map(productVariant =>
                        <span key={productVariant.product_variant_id}>{productVariant.size} ({productVariant.in_stock})<br /></span>
                    )}
            </p>
            <p>{props.product.price} €</p>
        </Link>
    );
}


export default ProductsTableRow;
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";

function Shipping() {
    const { asset_path } = usePage().props;

    return (
        <div className="flex flex-row">
            <p>Shipping Page</p>
        </div>
    );
}

export default Shipping;
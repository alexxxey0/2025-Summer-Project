import React, { useState } from "react";
import { Link } from "@inertiajs/react";

function UsersTableRow(props) {
    const [highlighted, setHighlighted] = useState(false);

    Object.entries(props.user).forEach(([key, value]) => {
        // Change undefined or null values to "Not provided" for better representation
        if (value === null || value === undefined) {
            props.user[key] = 'Not provided';
        }
    });

    if (highlighted) {
        return (
            <Link href={'/user_profile/' + props.user.user_id} onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} className="contents *:bg-gray-300 *:cursor-pointer *:p-2 *:overflow-x-scroll">
                <p>{props.user.user_id}</p>
                <p>{props.user.name}</p>
                <p>{props.user.surname}</p>
                <p>{props.user.email}</p>
                <p>{props.user.phone_number}</p>
                <p>{props.user.role}</p>
            </Link>
        );
    } else {
        return (
            <Link href={'/user_profile/' + props.user.user_id} onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)} className="contents *:bg-[#f5f5f5] *:p-2 *:overflow-x-scroll">
                <p>{props.user.user_id}</p>
                <p>{props.user.name}</p>
                <p>{props.user.surname}</p>
                <p>{props.user.email}</p>
                <p>{props.user.phone_number}</p>
                <p>{props.user.role}</p>
            </Link>
        );
    }
}

export default UsersTableRow;
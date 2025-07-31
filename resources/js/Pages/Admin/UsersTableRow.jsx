import React, { useState } from "react";

function UsersTableRow(props) {
    const [highlighted, setHighlighted] = useState(false);

    if (highlighted) {
        return (
            <div className="contents *:bg-gray-300 *:cursor-pointer *:p-2 *:overflow-x-scroll">
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.user_id}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.name}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.surname}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.email}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.phone_number}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.role}</p>
            </div>
        );
    } else {
        return (
            <div className="contents *:bg-[#f5f5f5] *:p-2 *:overflow-x-scroll">
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.user_id}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.name}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.surname}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.email}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.phone_number}</p>
                <p onMouseEnter={() => setHighlighted(true)} onMouseLeave={() => setHighlighted(false)}>{props.user.role}</p>
            </div>
        );
    }
}

export default UsersTableRow;
import React, { useState, useEffect } from "react";

function FlashMessage(props) {

    useEffect(() => {
        setTimeout(() => {
            const flash_message = document.getElementById('flash_message');
            if (flash_message) flash_message.style.display = 'none';
        }, 5000);

    });

    return (
        <div id="flash_message" className="bg-[#C2B280] text-white p-4 rounded text-lg fixed top-2 left-2">
            <p>{props.text}</p>
        </div>
    );
}

export default FlashMessage;
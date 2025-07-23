import React from "react";

function SizeButton(props) {
    if (props.selected) {
        return (
            <button className="bg-black text-white border-2 border-black p-1 rounded-xl font-bold transition cursor-pointer" onClick={props.onClick} value={props.value}>
                {props.value}
            </button>
        );
    } else {
        return (
            <button className="border-2 p-1 rounded-xl font-bold hover:bg-gray-300 transition cursor-pointer" onClick={props.onClick} value={props.value}>
                {props.value}
            </button>
        );
    }
}

export default SizeButton;
import React from "react";

function MainButton(props) {
    return (
        <button type={props.type ? props.type : 'button'} className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>{props.text}</button>
    );
}

export default MainButton;
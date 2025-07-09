import React from 'react';

function SmallIcon(props) {
    return (
        <img className='w-[30px]' src={props.src} alt={props.alt} />
    );
}

export default SmallIcon;
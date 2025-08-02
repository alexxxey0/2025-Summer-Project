import React from "react";

function AdminPanelInput(props) {
    const input_labels = {
        'name': 'Name',
        'surname': 'Surname',
        'email': 'Email address',
        'phone_number': 'Phone number',
        'role': 'Role',
        'user_id': 'User ID',
        'type': 'Type'
    };

    return (
        <div className="flex flex-row gap-x-2">
            <label className="w-6/12" htmlFor={props.name}>{input_labels[props.name]}</label>
            <input onChange={props.onChange} className="border-2 border-gray-300 rounded w-6/12" type={props.type ? props.type : 'text'} min={props.type === 'number' ? 1 : undefined} name={props.name} id="" />
        </div>
    );
}

export default AdminPanelInput;
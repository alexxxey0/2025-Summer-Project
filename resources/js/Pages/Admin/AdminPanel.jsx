import React, { useState } from "react";
import ManageUsers from "./AdminPanelTabs/ManageUsers";

function AdminPanel(props) {
    const [selectedTab, setSelectedTab] = useState('manage_users');

    return (
        <div className="w-10/12 mx-auto my-16">
            <h1 className="font-bold text-4xl text-center mb-12">Administrator's panel</h1>

            <div className="flex flex-row gap-x-2">
                <div className="w-10/12">
                    {selectedTab === 'manage_users' && <ManageUsers users={props.users}/>}
                </div>

                <div className="flex flex-col w-2/12 gap-y-2 text-lg *:cursor-pointer">
                    <p className={selectedTab === 'manage_users' ? 'font-bold' : ''}>Manage users</p>
                    <p>Manage products</p>
                    <p>Manage reviews</p>
                    <p>Manage orders</p>
                    <p>Statistics</p>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
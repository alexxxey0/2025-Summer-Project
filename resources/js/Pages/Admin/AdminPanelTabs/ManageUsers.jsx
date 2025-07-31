import React from "react";
import AdminPanelInput from "../AdminPanelInput";

function ManageUsers() {
    return (
        <div className="flex flex-col gap-y-8">
            <p>Click on a row to get more detailed information about a user and edit their information.</p>

            {/* Search users, Get user by ID */}
            <div className="flex flex-row gap-x-8 items-end">
                <div className="border-2 rounded-lg p-2">
                    <h1 className="font-bold mb-4 text-lg">Search users</h1>
                    <div className="flex flex-col gap-y-4">
                        <AdminPanelInput name="name" />
                        <AdminPanelInput name="surname" />
                        <AdminPanelInput name="email" />
                        <AdminPanelInput name="phone_number" />
                        <AdminPanelInput name="role" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Get user directly by ID</h1>
                    <div className="flex flex-row items-center gap-x-4">
                        <AdminPanelInput name="user_id" type="number"/>
                        <button className="bg-black text-white px-4 text-lg rounded-lg shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer">Get</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
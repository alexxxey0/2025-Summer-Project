import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import AdminPanelInput from "../AdminPanelInput";
import UsersTableRow from "../UsersTableRow";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ManageUsers(props) {

    const [pageSize, setPageSize] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState(props.users);
    const [pageCount, setPageCount] = useState(Math.ceil(displayedUsers.length / pageSize));
    const [currentPage, setCurrentPage] = useState(1);

    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        user_id: ''
    });

    function submit(e) {
        e.preventDefault();
        post('/get_user_by_id');
    }

    const handleSearch = (e) => {
        const inputs = document.querySelectorAll('.search_users input'); // get all the inputs

        let currentSearchParameters = {};
        inputs.forEach((input) => {
            // Get all the non-empty search parameters
            if (input.value !== '') currentSearchParameters[input.name] = input.value;
        });

        // Filter the users down to only the ones that match the search parameters
        const filtered_users = props.users.filter((user) => {
            for (const [key, value] of Object.entries(currentSearchParameters)) {
                // As all the search parameters here are not unique, we are searching using substring instead of exact match
                // The search is case insensitive
                if (!(user[key].toLowerCase().includes(value.toLowerCase()))) return false;
            }
            return true;
        });

        setDisplayedUsers(filtered_users);
        setPageCount(Math.ceil(filtered_users.length / pageSize));
        setCurrentPage(1);
    }

    function showNextPage() {
        if (currentPage < pageCount) setCurrentPage(currentPage => currentPage + 1);
    }

    function showPreviousPage() {
        if (currentPage >= 2) setCurrentPage(currentPage => currentPage - 1);
    }

    function changePageSize(e) {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
        setPageCount(Math.ceil(displayedUsers.length / newPageSize));
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col gap-y-12">
            <p>Click on a row to get more detailed information about a user and edit their information.</p>

            {/* Search users, Get user by ID */}
            <div className="flex flex-row gap-x-8 items-end">
                <div className="border-2 rounded-lg p-2">
                    <h1 className="font-bold mb-4 text-lg">Search users</h1>
                    <div className="search_users flex flex-col gap-y-4">
                        <AdminPanelInput onChange={handleSearch} name="name" />
                        <AdminPanelInput onChange={handleSearch} name="surname" />
                        <AdminPanelInput onChange={handleSearch} name="email" />
                        <AdminPanelInput onChange={handleSearch} name="phone_number" />
                        <AdminPanelInput onChange={handleSearch} name="role" />
                    </div>
                </div>

                <div className="flex flex-col gap-y-1">
                    <h1 className="font-bold text-lg">Get user directly by ID</h1>
                    <form onSubmit={submit} className="flex flex-row items-center gap-x-4">
                        <div className="flex flex-row gap-x-2">
                            <label className="w-6/12" htmlFor="user_id">User ID</label>
                            <input value={data.user_id} onChange={e => setData('user_id', e.target.value)} className="border-2 border-gray-300 rounded w-6/12" type="number" min="1" name="user_id" />
                        </div>
                        <button type="submit" className="bg-black text-white px-4 text-lg rounded-lg shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer">Get</button>
                    </form>
                </div>
            </div>

            {/* Users table */}
            <div className="grid grid-cols-6 bg-[#5b5b5b]  *:p-2 *:overflow-x-scroll gap-0.5 border-2 border-[#5b5b5b] rounded">
                <div className="contents *:bg-[#f5f5f5] *:p-2 font-bold text-base">
                    <p>User ID</p>
                    <p>Name</p>
                    <p>Surname</p>
                    <p>Email address</p>
                    <p>Phone number</p>
                    <p>Role</p>
                </div>

                {displayedUsers.slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).map(user =>
                    <UsersTableRow user={user} key={user.user_id} />
                )}
            </div>

            <div className="self-center flex flex-col items-center">
                <p>Page {currentPage} of {pageCount}</p>
                <div className="flex flex-row gap-x-2">
                    <IoIosArrowBack onClick={showPreviousPage} className="text-3xl cursor-pointer" />
                    <IoIosArrowForward onClick={showNextPage} className="text-3xl cursor-pointer" />
                </div>
                <div className="flex flex-row gap-x-1 justify-center items-center mt-4">
                    <label htmlFor="users_per_page">Users per page:</label>
                    <input className="border-2 rounded w-2/12 p-1" type="number" min="1" value={pageSize} onChange={changePageSize} />
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
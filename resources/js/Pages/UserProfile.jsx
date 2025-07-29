import React, { useState } from "react";
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { FaXmark } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { format_date } from "../helpers";


function UserProfile() {
    const { auth } = usePage().props;

    const [selectedTab, setSelectedTab] = useState('personal_details');

    return (
        <div className="flex flex-col w-10/12 mx-auto my-16">
            <h1 className="font-bold text-2xl mb-6">My profile</h1>

            {!auth.user.email_confirmed &&
                <div className="flex flex-row items-center gap-x-4 mb-8">
                    <CiWarning className="text-5xl"/>
                    <p>Your email address is not confirmed yet. In order to make purchases, you must confirm it. Check your inbox for the instructions.</p>
                </div>
            }

            <div className="flex flex-row gap-x-4">
                <div className="grid grid-cols-10 gap-x-4 gap-y-4 w-10/12">
                    {/* Name and profile picture */}
                    <div className="col-span-4 bg-gray-200 p-4 flex flex-col items-center gap-y-4 pb-16">
                        <img className="w-1/4 rounded-full" src={"storage/" + auth.user.profile_picture_path ? "storage/" + auth.user.profile_picture_path : "profile_pictures/default.png"} alt="User's profile picture" />
                        <p className="text-xl">{auth.user.name} {auth.user.surname}</p>
                    </div>

                    {/* Personal details */}
                    <div className="col-span-6 bg-gray-200 p-4">
                        <div className="flex flex-col gap-y-8 items-start">
                            <h1 className="text-xl font-bold">Personal information</h1>

                            <div className="grid grid-cols-2 gap-y-2 auto-rows-fr items-center">
                                <p className="font-bold">Name</p>
                                <p>{auth.user.name}</p>
                                <p className="font-bold">Surname</p>
                                <p>{auth.user.surname}</p>
                                <p className="font-bold">Email</p>
                                {auth.user.email_confirmed ?
                                    <div className="flex flex-row items-center text-green-500">
                                        <p>{auth.user.email}</p>
                                        <IoIosCheckmark className="text-4xl" />

                                    </div>
                                    :
                                    <div className="flex flex-row items-center text-red-500 gap-x-2">
                                        <p>{auth.user.email}</p>
                                        <FaXmark className="text-xl" />
                                    </div>
                                }
                                <p className="font-bold">Phone number</p>
                                <p>{auth.user.phone_number ? auth.user.phone_number : "Not provided"}</p>
                                <p className="font-bold">Registration date</p>
                                <p>{format_date(auth.user.created_at)}</p>
                            </div>

                            {/* Edit personal details button */}
                            <button className="bg-black text-white p-2 rounded-md mt-8 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer">Edit personal details</button>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-y-2 w-2/12 text-lg">
                    <Link className={selectedTab === 'personal_details' ? 'font-bold' : ''}>Personal details</Link>
                    <Link className={selectedTab === 'order_history' ? 'font-bold' : ''}>Order history</Link>
                    <Link className={selectedTab === 'my_reviews' ? 'font-bold' : ''}>My reviews</Link>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
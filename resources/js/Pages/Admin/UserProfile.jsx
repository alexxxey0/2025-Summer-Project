import React, { useState } from "react";
import { usePage } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { FaXmark } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { format_date } from "../../helpers";


function UserProfile(props) {

    const [selectedTab, setSelectedTab] = useState('personal_details');
    const { asset_path } = usePage().props;

    return (
        <div className="flex flex-col w-10/12 mx-auto my-16">
            <h1 className="font-bold text-2xl mb-6">User's profile</h1>

            {!props.user.email_confirmed &&
                <div className="flex flex-row items-center gap-x-4 mb-8">
                    <CiWarning className="text-5xl" />
                    <p>User's email address is not confirmed yet.</p>
                </div>
            }

            <div className="flex flex-row gap-x-4">
                <div className="grid grid-cols-10 gap-x-4 gap-y-4 w-10/12">
                    {/* Name and profile picture */}
                    <div className="col-span-4 bg-gray-200 p-4 flex flex-col items-center gap-y-4 pb-16">
                        <img className="w-1/4 rounded-full aspect-square" src={props.user.profile_picture_path ? asset_path + "storage/" + props.user.profile_picture_path : asset_path + "storage/profile_pictures/default.png"} alt="User's profile picture" />
                        <p className="text-xl">{props.user.name} {props.user.surname}</p>
                    </div>

                    {/* Personal details */}
                    <div className="col-span-6 bg-gray-200 p-4">
                        <div className="flex flex-col gap-y-8 items-start">
                            <h1 className="text-xl font-bold">Personal information</h1>

                            <div className="grid grid-cols-2 gap-y-2 auto-rows-fr items-center">
                                <p className="font-bold">User ID</p>
                                <p>{props.user.user_id}</p>
                                <p className="font-bold">Name</p>
                                <p>{props.user.name}</p>
                                <p className="font-bold">Surname</p>
                                <p>{props.user.surname}</p>
                                <p className="font-bold">Email</p>
                                {props.user.email_confirmed ?
                                    <div className="flex flex-row items-center text-green-500">
                                        <p>{props.user.email}</p>
                                        <IoIosCheckmark className="text-4xl" />

                                    </div>
                                    :
                                    <div className="flex flex-row items-center text-red-500 gap-x-2">
                                        <p>{props.user.email}</p>
                                        <FaXmark className="text-xl" />
                                    </div>
                                }
                                <p className="font-bold">Phone number</p>
                                <p>{props.user.phone_number ? props.user.phone_number : "Not provided"}</p>
                                <p className="font-bold">Registration date</p>
                                <p>{format_date(props.user.created_at)}</p>
                                <p className="font-bold">Role</p>
                                <p>{props.user.role}</p>
                            </div>

                            <div className="flex flex-col gap-y-2 mt-8 text-center">
                                {/* Edit personal details button */}
                                <Link href={"/user_profile/" + props.user.user_id + "/edit"} className="bg-black text-white p-2 rounded-md shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer">Edit user's personal details</Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-y-2 w-2/12 text-lg">
                    <Link className={selectedTab === 'personal_details' ? 'font-bold' : ''}>User's personal details</Link>
                    <Link className={selectedTab === 'order_history' ? 'font-bold' : ''}>User's order history</Link>
                    <Link className={selectedTab === 'reviews' ? 'font-bold' : ''}>User's reviews</Link>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
import React from "react";
import { usePage } from '@inertiajs/react';
import { FaXmark } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";

function UserProfile() {
    const { auth } = usePage().props;

    return (
        <div className="flex flex-col w-10/12 mx-auto my-16">
            <h1 className="font-bold text-2xl mb-6">My profile</h1>
            <div className="flex flex-row">
                <div className="grid grid-cols-10 gap-x-4 gap-y-4">
                    {/* Name and profile picture */}
                    <div className="col-span-4 bg-gray-200 p-4 flex flex-col items-center gap-y-4 pb-16">
                        <img className="w-1/4 rounded-full" src={"storage/" + auth.user.profile_picture_path ? "storage/" + auth.user.profile_picture_path : "profile_pictures/default.png"} alt="User's profile picture" />
                        <p className="text-xl">{auth.user.name} {auth.user.surname}</p>
                    </div>

                    {/* Personal details */}
                    <div className="col-span-6 bg-gray-200 p-4">
                        <div className="flex flex-col gap-y-8">
                            <h1 className="text-xl font-bold">Personal information</h1>
                            <div className="grid grid-cols-2 gap-y-2">
                                <p className="font-bold">Name</p>
                                <p>{auth.user.name}</p>
                                <p className="font-bold">Surname</p>
                                <p>{auth.user.surname}</p>
                                <p className="font-bold">Email</p>
                                {auth.user.email_confirmed ?
                                    <div className="flex flex-row items-center text-green-500">
                                        <p>{auth.user.email}</p>
                                        <IoIosCheckmark className="text-4xl"/>

                                    </div>
                                    :
                                    <div className="flex flex-row items-center text-red-500">
                                        <p>{auth.user.email}</p>
                                        <img src="images/cross_icon.svg" alt="" />
                                        <FaXmark />
                                    </div>
                                }
                                <p className="font-bold">Phone number</p>
                                <p>{auth.user.phone_number ? auth.user.phone_number : "Not provided"}</p>
                                <p className="font-bold">Registration date</p>
                                <p>{auth.user.created_at}</p>
                            </div>
                        </div>
                    </div>

                    {/* Email verification notice */}
                    <div className="col-span-4 bg-gray-200 p-4">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sunt exercitationem ipsa maiores molestias accusantium veniam ipsum? Tempora, dignissimos facere.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
import React from 'react';
import { Link } from "@inertiajs/react";

function Register() {
    return (
        <div className='px-16 py-16'>
            <h1 className='text-center text-5xl font-bold mb-8'>Register</h1>

            <form action="" className='flex flex-col gap-y-4 mx-auto w-2/12'>
                <p><span className='text-red-500'>*</span> indicates a required field</p>

                <div className='flex flex-col'>
                    <label htmlFor="email">Name<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="text" name="name" id="name" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Surname<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="text" name="surname" id="surname" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="email" name="email" id="email" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Phone number</label>
                    <input className='p-1 border-1 border-black rounded-md' type="text" name="phone_number" id="phone_number" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password" id="password" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Confirm password<span className='text-red-500'>*</span></label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password_confirmation" id="password_confirmation" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Profile picture</label>
                    <input className='p-1 border-1 border-black rounded-md' type="file" accept="image/*" name="profile_picture" id="profile_picture" />
                </div>

                <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Register</button>
            </form>
        </div>
    );
}

export default Register;
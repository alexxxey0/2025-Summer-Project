import React from 'react';
import { Link } from "@inertiajs/react";

function Login() {
    return (
        <div className='px-16 py-16'>
            <h1 className='text-center text-5xl font-bold mb-8'>Log in</h1>

            <form action="" className='flex flex-col gap-y-4 mx-auto w-2/12'>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input className='p-1 border-1 border-black rounded-md' type="email" name="email" id="email" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password" id="password" />
                    <Link className='text-gray-500 hover:text-gray-600 underline'>Forgot your password?</Link>
                </div>

                <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Log in</button>
            </form>
        </div>
    );
}

export default Login;
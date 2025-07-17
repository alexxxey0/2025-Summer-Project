import React from "react";
import { useForm } from '@inertiajs/react';

function PasswordResetRequest() {
    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        email: ''
    });

    function submit(e) {
        e.preventDefault();
        post('/send_password_reset_email');
    }

    return (
        <div className='login_form_with_title my-32 w-4/12 py-16 px-24 rounded-lg bg-gray-200 mx-auto'>
            <h1 className='text-center text-4xl font-bold mb-8'>Reset your password</h1>
            <p className="mb-8">Enter your email address to reset your password.</p>

            <form action="" className='flex flex-col gap-y-4 mx-auto' onSubmit={submit}>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input className='p-1 border-1 border-black rounded-md' type="email" name="email" id="email" required value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div>{errors.email}</div>}
                </div>

                <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Send recovery email</button>
            </form>
        </div>
    );
}

export default PasswordResetRequest;
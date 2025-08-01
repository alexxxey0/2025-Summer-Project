import React from 'react';
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Link } from "@inertiajs/react";

function ChangePassword() {
    const { auth } = usePage().props;

    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
        user_id: auth.user.user_id
    });

    function submit(e) {
        e.preventDefault();
        post('/change_password');
    }

    return (
        <div className='mt-16'>
            <Link href="/my_profile" className="ml-16 hover:underline text-lg">← Back to profile</Link>
            <div className='register_form_with_title mt-12 mb-32 w-4/12 py-16 px-24 rounded-lg bg-gray-200 mx-auto'>
                <h1 className='text-center text-3xl font-bold mb-8'>Change your password</h1>

                <form onSubmit={submit} className='flex flex-col gap-y-4 mx-auto'>
                    <p><span className='text-red-500'>*</span> indicates a required field</p>

                    <div className='flex flex-col'>
                        <label htmlFor="password">New password<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="password" name="password" id="password" required value={data.password} onChange={e => setData('password', e.target.value)} />
                        {errors.password && <div>{errors.password}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password_confirmation">Confirm new password<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="password" name="password_confirmation" id="password_confirmation" required value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                        {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
                    </div>

                    <input type="hidden" name="user_id" value={auth.user.user_id} />
                    <button type="submit" className='bg-black text-white p-2 rounded-md w-3/12 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Save</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
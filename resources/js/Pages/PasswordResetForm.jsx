import React from "react";
import { useForm } from '@inertiajs/react';

function PasswordResetForm(props) {
    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
        email: props.email,
        token: props.token
    });

    function submit(e) {
        e.preventDefault();
        post('/reset_password');
    }

    return (
        <div className='login_form_with_title my-32 w-4/12 py-16 px-24 rounded-lg bg-gray-200 mx-auto'>
            <h1 className='text-center text-4xl font-bold mb-8'>Reset password for account {props.email}</h1>
            <p className="mb-8">Enter a new password for your account</p>

            <form action="" className='flex flex-col gap-y-4 mx-auto' onSubmit={submit}>
                <div className='flex flex-col'>
                    <label htmlFor="password">New password</label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password" id="password" required value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div>{errors.password}</div>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password_confirmation">Confirm new password</label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password_confirmation" id="password_confirmation" required value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                    {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
                </div>

                <input type="hidden" value={props.email} name='email' />
                <input type="hidden" value={props.token} name='token' />

                <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Update password</button>
            </form>
        </div>
    );
}

export default PasswordResetForm;
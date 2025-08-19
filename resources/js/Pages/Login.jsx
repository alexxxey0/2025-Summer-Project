import React from 'react';
import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CartItemsContext } from './components/Layout';

function Login() {
    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: ''
    });

    const { auth } = usePage().props;
    const { cartItems, setCartItems } = React.useContext(CartItemsContext);

    function submit(e) {
        e.preventDefault();
        post('/login', {
            onSuccess: (page) => {
                setCartItems(page.props.cart_items_db);
            }
        });
    }

    return (
        <div className='login_form_with_title my-32 w-3/12 py-16 px-24 rounded-lg bg-gray-200 mx-auto'>
            <h1 className='text-center text-5xl font-bold mb-8'>Log in</h1>

            <form action="" className='flex flex-col gap-y-4 mx-auto' onSubmit={submit}>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input className='p-1 border-1 border-black rounded-md' type="email" name="email" id="email" required value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input className='p-1 border-1 border-black rounded-md' type="password" name="password" id="password" required value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div>{errors.password}</div>}
                    <Link href='/reset_password' className='text-gray-500 hover:text-gray-600 underline'>Forgot your password?</Link>
                </div>

                <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Log in</button>
            </form>
        </div>
    );
}

export default Login;
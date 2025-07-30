import React from "react";
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Link } from "@inertiajs/react";

function EditPersonalDetails() {
    const { auth } = usePage().props;

    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user.name,
        surname: auth.user.surname,
        phone_number: auth.user.phone_number ? auth.user.phone_number : '',
        email: auth.user.email,
        profile_picture: '',
        user_id: auth.user.user_id
    });

    function submit(e) {
        e.preventDefault();
        post('/edit_personal_details');
    }

    return (
        <div className="mt-16">
            <Link href="/user_profile" className="ml-16 hover:underline text-lg">← Back to profile</Link>
            <div className='register_form_with_title my-24 w-4/12 py-16 px-24 rounded-lg bg-gray-200 mx-auto'>
                <h1 className='text-center text-4xl font-bold mb-8'>Edit personal details</h1>

                <form onSubmit={submit} className='flex flex-col gap-y-4 mx-auto'>
                    <p><span className='text-red-500'>*</span> indicates a required field</p>

                    <div className='flex flex-col'>
                        <label htmlFor="name">Name<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="name" id="name" required value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="surname">Surname<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="surname" id="surname" required value={data.surname} onChange={e => setData('surname', e.target.value)} />
                        {errors.surname && <div>{errors.surname}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="email" name="email" id="email" required value={data.email} onChange={e => setData('email', e.target.value)} />
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="phone_number">Phone number</label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="phone_number" id="phone_number" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                        {errors.phone_number && <div>{errors.phone_number}</div>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="profile_picture">Profile picture</label>
                        <input className='p-1 border-1 border-black rounded-md' type="file" accept="image/*" name="profile_picture" id="profile_picture" onChange={e => setData('profile_picture', e.target.files[0])} />
                        {errors.profile_picture && <div>{errors.profile_picture}</div>}
                    </div>

                    <input type="hidden" name="user_id" value={auth.user.user_id} />
                    <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Save</button>
                </form>
            </div>
        </div>
    );
}

export default EditPersonalDetails;
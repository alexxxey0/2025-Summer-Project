import React, { useState, useEffect } from "react";
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { FaRegTrashAlt } from "react-icons/fa";

function EditProduct(props) {
    const { asset_path } = usePage().props;
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    async function getImageFileFromUrl(url) {
        const response = await fetch(url);
        const data = await response.blob();

        // Get MIME type dynamically
        const mimeType = response.headers.get('Content-Type') || data.type || 'application/octet-stream';
        console.log(mimeType);

        // Extract filename from URL
        const filename = (() => {
            try {
                const pathname = new URL(url).pathname;
                const name = pathname.substring(pathname.lastIndexOf('/') + 1);
                return name || 'file';
            } catch {
                return 'file';
            }
        })();

        // Create File with dynamic type and filename
        return new File([data], filename, { type: mimeType });
    }

    let fetchedImages = [];
    async function createImages() {
        for (let i = 0; i < props.images.length; i++) {
            const file = await getImageFileFromUrl(asset_path + "/storage/" + props.images[i].image_path);
            const preview = URL.createObjectURL(file);
            if (props.images[i].main_image) setMainImageIndex(i);
            fetchedImages.push({ 'file': file, 'preview': preview, 'path': props.images[i].image_path });
        }
        setImages(fetchedImages);
        setData(data => ({
            ...data,
            images: fetchedImages
        }));
    }

    useEffect(() => {
        createImages();
        //console.log(fetchedImages);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        const image = { 'file': file, 'preview': preview, 'path': null };

        setImages(images => {
            const updatedImages = [...images];
            updatedImages[e.target.dataset.index] = image;
            return updatedImages;
        });

        setData(data => ({
            ...data,
            images: [
                ...data.images,
                image
            ]
        }));
    };

    function handleMainImageChange(e) {
        const updatedMainImageIndex = Number(e.target.dataset.index)
        setMainImageIndex(updatedMainImageIndex);
        setData('main_image_index', updatedMainImageIndex);
    }


    useEffect(() => {
        console.log(images);
        console.log(mainImageIndex);
    }, [images]);


    function addImageInput() {
        setImages(images => [...images, { 'file': null, 'preview': null, 'path': null }]);
    }

    function removeImageInput(e) {
        if (images.length > 1) {
            const indexToRemove = Number(e.currentTarget.dataset.index);
            const imagesAfterRemoving = images.filter((_, i) => i !== indexToRemove);
            console.log(indexToRemove, mainImageIndex);
            setImages(imagesAfterRemoving);
            setData(data => ({
                ...data,
                images: imagesAfterRemoving
            }));
            if (indexToRemove === mainImageIndex) {
                setMainImageIndex(0);
                setData('main_image_index', 0);
            }
            if (mainImageIndex > indexToRemove) {
                setMainImageIndex(mainImageIndex => mainImageIndex - 1);
                setData('main_image_index', mainImageIndex - 1);
            }
        }
    }

    let weights = {
        'XXS': 1,
        'XS': 2,
        'S': 3,
        'M': 4,
        'L': 5,
        'XL': 6,
        'XXL': 7
    };

    const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

    // If the size is in the weights array (which contains letter sizes), get the weight for this size for comparison.
    // Otherwise, if the size is not in the weights table, it must be a number, so compare it as a number.
    // This way, we can sort both letter sizes (S, M, L...) and numeric sizes (40, 41, 42, 43...).
    props.product_variants.sort((a, b) => (weights[a.size] ? weights[a.size] : Number(a.size)) - (weights[b.size] ? weights[b.size] : Number(b.size)));

    let in_stock = {};
    sizes.forEach(size => in_stock[size] = 0);
    props.product_variants.forEach(product_variant =>
        in_stock[product_variant.size] = product_variant.in_stock
    );
    //console.log(in_stock);

    // Form helper from Inertia documentation (https://www.inertiajs.com/forms)
    const { data, setData, post, processing, errors } = useForm({
        product_id: props.product.product_id,
        name: props.product.name,
        description: props.product.description,
        price: props.product.price,
        type: props.product.type,
        color: props.product.color,
        manufacturer: props.product.manufacturer,
        gender: props.product.gender,
        age_category: props.product.age_category,
        season: props.product.season,
        in_stock: in_stock,
        images: [],
        main_image_index: 0
    });

    function submit(e) {
        e.preventDefault();
        console.log(data);
        post('/edit_product');
    }

    return (
        <div className="mt-16">
            <Link className="ml-16 hover:underline text-lg" href={props.manage_products_link}>← Back to administrator panel (Manage products)</Link>
            <div className='register_form_with_title my-24 w-6/12 py-16 px-24 rounded-lg bg-gray-200 mx-auto'>
                <h1 className='text-center text-4xl font-bold mb-8'>Edit product's details</h1>

                <form onSubmit={submit} className='flex flex-col gap-y-4 mx-auto'>
                    <p className="text-xl"><span className="font-bold">Product ID:</span> {props.product.product_id}</p>
                    <p><span className='text-red-500'>*</span> indicates a required field</p>

                    <div className='flex flex-col'>
                        <label htmlFor="name">Name<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="name" required value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && <div>{errors.name}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="description">Description<span className='text-red-500'>*</span></label>
                        <textarea rows={15} className='p-1 border-1 border-black rounded-md' type="text" name="description" required value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                        {errors.description && <div>{errors.description}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="price">Price<span className='text-red-500'>*</span></label>
                        <div className="flex flex-row items-center gap-x-1">
                            <input className='w-2/12 p-1 border-1 border-black rounded-md' type="number" min={0.01} step={0.01} name="price" required value={data.price} onChange={e => setData('price', e.target.value)} />
                            {errors.price && <div>{errors.price}</div>}
                            <span className="text-lg">€</span>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="type">Type<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="type" required value={data.type} onChange={e => setData('type', e.target.value)} />
                        {errors.type && <div>{errors.type}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="color">Color<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="color" required value={data.color} onChange={e => setData('color', e.target.value)} />
                        {errors.color && <div>{errors.color}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="manufacturer">Manufacturer<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="manufacturer" required value={data.manufacturer} onChange={e => setData('manufacturer', e.target.value)} />
                        {errors.manufacturer && <div>{errors.manufacturer}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="gender">Gender<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="gender" required value={data.gender} onChange={e => setData('gender', e.target.value)} />
                        {errors.gender && <div>{errors.gender}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="age_category">Age category<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="age_category" required value={data.age_category} onChange={e => setData('age_category', e.target.value)} />
                        {errors.age_category && <div>{errors.age_category}</div>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="season">Season<span className='text-red-500'>*</span></label>
                        <input className='p-1 border-1 border-black rounded-md' type="text" name="season" required value={data.season} onChange={e => setData('season', e.target.value)} />
                        {errors.season && <div>{errors.season}</div>}
                    </div>

                    <div className="mt-4">
                        <p className="mb-2">Upload one or more images<span className='text-red-500'>*</span></p>
                        <p className="mb-2">Click on the image that you want to act as product's main (title) image.</p>
                        <div className="flex flex-col gap-y-4">
                            {images.length > 0 ?

                                images.map((image, index) =>
                                    <div className="flex flex-row gap-x-2" key={index}>
                                        <input id={'image' + index} data-index={index} className="w-4/12 cursor-pointer p-1 border-1 border-black rounded-md h-min" type="file" accept="image/*" onChange={handleImageChange} />
                                        {images[index].preview && (
                                            <img
                                                src={images[index].preview}
                                                data-index={index}
                                                alt="Image preview"
                                                className={(index === mainImageIndex ? "border-4 border-red-500 rounded-md " : "") + "w-3/12 cursor-pointer"}
                                                onClick={handleMainImageChange}
                                            />
                                        )}
                                        {index > 0 && <FaRegTrashAlt data-index={index} onClick={removeImageInput} className="text-2xl cursor-pointer" />}
                                    </div>
                                )

                                :
                                <div className="flex flex-row gap-x-2" key={0}>
                                    <input id={'image0'} className="cursor-pointer p-1 border-1 border-black rounded-md h-min" type="file" accept="image/*" onChange={handleImageChange} />
                                </div>
                            }
                        </div>
                        <button onClick={addImageInput} type="button" className='bg-black text-white p-2 rounded-md w-3/12 mx-auto mt-8 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>+ Add another image</button>
                    </div>

                    <p className="mt-8 text-lg">In stock:</p>
                    {/* Information about sizes in stock */}
                    <div className="flex flex-col gap-y-2">
                        {sizes.map(size =>
                            <div key={size} className="flex flex-row items-center">
                                <p className="py-1 text-lg w-[8%] flex flex-row gap-x-2">{size}: </p>
                                <input className='w-2/12 p-1 border-1 border-black rounded-md' type="number" min={0} required value={data.in_stock[size]}
                                    onChange={e =>
                                        setData(data => ({
                                            ...data,
                                            in_stock: {
                                                ...data.in_stock,
                                                [size]: Number(e.target.value)
                                            }
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>


                    <input type="hidden" name="product_id" value={props.product.product_id} />
                    <button type="submit" className='bg-black text-white p-2 rounded-md w-1/2 mx-auto mt-4 shadow active:translate-y-0.5 active:shadow-inner hover:scale-105 transition cursor-pointer'>Save</button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
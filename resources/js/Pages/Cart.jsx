import { usePage } from '@inertiajs/react';

function Cart(props) {
    const { asset_path } = usePage().props;

    return (
        
        <div className="flex flex-col">
            <div className="flex flex-row justify-evenly">
                <img src={asset_path + "images/vans.jpg"} alt="" />
                <div className="flex flex-col">
                    <h3>Vans Old Skool</h3>
                    <h4>Size: 43</h4>
                </div>
                <p>121,00$</p>
                <p>1</p>
                <p>121,00$</p>
            </div>
            <p>hello</p>
        </div>
    );
}

export default Cart;
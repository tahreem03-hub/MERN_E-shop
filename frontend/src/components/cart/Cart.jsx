import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import React, { useState } from 'react'
import { productData } from '../../static/data';


const CartItem = ({ data }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className='border-b-1 flex p-5'>
            <div className='flex flex-col items-center'>
                <div className='w-6 h-6 rounded-full bg-pink-600'
                    onClick={() => setQuantity(value => value + 1)}>
                    <Plus className='text-[#f1e8ec] brightness-150' strokeWidth={1.5} />
                </div>
                <span>{quantity}</span>
                <div className='w-6 h-6 rounded-full bg-gray-500/50'
                    onClick={() => quantity === 1 ? setQuantity(1) : setQuantity(value => value - 1)}>
                    <Minus className='text-[#f1e8ec] brightness-150' strokeWidth={1.5} />
                </div>
            </div>

            <div className='px-4'>
                <img src={data?.imageUrl[0].url}
                    alt=""
                    className='w-22 h-18' />
            </div>

            <div>
                <h1>{data.name.slice(0, 16)}</h1>
                <h1 className='flex text-[15px] text-gray-500'>Rs.{data.price}<X className='w-4' />{quantity}</h1>
                <h1 className='text-pink-600 font-bold'>PKR {data.price * quantity}.00</h1>

            </div>

            <div className='flex items-center'>
                            <X className='ml-5 text-gray-400 w-4' strokeWidth={1}/>
                        </div>
        </div>
    )
}

const Cart = ({ setOpenCart }) => {

    return (
        <div className='fixed inset-0 bg-[#0000004b] z-10 h-screen w-full'>
            <div className='absolute bg-[#f1e8ec] w-[25%] max-md:w-[80%] h-screen right-0 overflow-scroll'>
                <div className='p-5'>
                    <div className='flex justify-end'>
                        <X onClick={() => setOpenCart(false)}
                            className='text-[#2E294E] cursor-pointer' strokeWidth={1.5} />
                    </div>
                    <div className='flex items-center'>
                        <ShoppingBag className='w-6 text-pink-600' strokeWidth={2} />
                        <h1 className='ml-2 text-lg font-bold text-[#2E294E]/95'>3 items</h1>
                    </div>
                </div>

                {/* items */}
                <div className='border-t-1'>
                    {productData.length > 0 ? (productData?.map((i, index) => (
                        <CartItem
                            data={i}
                            key={index}
                        />
                    ))) :
                        <h1 className='text-2xl flex items-center justify-center h-[300px] text-pink-600/70'>
                            Cart is empty!
                        </h1>}

                </div>



                {productData.length > 0 ? <div className='flex justify-center mt-5'>
                    <button className='w-[80%] h-12 py-2 bg-pink-600 m-2 flex justify-center items-center text-white font-bold text-lg rounded'>
                        Checkout Now (PKR .)
                    </button>
                </div> : null}


            </div>


        </div>
    )
}


export default Cart

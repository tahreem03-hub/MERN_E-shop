import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/actions/cart'
import { toast } from 'react-hot-toast'

const CartItem = ({ data, onIncrement, onDecrement, onRemove }) => {
    return (
        <div className='border-b-1 flex p-5'>
            <div className='flex flex-col items-center'>
                <div className='w-6 h-6 rounded-full bg-pink-600 cursor-pointer'
                    onClick={() => onIncrement(data)}>
                    <Plus className='text-[#f1e8ec] brightness-150' strokeWidth={1.5} />
                </div>
                <span>{data.quantity || 1}</span>
                <div className='w-6 h-6 rounded-full bg-gray-500/50 cursor-pointer'
                    onClick={() => onDecrement(data)}>
                    <Minus className='text-[#f1e8ec] brightness-150' strokeWidth={1.5} />
                </div>
            </div>

            <div className='px-4'>
                <img src={`${import.meta.env.VITE_URL}/uploads/${data.images?.[0]}`}
                    alt=""
                    className='w-22 h-18 object-contain' />
            </div>

            <div className='flex-1'>
                <h1 className='font-semibold text-[#2E294E]'>{data.name.slice(0, 16)}</h1>
                <h1 className='flex text-[15px] text-gray-500'>
                    ${data.discountPrice} <X className='w-4' /> {data.quantity || 1}
                </h1>
                <h1 className='text-pink-600 font-bold'>
                    ${(data.discountPrice * (data.quantity || 1)).toFixed(2)}
                </h1>
            </div>

            <div className='flex items-center'>
                <X onClick={() => onRemove(data._id)} 
                   className='ml-5 text-gray-400 w-4 cursor-pointer hover:text-red-500' strokeWidth={1} />
            </div>
        </div>
    )
}

const Cart = ({ setOpenCart }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)

    // Calculate total
    const totalPrice = cart.reduce((acc, item) => 
        acc + (item.quantity * item.discountPrice), 0
    )

    // Update quantity with stock validation
    const updateCartData = (data) => {
        dispatch(addToCart(data))
    }

    const increment = (item) => {
        // CHECK STOCK BEFORE INCREMENTING
        if ((item.quantity || 1) >= item.stock) {
            toast.error(`Only ${item.stock} items available in stock`)
            return
        }
        const updatedItem = { ...item, quantity: (item.quantity || 1) + 1 }
        updateCartData(updatedItem)
    }

    const decrement = (item) => {
        if ((item.quantity || 1) === 1) return
        const updatedItem = { ...item, quantity: (item.quantity || 1) - 1 }
        updateCartData(updatedItem)
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
        toast.success("Item removed from cart")
    }

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
                        <h1 className='ml-2 text-lg font-bold text-[#2E294E]/95'>
                            Cart Items: {cart.length}
                        </h1>
                    </div>
                </div>

                {/* items */}
                <div className='border-t-1'>
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <CartItem
                                key={item._id || index}
                                data={item}
                                onIncrement={increment}
                                onDecrement={decrement}
                                onRemove={removeFromCartHandler}
                            />
                        ))
                    ) : (
                        <h1 className='text-2xl flex items-center justify-center h-[300px] text-pink-600/70'>
                            Cart is empty!
                        </h1>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className='flex justify-center mt-5'>
                        <button className='w-[80%] h-12 py-2 bg-pink-600 m-2 flex justify-center items-center text-white font-bold text-lg rounded'>
                            Checkout Now (PKR {totalPrice.toFixed(2)})
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
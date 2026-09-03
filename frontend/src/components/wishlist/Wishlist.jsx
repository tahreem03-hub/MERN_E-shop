import { Heart, Minus, Plus, ShoppingBag, ShoppingCart, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../../redux/actions/wishlist'
import { addToCart } from '../../redux/actions/cart'
import { toast } from 'react-hot-toast'

const WishlistItem = ({ data, onRemove, onAddToCart }) => {
    return (
        <div className='border-b-1 flex p-5'>
            <div className='flex items-center'>
                <X 
                    className='text-gray-400 w-5 cursor-pointer hover:text-red-500' 
                    strokeWidth={1}
                    onClick={() => onRemove(data._id)}
                />
            </div>

            <div className='px-4'>
                <img 
                    src={`${import.meta.env.VITE_URL}/uploads/${data?.images?.[0]}`}
                    alt={data?.name}
                    className='w-22 h-18 object-contain' 
                />
            </div>

            <div className='flex-1'>
                <h1 className='font-semibold text-[#2E294E]'>{data?.name?.slice(0, 16)}</h1>
                <h1 className='flex text-[15px] text-gray-500'>
                    Rs.{data?.discountPrice}
                </h1>
                <h1 className='text-pink-600 font-bold'>
                    PKR {data?.discountPrice}.00
                </h1>
            </div>

            <div className='flex items-center'>
                <ShoppingBag 
                    className='ml-5 text-gray-400 w-5 cursor-pointer hover:text-pink-600' 
                    strokeWidth={1}
                    onClick={() => onAddToCart(data)}
                />
            </div>
        </div>
    )
}

const Wishlist = ({ setOpenWishlist }) => {
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist.wishlist)
    const cart = useSelector(state => state.cart.cart)

    // Remove from wishlist
    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id))
        toast.success("Removed from wishlist")
    }

    // Add to cart from wishlist
    const addToCartHandler = (data) => {
        const itemExists = cart.find(item => item._id === data._id)
        
        if (itemExists) {
            toast.error("Item already in cart")
            return
        }
        
        if (data.stock < 1) {
            toast.error("Product stock limited")
            return
        }

        const cartData = { ...data, quantity: 1 }
        dispatch(addToCart(cartData))
        toast.success("Item added to cart successfully")
        
        // Optional: Remove from wishlist after adding to cart
        // dispatch(removeFromWishlist(data._id))
    }

    return (
        <div className='fixed inset-0 bg-[#0000004b] z-10 h-screen w-full'>
            <div className='absolute bg-[#f1e8ec] w-[25%] max-md:w-[80%] h-screen right-0 overflow-scroll'>
                <div className='p-5'>
                    <div className='flex justify-end'>
                        <X 
                            onClick={() => setOpenWishlist(false)}
                            className='text-[#2E294E] cursor-pointer' 
                            strokeWidth={1.5} 
                        />
                    </div>
                    <div className='flex items-center'>
                        <Heart className='w-6 text-pink-600' strokeWidth={2} />
                        <h1 className='ml-2 text-lg font-bold text-[#2E294E]/95'>
                            {wishlist.length} items
                        </h1>
                    </div>
                </div>

                {/* items */}
                <div className='border-t-1'>
                    {wishlist.length > 0 ? (
                        wishlist.map((item, index) => (
                            <WishlistItem
                                key={item._id || index}
                                data={item}
                                onRemove={removeFromWishlistHandler}
                                onAddToCart={addToCartHandler}
                            />
                        ))
                    ) : (
                        <h1 className='text-2xl flex items-center justify-center h-[300px] text-pink-600/70'>
                            Wishlist is empty!
                        </h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Wishlist
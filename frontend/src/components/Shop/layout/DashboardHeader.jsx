import { Box, Gift, MessageCircleCheck, ShoppingBag, Tag } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashboardHeader = () => {
    const { seller } = useSelector((state) => state.seller)
    return (
        <div className='flex justify-between py-2 bg-white px-6'>
            <Link to="/" className="shrink-0">
                <div className="inline-flex items-center px-3 md:px-4 py-1 rounded-full bg-gradient-to-r from-[#F8F4FF] to-[#FFF8F2] shadow-md transition-transform duration-300 hover:scale-[1.02]">
                    <h1 className="font-['Dancing_Script'] text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#2E294E] to-[#6C63FF] bg-clip-text text-transparent">
                        Ellie Crafts
                    </h1>
                </div>
            </Link>


            <div className='flex w-[30%] justify-between items-center'>
                <Link to='/dashboard/coupons'><Gift className='text-[#2E294E]' strokeWidth={1.6} /></Link>
                <Link to='/dashboard/events'><Tag className='text-[#2E294E]' strokeWidth={1.6} /></Link>
                <Link to='/dashboard/products'><ShoppingBag className='text-[#2E294E]' strokeWidth={1.6} /></Link>
                <Link to='/dashboard/orders'><Box className='text-[#2E294E]' strokeWidth={1.6} /></Link>
                <Link to='/dashboard/messages'><MessageCircleCheck className='text-[#2E294E]' strokeWidth={1.6} /></Link>

                <div>
                    <Link to={`/shop/${seller._id}`}>
                    <img
                        src={`${import.meta.env.VITE_URL}/uploads/${seller?.avatar}`}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#dfb3c7]/60"
                    />
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader

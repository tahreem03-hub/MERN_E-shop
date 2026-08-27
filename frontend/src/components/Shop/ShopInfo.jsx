import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ShopInfo = () => {
  const { isLoading, seller } = useSelector((state) => state.seller)

  if (isLoading || !seller) return null

  return (
    <div>
      <div className='w-full py-5'>
        <div className='w-full flex items-center justify-center'>
          <img
            src={`${import.meta.env.VITE_URL}/uploads/${seller.avatar}`}
            alt=""
            className='w-[150px] h-[150px] object-cover rounded-full ring-2 ring-[#dfb3c7]/60'
          />
        </div>

        <h3 className='text-center py-2 text-[20px] font-[600] text-[#2E294E]'>
          {seller.name}
        </h3>

        <p className='text-[16px] text-[#2E294E]/70 p-[10px] flex items-center justify-center text-center'>
          {seller.description}
        </p>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Address</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1 break-words'>{seller.address}</h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Phone Number</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1'>{seller.phoneNumber}</h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Total Products</h5>
        {/* placeholder until get-all-products-shop is built (~2:18–2:24) */}
        <h4 className='text-[15px] text-[#2E294E]/70 py-1'>10</h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Shop Rating</h5>
        {/* placeholder — real rating needs the order/review system, much later */}
        <h4 className='text-[15px] text-[#2E294E]/70 py-1 flex items-center gap-1'>
          4/5 <span className='text-[#F5B301]'>★</span>
        </h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Joined On</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1'>
          {seller.createdAt?.slice(0, 10)}
        </h4>
      </div>

      <div className='py-3 px-4'>
        <Link to='/dashboard'>
          <div className='w-full h-[42px] rounded-[5px] bg-[#B5316B] flex items-center justify-center cursor-pointer'>
            <span className='text-white font-[600]'>Go to Dashboard</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ShopInfo
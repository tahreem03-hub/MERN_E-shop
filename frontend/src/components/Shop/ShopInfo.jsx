import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const ShopInfo = ({ shop, isOwner }) => {
  const navigate = useNavigate()
  const { products } = useSelector((state) => state.product) // filled by ShopProfileData's fetch on the same page

  if (!shop) return null

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/shop/logout`, {
        withCredentials: true,
      })
      toast.success(data.message)
      navigate('/shop-login')
      window.location.reload(true)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <div className='px-3'>
      <div className='w-full py-5'>
        <div className='w-full flex items-center justify-center'>
          <img
            src={`${import.meta.env.VITE_URL}/uploads/${shop.avatar}`}
            alt=""
            className='w-[150px] h-[150px] object-cover rounded-full ring-2 ring-[#dfb3c7]/60'
          />
        </div>

        <h3 className='text-center py-2 text-[20px] font-[600] text-[#2E294E]'>
          {shop.name}
        </h3>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Address</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1 break-words'>{shop.address}</h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Email</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1 break-words'>{shop.email}</h4>
      </div>



      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Phone Number</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1'>{shop.phoneNumber}</h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Total Products</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1'>{products?.length || 0}</h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Shop Rating</h5>
        {/* still a placeholder — needs orders/reviews, not built yet */}
        <h4 className='text-[15px] text-[#2E294E]/70 py-1 flex items-center gap-1'>
          4/5 <span className='text-[#F5B301]'>★</span>
        </h4>
      </div>

      <div className='p-3 border-t border-[#f2e4ea]'>
        <h5 className='font-[600] text-[#2E294E]'>Joined On</h5>
        <h4 className='text-[15px] text-[#2E294E]/70 py-1'>
          {shop.createdAt?.slice(0, 10)}
        </h4>
      </div>

      {isOwner && (
        <>
          <div className='py-3 px-4'>
            <Link to='/dashboard'>
              <div className='w-full h-[42px] rounded-[5px] bg-[#B5316B] flex items-center justify-center cursor-pointer'>
                <span className='text-white font-[600]'>Go to Dashboard</span>
              </div>
            </Link>
          </div>

          <div className='px-4'>
            <div className='w-full h-[42px] rounded-[5px] bg-[#B5316B] flex items-center justify-center cursor-pointer'>
              <button className='text-white font-[600]' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShopInfo
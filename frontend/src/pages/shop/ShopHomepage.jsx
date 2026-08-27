import React from 'react'
import ShopInfo from '../../components/Shop/ShopInfo'
import ShopProfileData from '../../components/Shop/ShopProfileData'

const ShopHomepage = () => {
  return (
    <div className='bg-[#f1e8ec]/40 w-full flex py-10 justify-between'>
      <div className='w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-scroll h-screen sticky top-2 left-0 z-10'>
        <ShopInfo />
      </div>
      <div className='w-[72%] rounded-[4px] bg-white'>
        <ShopProfileData />
      </div>
    </div>
  )
}

export default ShopHomepage
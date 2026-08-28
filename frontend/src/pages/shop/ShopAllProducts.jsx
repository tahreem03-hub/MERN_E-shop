import React from 'react'
import AllProducts from '../../components/Shop/AllProducts'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/layout/DashboardSidebar'

const ShopAllProducts = () => {
  return (
     <div>
      <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar />
        </div>
        <div className='w-full flex justify-center'>
          <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts

import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllOrders from '../../components/Shop/AllOrders'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSideBar />
        </div>
        <div className='w-full flex justify-center'>
          <AllOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllOrders
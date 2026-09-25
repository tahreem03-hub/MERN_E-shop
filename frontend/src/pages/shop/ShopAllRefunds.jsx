import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllRefundOrders from '../../components/Shop/AllRefundOrders'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSideBar'

const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar />
        </div>
        <div className='w-full flex justify-center'>
          <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllRefunds
import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import WithdrawMoney from '../../components/Shop/WithdrawMoney'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSideBar'

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
        <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar />
        </div>
        <div className='w-full flex justify-center'>
          <WithdrawMoney />
        </div>
      </div>
    
    </div>
  )
}

export default ShopWithDrawMoneyPage
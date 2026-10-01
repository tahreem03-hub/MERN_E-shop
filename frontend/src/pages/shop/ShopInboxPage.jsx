import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/layout/DashboardSidebar'
import DashboardMessages from '../../components/Shop/DashboardMessages'

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start w-full">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar />
        </div>
        <div className="w-full flex justify-center">
          <DashboardMessages />
        </div>
      </div>
    </div>
  )
}

export default ShopInboxPage

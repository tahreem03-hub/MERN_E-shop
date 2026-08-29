import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/layout/DashboardSidebar'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar />
        </div>
        <div className='w-full flex justify-center'>
          <AllEvents />
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents

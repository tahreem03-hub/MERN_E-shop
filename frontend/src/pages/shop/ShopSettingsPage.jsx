import React from 'react'
import ShopSettings from '../../components/Shop/ShopSettings'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSideBar'

const ShopSettingsPage = () => {
  return (
    <div >
        <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar />
        </div>
        <div className='w-full flex justify-center'>
          <ShopSettings />
        </div>
      </div>
    </div>
  )
}

export default ShopSettingsPage
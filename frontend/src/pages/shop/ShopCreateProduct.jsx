import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/layout/DashboardSidebar'
import CreateProduct from '../../components/Shop/CreateProduct'

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className='flex items-start w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar />
        </div>
        <div className='w-full flex justify-center'>
          <CreateProduct />
        </div>
      </div>
    </div>
  )
}

export default ShopCreateProduct
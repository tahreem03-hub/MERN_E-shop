import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from '../../components/Shop/OrderDetails'

const ShopOrderDetails = () => {
  return (
    <div className="w-full min-h-screen bg-[#faf7f9]">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <OrderDetails />
      </div>
      <Footer />
    </div>
  )
}

export default ShopOrderDetails
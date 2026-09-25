import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import Checkout from '../components/checkout/Checkout'

const CheckoutPage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-10">
        <CheckoutSteps active={1} />
        <Checkout />
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage
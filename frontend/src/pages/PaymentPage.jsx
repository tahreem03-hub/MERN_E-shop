import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import Payment from '../components/Payment/Payment'

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-10">
        <CheckoutSteps active={2} />
        <Payment />
      </div>
      <Footer />
    </div>
  )
}

export default PaymentPage
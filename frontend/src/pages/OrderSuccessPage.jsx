import React from 'react'
import Lottie from "react-lottie-player";
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import animationData from '../assets/animations/success.json'

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Lottie options={defaultOptions} width={280} height={280} />

      <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-[#2E294E] text-center">
        Your order is successful
      </h1>

      <p className="mt-3 text-sm text-[#6b6480] text-center max-w-md">
        Thank you for shopping with Ellie Crafts. You'll receive a confirmation
        email shortly.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-[#2E294E] text-white font-semibold text-sm transition hover:opacity-90"
        >
          Continue Shopping
        </a>
        <a
          href="/profile"
          className="px-6 py-3 rounded-xl border border-[#2E294E] text-[#2E294E] font-semibold text-sm transition hover:bg-[#2E294E] hover:text-white"
        >
          View Orders
        </a>
      </div>
    </div>
  )
}

const OrderSuccessPage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-10">
        <CheckoutSteps active={3} />
        <Success />
      </div>
      <Footer />
    </div>
  )
}

export default OrderSuccessPage
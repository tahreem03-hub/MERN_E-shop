import React, { useState } from 'react'

// placeholder product list — swap for Redux `allProducts` once you build
// getAllProductsShop (backend ~2:18, redux ~2:24)
const productData = [1, 2, 3, 4, 5, 6, 7, 8]

const ShopProfileData = () => {
  const [active, setActive] = useState(1)

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between border-b border-[#f2e4ea] px-5'>
        <div className='flex'>
          <h5
            className={`px-5 py-3 cursor-pointer font-[600] ${
              active === 1 ? 'text-[#B5316B] border-b-2 border-[#B5316B]' : 'text-[#2E294E]/60'
            }`}
            onClick={() => setActive(1)}
          >
            Shop Products
          </h5>
          <h5
            className={`px-5 py-3 cursor-pointer font-[600] ${
              active === 2 ? 'text-[#B5316B] border-b-2 border-[#B5316B]' : 'text-[#2E294E]/60'
            }`}
            onClick={() => setActive(2)}
          >
            Running Events
          </h5>
          <h5
            className={`px-5 py-3 cursor-pointer font-[600] ${
              active === 3 ? 'text-[#B5316B] border-b-2 border-[#B5316B]' : 'text-[#2E294E]/60'
            }`}
            onClick={() => setActive(3)}
          >
            Shop Reviews
          </h5>
        </div>
      </div>

      {active === 1 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5'>
          {productData.map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-[4px] shadow-sm p-4 h-[250px] flex items-center justify-center text-[#2E294E]/40'
            >
              {/* replace with your real ProductCard once product data is dynamic */}
              Product Placeholder
            </div>
          ))}
        </div>
      )}

      {active === 2 && (
        <div className='p-5 text-[#2E294E]/50'>No running events yet.</div>
      )}

      {active === 3 && (
        <div className='p-5 text-[#2E294E]/50'>No reviews yet.</div>
      )}
    </div>
  )
}

export default ShopProfileData
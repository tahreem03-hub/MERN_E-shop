import React from 'react'
import ProductCard from '../ProductCard'
import { useSelector } from 'react-redux'

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.product)

  // sort a COPY, not the original array — .sort() mutates in place
  const data = allProducts
    ? [...allProducts].sort((a, b) => (b.soldOut || 0) - (a.soldOut || 0)).slice(0, 5)
    : []

  return (
    <div className='mx-12 my-4'>
      <h1 className='font-bold text-5xl text-[#2E294E] py-3'>Best Deals</h1>
      <div className='flex flex-wrap gap-6'>
        {data.length > 0 ? data.map((i, index) => <ProductCard data={i} key={index} />) : null}
      </div>
    </div>
  )
}

export default BestDeals
import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard';

const FeaturedProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedData = productData.sort((a, b) => b.totalSell - a.totalSell);
    const firstFive = sortedData.slice(0, 5);
    setData(firstFive);
  }, [])

  return (
    <div className=' mx-12 my-4'>
      <h1 className='font-bold text-5xl text-[#2E294E] py-3'>Featured Products</h1>

      <div className="flex flex-wrap gap-2">
        {data?.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>


    </div>
  )
}

export default FeaturedProducts

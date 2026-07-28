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
      
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'>
        {data && data.length > 0 ? (
          data.map((i, index) =>
            <ProductCard data={i} key={index} />
          )
        ) : null
        }
      </div>


    </div>
  )
}

export default FeaturedProducts

import React, { useEffect } from 'react'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import { productData } from '../static/data'
import ProductCard from '../components/route/ProductCard'
import { useState } from 'react'

const BestSelling = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedData = productData.sort((a, b) => b.totalSell - a.totalSell);

    setData(sortedData);
  }, [])
  return (
    <div>
      <Header/>

      <div className='flex flex-wrap p-12 gap-6'>

      {data?.map((i, index)=>
      <ProductCard data={i} key={index}/>
    )}
    </div>

      <Footer/>
      
    </div>
  )
}

export default BestSelling

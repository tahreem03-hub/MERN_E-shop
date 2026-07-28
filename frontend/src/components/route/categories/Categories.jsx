import React from 'react'
import { productData } from '../../../static/data'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';

const Categories = () => {

  const navigate = useNavigate();

  return (
    <div className=' mx-12 my-4'>
      <h1 className='font-bold text-5xl text-[#2E294E] py-3'>All Categories</h1>
      <div className='bg-[#f1e8ec] p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-5'>
        {
          productData.map((i, index) => {
            return (
              <Link key={index}
              to={'/products'}
                className='flex md:flex-col lg:flex-row h-auto hover:p-3 shadow-md shadow-[#e7cfda] p-2 justify-between '>

                <div className='flex'>
                  <img src={i.imageUrl[0].url} alt=""
                    className='w-10 h-10 border-2 border-[#e7cfda] rounded-md' />
                  <h1 className='p-2 mx-3 font-[400] text-md text-[#2E294E]'>{i.category}</h1>
                </div>

                <button className='flex bg-[#2E294E] rounded text-[#e7cfda] px-3 py-2 hover:px-3.5 md:mt-3 lg:mt-0'
                onClick={()=>navigate('/products')}>
                  Browse More
                  <span> <ArrowRight className='w-4 ml-2' strokeWidth={1}/></span>
                </button>
              </Link>


            )
          })
        }
      </div>

    </div>
  )
}

export default Categories

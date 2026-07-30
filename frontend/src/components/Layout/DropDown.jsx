import React from 'react'
import { productData } from '../../static/data'
import { Link } from 'react-router-dom'
import slugify from '../../../utils/slugify'
import {ShoppingBasket } from 'lucide-react'

const DropDown = () => {
  return (
    <div className='absolute top-17 left-2 md:left-45 bg-[#f1e8ec] rounded-b-2xl'>
      <Link
        to={`/products?category=all`}
      >
        <div className='flex hover:bg-[#e6dae0] p-2 rounded-2xl items-center'>
         <ShoppingBasket className='h-8 w-8 rounded'/>
          <h3 className='ml-2'>All</h3>
        </div>
      </Link>
      {
        productData.map((i, index) => {
          return (
            <Link
              to={`/products?category=${slugify(i.category)}`}
              key={index}
            >
              <div className='flex hover:bg-[#e6dae0] p-2 rounded-2xl items-center'>
                <img src={`${i.imageUrl[1].url}`} alt=""
                  className='rounded w-8 h-8' />
                <h3 className='ml-2'>{i.category}</h3>
              </div>
            </Link>
          )
        })
      }

    </div>
  )
}

export default DropDown

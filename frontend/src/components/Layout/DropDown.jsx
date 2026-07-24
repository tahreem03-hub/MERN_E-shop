import React from 'react'
import { productData } from '../../static/data'
import { Link } from 'react-router-dom'

const DropDown = () => {
  return (
    <div className='absolute top-17 left-45 bg-[#f1e8ec] rounded-b-2xl'>
      {
        productData.map((i, index)=>{
          return (
            <Link to={'/pro'} key={index}>
              <div className='flex hover:bg-[#e6dae0] p-2 rounded-2xl'>
                      <img src={`${i.imageUrl[1].url}`} alt="" 
                      className='rounded w-8 h-8'/>
                      <h3>{i.category}</h3>
                    </div>
            </Link>
          )
        })
      }
      
    </div>
  )
}

export default DropDown

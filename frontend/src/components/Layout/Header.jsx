import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Heart, ListSortDescending, Search, ShoppingCart, User } from 'lucide-react'
import { productData } from '../../static/data'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import DropDown from './DropDown'
import logo from '../../../public/logo.png'



const Header = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState(null)
  // on Click on categories button it will show list
  const [active, setActive] = useState(false)

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = productData && productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    )
    setSearchData(filteredProducts);
  }

  const handleClick = () => {
    setActive(!active)
  }
  return (
    <div>

      <div className='flex items-center justify-evenly bg-white px-5 py-3'>

        <div className="inline-flex items-center px-2 md:px-4 py-1 rounded-full bg-gradient-to-r from-[#F8F4FF] to-[#FFF8F2] shadow-md">
          <h1 className="font-['Dancing_Script'] text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#2E294E] to-[#6C63FF] bg-clip-text text-transparent">
            Ellie Crafts
          </h1>
        </div>

        <div className='relative flex justify-between rounded-full border border-gray-300/50 bg-[#f1e8ec] pl-5 py-1 w-75 d:w-100 pr-1'>
          <input
            type="text"
            placeholder='Search for products...'
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <div className='w-8 h-8 rounded-full bg-[#2E294E] flex items-center justify-center'>
            <Search className='w-3.5 text-white' />
          </div>

          {/* search result */}

          {searchData && searchData.length > 0 ? (
            <div className='absolute top-12 right-1 bg-[#f1e8ec] min-h-[30vh] rounded-2xl z-999'>
              {
                searchData.map((i, index) => (
                  <Link to='/pro' key={index}>
                    <div className='flex w-90 hover:bg-[#e6dae0] p-2 rounded-2xl'>
                      <img src={`${i.imageUrl[0].url}`} alt=""
                        className='rounded w-8 h-8' />
                      <h3>{i.category}</h3>
                    </div>
                  </Link>
                ))
              }
            </div>
          ) : null
          }
        </div>

        <div className='px-2'>
          <button className='bg-[#2E294E] rounded-full px-3 py-2 text-white font-medium'>
            Become Seller
          </button>
        </div>

      </div>

      <div className='sticky top-0 z-999 relative bg-[#2E294E] h-16 w-100vh p-2 flex items-center justify-evenly'>
        {/*categories*/}
        <div className='flex bg-[#f1e8ec] rounded-t-2xl items-center px-6 py-1'
          onClick={handleClick}>
          <ListSortDescending className='w-4 ml-2 text-[#d8a6be]' strokeWidth={3} />
          <button className='w-20 p-2 font-medium'>Categories</button>
          {active ? (<ChevronUp className='ml-2 w-5 mt-0.5' />) : (<ChevronDown className='ml-2 w-5 mt-0.5' />)}
        </div>

        {active && <DropDown />}

        <Navbar />

        {/* CTA */}
        <div className='flex text-white space-x-1'>
          <Heart />
          <ShoppingCart />
          <User />
        </div>

      </div>

    </div>
  )
}

export default Header

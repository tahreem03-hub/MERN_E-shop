import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'Best Selling', to: '/best-selling' },
    { title: 'Products', to: '/products?category=all' },
    { title: 'Events', to: '/events' },
    { title: 'FAQ', to: '/faq' },
  ]
  return (
    <div className='mx-2 p-3 bg-[#282445] rounded-full'>
      {
        navLinks.map((i, index) => {
          return (
            <NavLink key={index}
              className={({ isActive }) =>
                `mx-2 ${isActive
                  ? "text-[#e6dae0] text-[15px] font-bold border-b-3 border-[#e6dae0] rounded p-1"
                  : "text-[#f1e8ec] hover:text-[#b9b2b5] hover:text-[17px]"
                }`
              }
              to={i.to}>
              {i.title}
            </NavLink>
          )
        })
      }

    </div>
  )
}

export default Navbar

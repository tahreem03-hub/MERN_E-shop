import React from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { title: 'Home', to: '/' },
  { title: 'Best Selling', to: '/best-selling' },
  { title: 'Products', to: '/products?category=all' },
  { title: 'Events', to: '/events' },
  { title: 'FAQ', to: '/faq' },
]

const Navbar = ({ vertical = false }) => {
  // ---- Vertical layout (mobile drawer) ----
  if (vertical) {
    return (
      <nav className="flex flex-col">
        {navLinks.map((i, index) => (
          <NavLink
            key={index}
            to={i.to}
            className={({ isActive }) =>
              `py-3 px-1 border-b border-gray-100 text-[15px] tracking-wide transition-colors ${
                isActive
                  ? 'text-[#2E294E] font-semibold'
                  : 'text-gray-500 hover:text-[#2E294E]'
              }`
            }
          >
            {i.title}
          </NavLink>
        ))}
      </nav>
    )
  }

  // ---- Horizontal pill (desktop) ----
  return (
    <div className="px-4 py-2 bg-[#282445] rounded-full">
      {navLinks.map((i, index) => (
        <NavLink
          key={index}
          to={i.to}
          className={({ isActive }) =>
            `relative mx-3 py-1 text-[15px] tracking-wide transition-colors duration-200
             after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-[#e6dae0]
             after:transition-all after:duration-300 ${
               isActive
                 ? 'text-[#e6dae0] font-semibold after:w-full'
                 : 'text-[#f1e8ec] hover:text-white after:w-0 hover:after:w-full'
             }`
          }
        >
          {i.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Navbar
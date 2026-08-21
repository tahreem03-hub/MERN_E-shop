import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Heart,
  ListFilter,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
} from 'lucide-react'
import { productData } from '../../static/data'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import DropDown from './DropDown'
import { useSelector } from 'react-redux'
import Cart from '../cart/Cart'
import Wishlist from '../wishlist/Wishlist'


const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchData, setSearchData] = useState(null)
  // on Click on categories button it will show list
  const [active, setActive] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)
  // mobile drawer (UI only – no logic change)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = useNavigate()
  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    setSearchData(filteredProducts)
  }

  const handleClick = () => {
    setActive(!active)
  }

  // Reusable search field (used in top bar + mobile drawer)
  const SearchField = ({ inDrawer = false }) => (
    <div
      className={`relative flex items-center justify-between rounded-full border border-gray-300/50 bg-[#f1e8ec] pl-5 pr-1 py-1.5 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-[#2E294E]/10 ${
        inDrawer ? 'w-full' : 'w-full max-w-md'
      }`}
    >
      <input
        type="text"
        placeholder="Search for products..."
        onChange={handleSearchChange}
        value={searchTerm}
        className="w-full bg-transparent text-sm text-[#2E294E] placeholder:text-[#2E294E]/50 outline-none"
      />
      <div className="w-8 h-8 rounded-full bg-[#2E294E] flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105">
        <Search className="w-3.5 text-white" />
      </div>

      {/* search result */}
      {searchData && searchData.length > 0 ? (
        <div className="absolute top-[115%] left-0 right-0 bg-white shadow-xl shadow-[#2E294E]/5 border border-gray-100 max-h-[60vh] overflow-y-auto rounded-2xl z-30 p-1.5 animate-[fd_0.22s_ease-out]">
          {searchData.map((i, index) => (
            <Link to="/pro" key={index} onClick={() => setMobileOpen(false)}>
              <div className="flex items-center gap-3 hover:bg-[#f1e8ec] p-2 rounded-xl transition-colors">
                <img
                  src={`${i.imageUrl[0].url}`}
                  alt=""
                  className="rounded-lg w-10 h-10 object-cover bg-[#f1e8ec]"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-[#2E294E] truncate">
                    {i.name}
                  </h3>
                  <p className="text-xs text-[#d8a6be]">{i.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )

  return (
    <div>
      <style>{`@keyframes fd{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
        @keyframes sl{from{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:none}}`}</style>

      {/* ===== Top bar ===== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-3 md:gap-6 px-4 md:px-8 py-3">
          {/* mobile menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-[#2E294E] shrink-0"
            aria-label="Open menu"
          >
            <Menu />
          </button>

          {/* Brand */}
          <Link to="/" className="shrink-0">
            <div className="inline-flex items-center px-3 md:px-4 py-1 rounded-full bg-gradient-to-r from-[#F8F4FF] to-[#FFF8F2] shadow-md transition-transform duration-300 hover:scale-[1.02]">
              <h1 className="font-['Dancing_Script'] text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#2E294E] to-[#6C63FF] bg-clip-text text-transparent">
                Ellie Crafts
              </h1>
            </div>
          </Link>

          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchField />
          </div>

          {/* Become Seller */}
          <div className="ml-auto md:ml-0 shrink-0">
            <button className="bg-[#2E294E] rounded-full px-4 py-2 text-white text-sm font-medium tracking-wide shadow-sm transition-all duration-200 hover:bg-[#3d3767] hover:shadow-md"
            onClick={()=>{navigate('/shop-create')}}>
              <span className="hidden sm:inline">Become Seller</span>
              <span className="sm:hidden">Sell</span>
            </button>
          </div>
        </div>

        {/* Search (mobile) */}
        <div className="md:hidden px-4 pb-3">
          <SearchField />
        </div>
      </div>

      {/* ===== Nav strip ===== */}
      <div className="sticky top-0 z-10 bg-[#2E294E] shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
          {/* categories */}
          <div className="relative">
            <div
              className={`flex items-center bg-[#f1e8ec] px-4 md:px-6 py-1.5 cursor-pointer select-none transition-colors hover:bg-[#e6dae0] ${
                active ? 'rounded-t-2xl' : 'rounded-2xl'
              }`}
              onClick={handleClick}
            >
              <ListFilter className="w-4 text-[#d8a6be]" strokeWidth={3} />
              <span className="mx-2 font-medium text-[#2E294E] text-sm md:text-base">
                Categories
              </span>
              {active ? (
                <ChevronUp className="w-5 transition-transform" />
              ) : (
                <ChevronDown className="w-5 transition-transform" />
              )}
            </div>
            {active && <DropDown setActive={setActive}/>}
          </div>

          {/* nav (desktop) */}
          <div className="hidden lg:block">
            <Navbar />
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => setOpenWishlist(true)}
              aria-label="Wishlist"
              className="transition-colors hover:text-[#dfb3c7]"
            >
              <Heart className="w-5" />
            </button>
            <button
              onClick={() => setOpenCart(true)}
              aria-label="Cart"
              className="transition-colors hover:text-[#dfb3c7]"
            >
              <ShoppingCart className="w-5" />
            </button>
            {isAuthenticated ? (
              <Link to={'/profile'}>
                <img
                  src={`${import.meta.env.VITE_URL}/uploads/${user.avatar}`}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#dfb3c7]/60 transition hover:ring-[#dfb3c7]"
                />
              </Link>
            ) : (
              <Link
                to={'/login'}
                className="transition-colors hover:text-[#dfb3c7]"
              >
                <User className="w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ===== Mobile drawer ===== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-2xl animate-[sl_0.25s_ease-out] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-['Dancing_Script'] text-2xl font-bold bg-gradient-to-r from-[#2E294E] to-[#6C63FF] bg-clip-text text-transparent">
                Ellie Crafts
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-[#2E294E]"
              >
                <X />
              </button>
            </div>

            <div className="p-5 overflow-y-auto">
              <SearchField inDrawer />

              <div className="mt-6" onClick={() => setMobileOpen(false)}>
                <Navbar vertical />
              </div>

              <button className="mt-6 w-full bg-[#2E294E] rounded-full px-4 py-2.5 text-white text-sm font-medium tracking-wide transition-colors hover:bg-[#3d3767]">
                Become Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* cart popup */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

      {/* wishlist popup */}
      {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
    </div>
  )
}

export default Header
import React from 'react'
import { productData } from '../../static/data'
import { Link } from 'react-router-dom'
import slugify from '../../../utils/slugify'
import { ShoppingBasket } from 'lucide-react'

const DropDown = ({setActive}) => {
  return (
    <div className="absolute top-[calc(100%+2px)] left-0 z-40 w-64 bg-[#f1e8ec] rounded-b-2xl rounded-tr-2xl shadow-xl shadow-[#2E294E]/10 border border-white/60 p-1.5 max-h-[70vh] overflow-y-auto animate-[fd_0.2s_ease-out]">
      <style>{`@keyframes fd{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>

      <Link to={`/products?category=all`}
      onClick={()=>setActive(false)}>
        <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-[#e6dae0]">
          <div className="w-9 h-9 rounded-lg bg-[#2E294E] flex items-center justify-center shrink-0">
            <ShoppingBasket className="h-5 w-5 text-[#f1e8ec]" />
          </div>
          <h3 className="font-medium text-[#2E294E]">All</h3>
        </div>
      </Link>

      <div className="h-px bg-[#2E294E]/10 my-1" />

      {productData.map((i, index) => (
        <Link to={`/products?category=${slugify(i.category)}`} key={index}
        onClick={()=>setActive(false)}>
          <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-[#e6dae0] group">
            <img
              src={`${i.imageUrl[1].url}`}
              alt=""
              className="w-9 h-9 rounded-lg object-cover bg-white/50 transition-transform duration-200 group-hover:scale-105"
            />
            <h3 className="text-[#2E294E] text-sm">{i.category}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default DropDown
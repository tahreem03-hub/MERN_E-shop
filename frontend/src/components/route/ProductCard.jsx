import { Heart, ShoppingBag, Star, Clock } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false)
  const navigate = useNavigate()

  const calculateDiscount = () => {
    const discount = data.price - data.discountPrice
    const percentage = (discount / data.price) * 100
    return Math.round(percentage)
  }

  const percentage = calculateDiscount()
  const id = data.id
  const rating = Math.round(data?.rating || 0)

  return (
    <div className="group relative flex w-full max-w-[260px] flex-col overflow-hidden rounded-3xl border border-[#f2e4ea] bg-[#f1e8ec] transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* meta row */}
      <div className="flex items-center justify-between px-4 pt-4">
        {percentage > 0 ? (
          <span className="rounded-full bg-[#B5316B] px-2.5 py-0.5 text-xs font-semibold text-white">
            {percentage}% off
          </span>
        ) : (
          <span />
        )}
        <span className="flex items-center gap-1 text-xs text-[#6b6480]">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} /> timer
        </span>
      </div>

      {/* image */}
      <div className="relative px-4 pt-3">
        <div className="flex h-44 items-center justify-center rounded-2xl bg-white p-3">
          <img
            src={data?.imageUrl[0]?.url}
            alt={data?.name}
            onClick={() => navigate(`/products/${id}`)}
            className="max-h-full max-w-full cursor-pointer object-contain"
          />
        </div>

        {/* wishlist */}
        <div className="group/heart absolute right-6 top-5">
          <button
            aria-label="Add to wishlist"
            onClick={() => setClick(!click)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition hover:scale-105"
          >
            <Heart
              className={`h-5 w-5 cursor-pointer transition ${
                click ? 'fill-[#B5316B] text-[#B5316B]' : 'fill-transparent text-[#2E294E]'
              }`}
            />
          </button>
          <span className="pointer-events-none absolute right-0 -top-8 hidden whitespace-nowrap rounded bg-[#2E294E] px-2 py-1 text-xs text-white group-hover/heart:block">
            Add to wishlist
          </span>
        </div>
      </div>

      {/* info (clicking navigates, same as before) */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3" onClick={() => navigate(`/products/${id}`)}>
        <div className="flex items-center justify-between gap-2">
          {/* w-fit makes the pill hug its text; max-w + truncate caps long names */}
          <span className="w-fit max-w-[120px] truncate rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#2E294E]">
            {data?.category}
          </span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i <= rating ? 'fill-[#F5B301] text-[#F5B301]' : 'fill-transparent text-[#d9d3dd]'}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-start justify-between gap-2">
          <h1 className="truncate text-lg font-semibold text-[#2E294E]" title={data?.name}>
            {data?.name}
          </h1>
          <span className="whitespace-nowrap text-sm text-emerald-600">{data.totalSell} sold</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="leading-tight">
            {percentage > 0 && (
              <p className="text-xs text-[#a89fb0] line-through">RS {data.price}</p>
            )}
            <p className="text-lg font-bold text-[#2E294E]">RS {data.discountPrice}</p>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-[#2E294E] px-3 py-2 transition hover:opacity-90">
            <ShoppingBag className="h-4 w-4 text-white" strokeWidth={2} />
            <button className="text-xs font-semibold text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
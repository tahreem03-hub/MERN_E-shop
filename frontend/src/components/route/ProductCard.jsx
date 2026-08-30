import { Heart, ShoppingBag, Star, Clock, Calendar } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ data, isEvent = false }) => {
  const [click, setClick] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const navigate = useNavigate()

  const calculateDiscount = () => {
    if (!data?.originalPrice || !data?.discountPrice) return 0
    const discount = data.originalPrice - data.discountPrice
    const percentage = (discount / data.originalPrice) * 100
    return Math.round(percentage)
  }

  const percentage = calculateDiscount()
  const rating = Math.round(data?.rating || 0)

  // Timer logic for events
  useEffect(() => {
    // Only run timer if it's an event and has finish_date
    if (!isEvent || !data?.finish_date) {
      setTimeLeft('')
      return
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const finishDate = new Date(data.finish_date).getTime()
      const difference = finishDate - now

      console.log('Time difference:', difference) // For debugging

      if (difference <= 0) {
        setTimeLeft('Ended')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else {
        setTimeLeft(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`)
      }
    }

    // Calculate immediately
    calculateTimeLeft()
    
    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(timer)
  }, [isEvent, data?.finish_date])

  // Check if event is running
  const isEventRunning = () => {
    if (!isEvent || !data?.start_date || !data?.finish_date) return false
    const now = new Date().getTime()
    const startDate = new Date(data.start_date).getTime()
    const finishDate = new Date(data.finish_date).getTime()
    return now >= startDate && now <= finishDate
  }

  const eventStatus = isEventRunning()

  // Determine what to show in the meta row
  const renderMetaContent = () => {
    if (isEvent) {
      if (eventStatus) {
        return (
          <span className="flex items-center gap-1 text-xs text-[#6b6480]">
            <Clock className="h-3.5 w-3.5 animate-pulse" strokeWidth={2} />
            {timeLeft || 'Loading...'}
          </span>
        )
      } else {
        const now = new Date().getTime()
        const startDate = new Date(data.start_date).getTime()
        return (
          <span className="flex items-center gap-1 text-xs text-red-500">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            {now < startDate ? 'Upcoming' : 'Ended'}
          </span>
        )
      }
    } else {
      return (
        <span className="flex items-center gap-1 text-xs text-[#6b6480]">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {data?.stock || 0} in stock
        </span>
      )
    }
  }

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
        
        {/* Timer or Event Status */}
        {renderMetaContent()}
      </div>

      {/* image */}
      <div className="relative px-4 pt-3">
        <div className="flex h-44 items-center justify-center rounded-2xl bg-white p-3">
          <img
            src={`${import.meta.env.VITE_URL}/uploads/${data?.images?.[0]}`}
            alt={data?.name || 'Product'}
            onClick={() => navigate(isEvent ? `/event/${data._id}` : `/product/${data._id}`)}
            className='w-full h-[150px] object-cover cursor-pointer'
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
              className={`h-5 w-5 cursor-pointer transition ${click ? 'fill-[#B5316B] text-[#B5316B]' : 'fill-transparent text-[#2E294E]'
                }`}
            />
          </button>
          <span className="pointer-events-none absolute right-0 -top-8 hidden whitespace-nowrap rounded bg-[#2E294E] px-2 py-1 text-xs text-white group-hover/heart:block">
            Add to wishlist
          </span>
        </div>
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3" onClick={() => navigate(isEvent ? `/event/${data._id}` : `/product/${data._id}`)}>
        <div className="flex items-center justify-between gap-2">
          <span className="w-fit max-w-[120px] truncate rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#2E294E]">
            {data?.category || 'Uncategorized'}
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
          <span className="whitespace-nowrap text-sm text-emerald-600">
            {data?.soldOut || 0} sold
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="leading-tight">
            {percentage > 0 && (
              <p className="text-xs text-[#a89fb0] line-through">RS {data.originalPrice}</p>
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
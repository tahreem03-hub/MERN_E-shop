import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getAllShopProducts } from '../../redux/actions/product'
import { getAllEventsShop } from '../../redux/actions/event'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const ShopProfileData = () => {
  const [active, setActive] = useState(1)
  const { id } = useParams() // shop id from the URL, not the logged-in seller

  const { products, isLoading: productsLoading } = useSelector((state) => state.product)
  const { events, isLoading: eventsLoading } = useSelector((state) => state.event)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getAllShopProducts(id))
      dispatch(getAllEventsShop(id))
    }
  }, [dispatch, id])

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between border-b border-[#f2e4ea] px-5'>
        <div className='flex'>
          <h5
            className={`px-5 py-3 cursor-pointer font-[600] ${active === 1 ? 'text-[#B5316B] border-b-2 border-[#B5316B]' : 'text-[#2E294E]/60'}`}
            onClick={() => setActive(1)}
          >
            Shop Products
          </h5>
          <h5
            className={`px-5 py-3 cursor-pointer font-[600] ${active === 2 ? 'text-[#B5316B] border-b-2 border-[#B5316B]' : 'text-[#2E294E]/60'}`}
            onClick={() => setActive(2)}
          >
            Running Events
          </h5>
          <h5
            className={`px-5 py-3 cursor-pointer font-[600] ${active === 3 ? 'text-[#B5316B] border-b-2 border-[#B5316B]' : 'text-[#2E294E]/60'}`}
            onClick={() => setActive(3)}
          >
            Shop Reviews
          </h5>
        </div>
      </div>

      {active === 1 && (
        productsLoading ? (
          <div className='flex justify-center py-16'><Loader2 className='h-6 w-6 animate-spin text-[#2E294E]/40' /></div>
        ) : !products || products.length === 0 ? (
          <div className='p-5 text-[#2E294E]/50'>No products yet.</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5'>
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className='bg-white rounded-[4px] shadow-sm overflow-hidden border border-[#f2e4ea]'
              >
                <img
                  src={`${import.meta.env.VITE_URL}/uploads/${product.images?.[0]}`}
                  alt={product.name}
                  className='w-full h-[150px] object-cover'
                />
                <div className='p-3'>
                  <h4 className='text-sm font-medium text-[#2E294E] line-clamp-1'>{product.name}</h4>
                  <p className='text-sm text-[#B5316B] font-[600]'>US$ {product.discountPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        )
      )}

      {active === 2 && (
        eventsLoading ? (
          <div className='flex justify-center py-16'><Loader2 className='h-6 w-6 animate-spin text-[#2E294E]/40' /></div>
        ) : !events || events.length === 0 ? (
          <div className='p-5 text-[#2E294E]/50'>No running events yet.</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5'>
            {events.map((event) => (
              <Link
                to={`/product/${event._id}`}
                key={event._id}
                className='bg-white rounded-[4px] shadow-sm overflow-hidden border border-[#f2e4ea]'
              >
                <img
                  src={`${import.meta.env.VITE_URL}/uploads/${event.images?.[0]}`}
                  alt={event.name}
                  className='w-full h-[150px] object-cover'
                />
                <div className='p-3'>
                  <h4 className='text-sm font-medium text-[#2E294E] line-clamp-1'>{event.name}</h4>
                  <p className='text-sm text-[#B5316B] font-[600]'>US$ {event.discountPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        )
      )}

      {active === 3 && (
        <div className='p-5 text-[#2E294E]/50'>No reviews yet.</div>
      )}
    </div>
  )
}

export default ShopProfileData
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getAllShopProducts } from '../../redux/actions/product'
import { getAllEventsShop } from '../../redux/actions/event'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import ProductCard from '../route/ProductCard'

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
              <ProductCard data={product} key={product._id}/>
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
              <ProductCard data={event} key={event._id} isEvent={true}/>
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
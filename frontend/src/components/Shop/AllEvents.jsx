import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEventsShop, deleteEvent } from '../../redux/actions/event'
import { Link } from 'react-router-dom'
import { Eye, Trash2, Loader2, PackageX } from 'lucide-react'

const AllEvents = () => {
  const { seller } = useSelector((state) => state.seller)
  const { events, isLoading } = useSelector((state) => state.event)
  const dispatch = useDispatch()

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id))
    }
  }, [dispatch, seller?._id])

  const handleDelete = (id) => {
    dispatch(deleteEvent(id))
    window.location.reload()
  }

  return (
    <div className='w-full mx-8 pt-1 mt-10 bg-white'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center py-24 text-[#2E294E]/50'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <p className='mt-3 text-sm'>Loading events…</p>
        </div>
      ) : !events || events.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <PackageX className='h-8 w-8 text-[#2E294E]/30' />
          <p className='mt-3 text-sm font-medium text-[#2E294E]'>No events yet</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[#f2e4ea] text-xs uppercase tracking-wide text-[#2E294E]/60'>
                <th className='py-3 px-2'>Name</th>
                <th className='py-3 px-2'>Price</th>
                <th className='py-3 px-2'>Stock</th>
                <th className='py-3 px-2'>Status</th>
                <th className='py-3 px-2'>Preview</th>
                <th className='py-3 px-2'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className='border-b border-[#f2e4ea] text-sm text-[#2E294E]'>
                  <td className='py-3 px-2'>{event.name}</td>
                  <td className='py-3 px-2'>US$ {event.discountPrice}</td>
                  <td className='py-3 px-2'>{event.stock}</td>
                  <td className='py-3 px-2'>{event.status}</td>
                  <td className='py-3 px-2'>
                    <Link to={`/product/${event._id}`}>
                      <Eye className='h-4 w-4 text-[#2E294E]/60 hover:text-[#B5316B]' />
                    </Link>
                  </td>
                  <td className='py-3 px-2'>
                    <button onClick={() => handleDelete(event._id)}>
                      <Trash2 className='h-4 w-4 text-[#2E294E]/60 hover:text-[#B5316B]' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AllEvents
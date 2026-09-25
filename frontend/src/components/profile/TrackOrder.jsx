import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MapPin } from 'lucide-react'
import { getAllOrdersOfUser } from '../../redux/actions/order'

const statusStyle = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
  'Transferred to delivery partner': 'bg-blue-100 text-blue-700',
  'On the way': 'bg-indigo-100 text-indigo-700',
  Received: 'bg-teal-100 text-teal-700',
}

const TrackOrder = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { orders, isLoading } = useSelector((state) => state.order)

  useEffect(() => {
    if (user?._id) dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user?._id])

  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <h1 className="mb-6 text-xl font-bold text-[#2E294E]">Track Order</h1>

      {isLoading ? (
        <p className="py-10 text-center text-sm text-[#6b6480]">Loading...</p>
      ) : orders && orders.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-[#f2e4ea]">
          <table className="w-full text-sm">
            <thead className="bg-[#f1e8ec] text-left text-[#2E294E]">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-[#f2e4ea]">
                  <td className="px-4 py-3 font-medium text-[#2E294E]">
                    #{order._id?.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyle[order.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#6b6480]">{order.cart?.length}</td>
                  <td className="px-4 py-3 font-medium text-[#2E294E]">
                    ${order.totalPrice}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/user/track/order/${order._id}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#B5316B] hover:underline"
                    >
                      <MapPin className="h-4 w-4" /> Track
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-[#6b6480]">
          No orders to track.
        </p>
      )}
    </div>
  )
}

export default TrackOrder
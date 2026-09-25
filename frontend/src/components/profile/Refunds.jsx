import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { getAllOrdersOfUser } from '../../redux/actions/order'

const statusStyle = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-700',
  'Processing refund': 'bg-purple-100 text-purple-700',
  'Refund Success': 'bg-emerald-100 text-emerald-700',
}

const Refunds = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { orders, isLoading } = useSelector((state) => state.order)

  useEffect(() => {
    if (user?._id) dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user?._id])

  const eligibleOrders =
    orders?.filter(
      (item) =>
        item.status === 'Processing refund' || item.status === 'Refund Success'
    ) || []

  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <h1 className="mb-6 text-xl font-bold text-[#2E294E]">Refund Requests</h1>

      {isLoading ? (
        <p className="py-10 text-center text-sm text-[#6b6480]">Loading...</p>
      ) : eligibleOrders.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-[#f2e4ea]">
          <table className="w-full text-sm">
            <thead className="bg-[#f1e8ec] text-left text-[#2E294E]">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {eligibleOrders.map((order) => (
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
                      to={`/user/order/${order._id}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#B5316B] hover:underline"
                    >
                      Details <AiOutlineArrowRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-[#6b6480]">
          No refund requests yet.
        </p>
      )}
    </div>
  )
}

export default Refunds
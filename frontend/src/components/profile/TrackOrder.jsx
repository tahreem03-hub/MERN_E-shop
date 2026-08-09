import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const dummyOrders = [
  { id: 'ORD-1002', status: 'Processing', items: 1, total: 1800 },
  { id: 'ORD-1003', status: 'Shipped', items: 3, total: 6750 },
]

const statusStyle = {
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
}

const TrackOrder = () => {
  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <h1 className="mb-6 text-xl font-bold text-[#2E294E]">Track Order</h1>

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
            {dummyOrders.map((order) => (
              <tr key={order.id} className="border-t border-[#f2e4ea]">
                <td className="px-4 py-3 font-medium text-[#2E294E]">{order.id}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#6b6480]">{order.items}</td>
                <td className="px-4 py-3 font-medium text-[#2E294E]">${order.total}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/track/${order.id}`}
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
    </div>
  )
}

export default TrackOrder
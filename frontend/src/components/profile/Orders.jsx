import React from 'react'
import { Link } from 'react-router-dom'

const dummyOrders = [
  { id: 'ORD-1001', status: 'Delivered', items: 2, total: 4200 },
  { id: 'ORD-1002', status: 'Processing', items: 1, total: 1800 },
  { id: 'ORD-1003', status: 'Shipped', items: 3, total: 6750 },
]

const statusStyle = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
}

const Orders = () => {
  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <h1 className="mb-6 text-xl font-bold text-[#2E294E]">My Orders</h1>

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
                  <Link to={`/order/${order.id}`} className="font-semibold text-[#B5316B] hover:underline">
                    Details
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

export default Orders
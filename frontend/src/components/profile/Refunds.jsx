import React from 'react'

const dummyRefunds = [
  { id: 'REF-501', orderId: 'ORD-0987', status: 'Approved', amount: 1200 },
  { id: 'REF-502', orderId: 'ORD-0991', status: 'Pending', amount: 850 },
]

const statusStyle = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Rejected: 'bg-red-100 text-red-700',
}

const Refunds = () => {
  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <h1 className="mb-6 text-xl font-bold text-[#2E294E]">Refund Requests</h1>

      <div className="overflow-x-auto rounded-xl border border-[#f2e4ea]">
        <table className="w-full text-sm">
          <thead className="bg-[#f1e8ec] text-left text-[#2E294E]">
            <tr>
              <th className="px-4 py-3 font-semibold">Refund ID</th>
              <th className="px-4 py-3 font-semibold">Order ID</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dummyRefunds.map((r) => (
              <tr key={r.id} className="border-t border-[#f2e4ea]">
                <td className="px-4 py-3 font-medium text-[#2E294E]">{r.id}</td>
                <td className="px-4 py-3 text-[#6b6480]">{r.orderId}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-[#2E294E]">${r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dummyRefunds.length === 0 && (
        <p className="py-10 text-center text-sm text-[#6b6480]">No refund requests yet.</p>
      )}
    </div>
  )
}

export default Refunds
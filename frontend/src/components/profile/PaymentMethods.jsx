import React from 'react'
import { Trash2, Plus, CreditCard } from 'lucide-react'

const dummyCards = [
  { id: 1, brand: 'Visa', last4: '4242', expiry: '08/27' },
  { id: 2, brand: 'Mastercard', last4: '8890', expiry: '11/26' },
]

const PaymentMethods = () => {
  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#2E294E]">Payment Methods</h1>
        <button className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {dummyCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#2E294E]">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-[#2E294E]">{card.brand} •••• {card.last4}</p>
                <p className="text-xs text-[#6b6480]">Expires {card.expiry}</p>
              </div>
            </div>
            <button aria-label="Delete card" className="text-[#6b6480] transition hover:text-[#B5316B]">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {dummyCards.length === 0 && (
        <p className="py-10 text-center text-sm text-[#6b6480]">No saved payment methods.</p>
      )}
    </div>
  )
}

export default PaymentMethods
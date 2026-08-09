import React from 'react'
import { Trash2, Plus, MapPin } from 'lucide-react'

const dummyAddresses = [
  { id: 1, label: 'Home', line: 'House 94, New Town, Faisalabad', phone: '+92 213-2138-4091' },
  { id: 2, label: 'Office', line: 'Suite 12, City Tower, Faisalabad', phone: '+92 300-1234-567' },
]

const Address = () => {
  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#2E294E]">Saved Addresses</h1>
        <button className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {dummyAddresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-center justify-between rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 py-3 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#2E294E]">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-[#2E294E]">{addr.label}</p>
                <p className="text-sm text-[#6b6480]">{addr.line}</p>
                <p className="text-xs text-[#6b6480]">{addr.phone}</p>
              </div>
            </div>
            <button aria-label="Delete address" className="text-[#6b6480] transition hover:text-[#B5316B]">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Address
import React from 'react'

const CheckoutSteps = ({ active }) => {
  const steps = [
    { id: 1, label: '1. Shipping' },
    { id: 2, label: '2. Payment' },
    { id: 3, label: '3. Success' },
  ]

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-[90%] lg:w-[50%] flex items-center">
        {steps.map((step, index) => {
          const isActive = active >= step.id
          const lineActive = active > step.id

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition
                  ${isActive
                    ? 'bg-[#B5316B] text-white'
                    : 'bg-[#f1e8ec] text-[#B5316B]'
                  }`}
              >
                {step.label}
              </div>

              {/* Connector Line (not after last step) */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-[4px] mx-1 rounded-full transition
                    ${lineActive ? 'bg-[#B5316B]' : 'bg-[#f1e8ec]'}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckoutSteps
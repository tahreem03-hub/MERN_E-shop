import { HandCoins, Percent, ShieldPlusIcon, Truck } from 'lucide-react'
import React from 'react'

const Marquee = () => {
    const items = [
        { title: 'Free Shipping', description: 'From all over 500 PKr', icon: Truck },
        { title: 'Daily Surprise Offers', description: 'Save upto 25% off', icon: Percent },
        { title: 'Affordable Prices', description: 'Get Manufacturer Direct piece', icon: HandCoins },
        { title: 'Secure Payments', description: '100% Protected Payments', icon: ShieldPlusIcon },
    ]

    const renderItems = () =>
        items.map((i, index) => {
            const Icon = i.icon
            return (
                <div key={index} className='flex items-center gap-3 p-2 min-w-[250px]'>
                    <Icon className='w-8 text-pink-500' strokeWidth={3} />
                    <div className='flex pt-2 flex-col w-full'>
                        <h1 className='text-[#2E294E] font-medium'>{i.title}</h1>
                        <h1 className='text-[#2E294E] text-sm'>{i.description}</h1>
                    </div>
                </div>
            )
        })

    return (
        <div className='min-h-10 sm:min-h-15 md:min-h-20 bg-[#f1e8ec] w-full overflow-hidden my-2'>
            <div className='flex flex-nowrap w-max animate-marquee hover:[animation-play-state:paused]'>
                {renderItems()}
                {renderItems()}
                {renderItems()}
            </div>
        </div>
    )
}

export default Marquee
import React from 'react'
import ShopInfo from '../../components/Shop/ShopInfo'
import ShopProfileData from '../../components/Shop/ShopProfileData'

const ShopPreviewPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#faf7f9]">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6 justify-between">
        <div className="w-full lg:w-[25%] bg-white rounded-2xl border border-[#f2e4ea] shadow-sm lg:sticky lg:top-6 lg:h-[90vh] lg:overflow-y-auto">
          <ShopInfo isOwner={false} />
        </div>
        <div className="w-full lg:w-[72%] bg-white rounded-2xl border border-[#f2e4ea] shadow-sm">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  )
}

export default ShopPreviewPage
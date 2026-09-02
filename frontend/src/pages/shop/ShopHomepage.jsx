import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ShopInfo from '../../components/Shop/ShopInfo'
import ShopProfileData from '../../components/Shop/ShopProfileData'

const ShopHomepage = () => {
  const { id } = useParams()
  const { seller } = useSelector((state) => state.seller)
  const [shop, setShop] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/shop/get-shop-info/${id}`)
      .then((res) => setShop(res.data.Shop))
      .catch((err) => console.log(err))
  }, [id])

  const isOwner = seller && shop && seller._id === shop._id

  return (
    <div className='bg-[#f1e8ec]/40 w-full flex py-10 justify-between'>
      <div className='w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-scroll h-screen sticky top-2 left-0 z-10'>
        <ShopInfo shop={shop} isOwner={isOwner} />
      </div>
      <div className='w-[72%] rounded-[4px] bg-white'>
        <ShopProfileData />
      </div>
    </div>
  )
}
export default ShopHomepage
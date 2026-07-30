import { Heart, ShoppingBag, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// how to set width of category so it just takes the content width
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const calculateDiscount = () => {
    const discount = data.price - data.discountPrice;
    const percentage = (discount / data.price) * 100;
    return Math.round(percentage);
  }

  const percentage = calculateDiscount();
  return (
    <div className='relative h-95 w-55 rounded-t-4xl px-2 bg-[#f1e8ec] gradient-to-[#f1e8ec] m-2'
    >

      <div className='flex p-1 justify-between mx-1 my-2'>
        <h1 className='font-bold text-sm'>{percentage ? percentage : 0}% sales off</h1>
        <h1 className='font-bold text-sm'>timer</h1>
      </div>


      <img src={data?.imageUrl[0]?.url} alt=""
        className='rounded-4xl h-50 w-full'
        onClick={() => navigate('/productdetail')} />


      <div className='p-1'
        onClick={() => navigate('/productdetail')}>
        <div className='flex  justify-between'>
          <h1 className="text-[#2E294E] text-xs bg-pink-50 my-2 min-w-15 text-center rounded p-0.5">
            {data?.category?.length > 10
              ? data.category.slice(0, 8) + "..."
              : data?.category}
          </h1>
          <div className='flex items-center'>
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500' />
          </div>
        </div>

        <div className='flex justify-between'>
          <h1 className='text-[#2E294E] font-medium text-xl mb-4'>{data?.name?.length > 10 ? data.name.slice(0, 7) + '..' : data.name}</h1>
          <h1 className='text-md text-teal-500'>{data.totalSell} sold</h1>
        </div>

        <div className='flex justify-between h-9'>
          <div>
            <h1 className='line-through text-xs text-[#8e88b6]'>RS {data.price}</h1>
            <h1 className='text-[#2E294E]'>RS {data.discountPrice}</h1>
          </div>

          <div className='flex items-center gap-1 bg-[#2E294E] rounded-full px-2'>
            <ShoppingBag className='w-4 text-white' strokeWidth={2} />
            <button className=' text-white text-xs'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="group absolute top-15 left-4">
        <Heart
          className={`text-[#f1e8ec] cursor-pointer ${click ? "fill-[#4b4284]" : ""}`}
          onClick={() => setClick(!click)}
        />

        <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded -top-8">
          Add to wishlist
        </span>
      </div>
    </div>
  )
}

export default ProductCard

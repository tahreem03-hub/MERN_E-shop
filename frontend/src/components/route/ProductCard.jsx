import { Heart, ShoppingBag, Star } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// how to set width of category so it just takes the content width
const ProductCard = ({ data, key }) => {
  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  return (
    <div className='relative h-95 w-55 rounded-t-4xl px-2 bg-[#f1e8ec] gradient-to-[#f1e8ec] m-2'
    >

      <div className='flex p-1 justify-between mx-1 my-2'>
        <h1 className='font-bold text-sm'>30% sales off</h1>
        <h1 className='font-bold text-sm'>timer</h1>
      </div>


      <img src={data?.imageUrl[0]?.url} alt=""
        className='rounded-4xl h-50 w-full'
        onClick={() => navigate('/productdetail page')} />


      <div className='p-1'
        onClick={() => navigate('/productdetail page')}>
        <div className='flex  justify-between'>
          <h1 className='text-[#2E294E] text-xs bg-pink-50 my-2 rounded p-0.5 w-20'>category tag</h1>
          <div className='flex items-center'>
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500 fill-yellow-500' />
            <Star className='w-4.5 ml-0.5 text-yellow-500' />
          </div>
        </div>

        <div className='flex justify-between'>
          <h1 className='text-[#2E294E] font-medium text-xl mb-4'>Title prnmo</h1>
          <h1 className='text-md text-teal-500'>{data.totalSell} sold</h1>
        </div>

        <div className='flex justify-between h-9'>
          <div>
            <h1 className='line-through text-xs text-[#8e88b6]'>RS 123.00</h1>
            <h1 className='text-[#2E294E]'>RS 200.00</h1>
          </div>

          <div className='flex items-center gap-1 bg-[#2E294E] rounded-full px-2'>
            <ShoppingBag className='w-4 text-white' strokeWidth={2} />
            <button className=' text-white text-xs'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Heart className={`absolute top-15 text-[#f1e8ec] left-4 ${click ? "fill-[#4b4284]" : ""}`}
        onClick={() => { setClick(!click) }}
        title={"add"} />
    </div>
  )
}

export default ProductCard

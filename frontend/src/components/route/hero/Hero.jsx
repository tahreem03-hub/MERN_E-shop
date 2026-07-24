import React from 'react'
import hero from '../../../assets/hero.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className='relative flex items-center'>
            <img src={hero} alt=""
                className="w-full h-[532px]"
            />
            <div className='absolute top-0 h-[532px] w-full bg-[#2E294E]/70'></div>
            <div className='absolute top-0 h-[532px] flex flex-col justify-center space-y-4 px-16'>
                <h1 className='text-4xl font-bold text-[#f1e8ec]'>Discover Best Collection</h1>
                <h3 className='text-lg font-md text-[#f1e8ec]'>Transform your living space with our exclusive home decor collection,
                    From elegant wall art to cozy accessories.</h3>
                <button className='shadow-2xl shadow-[#2E294E] w-30 text-[#f1e8ec] font-bold bg-[#2E294E] rounded-md px-4 py-2 hover:px-[17px] hover:py-[9px] hover:shadow'
                    onClick={() => navigate('/products')}>Shop Now</button>
            </div>


        </div>
    )
}

export default Hero

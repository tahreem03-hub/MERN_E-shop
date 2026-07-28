import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/route/hero/Hero'
import Marquee from '../components/route/marquee/Marquee'
import Categories from '../components/route/categories/Categories'
import BestDeals from '../components/route/bestDeals/BestDeals'
import FeaturedProducts from '../components/route/featuredProducts/FeaturedProducts'
import Sponsers from '../components/route/sponsers/Sponsers'


const HomePage = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Marquee/>
      <Categories/>
      <BestDeals/>
      <FeaturedProducts/>
      <Sponsers/>
    </div>
  )
}

export default HomePage

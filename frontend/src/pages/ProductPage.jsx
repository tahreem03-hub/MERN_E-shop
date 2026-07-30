import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data';
import slugify from '../../utils/slugify';
import ProductCard from '../components/route/ProductCard';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const ProductPage = () => {
    const [searchParams]=useSearchParams();
    const categoryName=searchParams.get('category');
    const [data, setData]= useState([]);
    useEffect(()=>{
        if(categoryName==='all' || !categoryName){
            setData(productData)
        }else{
            const filtered=productData.filter(item => slugify(item.category)===categoryName);
            setData(filtered)
        }
    },[categoryName])

  return (
    <div>
        <Header/>
        <div className='flex flex-wrap p-12 gap-6'>

        {data.length>0 ? data.map((i, index)=>(
            <ProductCard data={i} key={index}/>
        )):
        <div>
            no products found
        </div>
        }
        </div>
        <Footer/>
      
    </div>
  )
}

export default ProductPage

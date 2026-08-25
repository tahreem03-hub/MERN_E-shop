import React, { useEffect } from 'react'
import ShopLogin from '../components/Shop/ShopLogin'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ShopLoginPage = () => {
  const {isLoading, isSeller}=useSelector((state)=>state.seller);

  const navigate=useNavigate()
  useEffect(()=>{
      if(isSeller===true){
        navigate('/shop/dashboard')
      }
    },[isLoading, isSeller])
    return (
    <div>
      <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage

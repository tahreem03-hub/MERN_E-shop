import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SellerProtectedRoute = ({children}) => {
  
    const {isSeller,isLoading}=useSelector((state)=>state.seller)
    console.log(isSeller)
    const navigate=useNavigate()
    if(!isSeller){
        //return navigate('/shop-create')
    }
    return children
}

export default SellerProtectedRoute

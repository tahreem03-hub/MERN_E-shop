import React from 'react'
import { Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'

import Store from './redux/Store'
import { loadSeller, loadUser } from './redux/actions/user'


import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ActivationPage from './pages/ActivationPage'
import HomePage from './pages/HomePage'
import BestSelling from './pages/BestSelling'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/ProductDetail'
import ProfileRoutes from '../routes/ProfileRoutes'
import ShopCreatePage from './pages/ShopCreatePage'
import ProtectedRoute from '../routes/ProtectedRoute'
import SellerActivaetionPage from './pages/SellerActivaetionPage'
import ShopLoginPage from './pages/ShopLoginPage'
import SellerProtectedRoute from '../routes/SellerProtectedRoute'
import ShopHomepage from './pages/shop/ShopHomepage'



const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, [])

  return (
    <>

      <Toaster />
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/best-selling' element={<BestSelling />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/products/:id' element={<ProductDetail />} />

        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <ProfileRoutes />
            </ProtectedRoute>
          }
        />

        <Route path='shop-create' element={<ShopCreatePage />} />
        <Route path='shop-login' element={<ShopLoginPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivaetionPage />} />
        <Route path='/shop/:id'
          element={
            <SellerProtectedRoute>
              <ShopHomepage/>
            </SellerProtectedRoute>}
        />


      </Routes>
    </>
  )
}
export default App

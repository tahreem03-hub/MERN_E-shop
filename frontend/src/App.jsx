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
import ShopCreatePage from './pages/ShopCreatePage'
import ProtectedRoute from '../routes/ProtectedRoute'
import SellerActivaetionPage from './pages/SellerActivaetionPage'


import SellerProtectedRoute from '../routes/SellerProtectedRoute'
import ProfileRoutes from '../routes/ProfileRoutes'
import { ShopDashboardPage, ShopCreateProduct, ShopAllProducts, ShopHomepage, ShopLoginPage, ShopAllEvents, ShopCreateEvent, ShopAllCoupons } from '../routes/ShopRoutes'
import { getAllProducts } from './redux/actions/product'




const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
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
        <Route path='/product/:id' element={<ProductDetail />} />

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
        <Route path='/shop/:id' element={<ShopHomepage />} />

        <Route path='/dashboard'
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>}
        />

        <Route
          path='/dashboard/create-product'
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
          path='/dashboard/products'
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />


        <Route
          path='/dashboard/create-event'
          element={
            <SellerProtectedRoute>
              <ShopCreateEvent />
            </SellerProtectedRoute>
          }
        />

        <Route
          path='/dashboard/events'
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />


        <Route
          path='/dashboard/coupons'
          element={
            <SellerProtectedRoute>
              <ShopAllCoupons />
            </SellerProtectedRoute>}
        />


      </Routes>
    </>
  )
}
export default App

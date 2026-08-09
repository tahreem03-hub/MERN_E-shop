import React from 'react'
import ProfileLayout from '../src/pages/ProfileLayout'
import Profile from '../src/components/profile/Profile'
import Orders from '../src/components/profile/Orders'
import Refunds from '../src/components/profile/Refunds'
import TrackOrder from '../src/components/profile/TrackOrder'
import ResetPassword from '../src/components/profile/ResetPassword'
import Address from '../src/components/profile/Address'
import Inbox from '../src/components/profile/Inbox'
// ProfileRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import PaymentMethods from '../src/components/profile/PaymentMethods'

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route element={<ProfileLayout />}>
        <Route index element={<Profile />} />
        <Route path='orders' element={<Orders />} />
        <Route path='refunds' element={<Refunds />} />
        <Route path='inbox' element={<Inbox />} />
        <Route path='track-order' element={<TrackOrder />} />
        <Route path='payment-methods' element={<PaymentMethods />} />
        <Route path='change-password' element={<ResetPassword />} />
        <Route path='address' element={<Address />} />
      </Route>
    </Routes>
  )
}

export default ProfileRoutes
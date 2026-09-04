import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProfileLayout from '../src/pages/ProfileLayout'
import Profile from '../src/components/profile/Profile'
import Orders from '../src/components/profile/Orders'
import Refunds from '../src/components/profile/Refunds'
import TrackOrder from '../src/components/profile/TrackOrder'
import ResetPassword from '../src/components/profile/ResetPassword'
import Address from '../src/components/profile/Address'
import Inbox from '../src/components/profile/Inbox'
import PaymentMethods from '../src/components/profile/PaymentMethods'
import ChangePassword from '../src/components/profile/ChangePassword'

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
        <Route path='change-password' element={<ChangePassword />} />
        <Route path='address' element={<Address />} />
      </Route>
    </Routes>
  )
}

export default ProfileRoutes
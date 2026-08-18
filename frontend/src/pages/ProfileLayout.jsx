import React from 'react'
import Header from '../components/Layout/Header'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#faf7f8]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:px-6 md:py-10">
          <aside className="md:w-64 md:shrink-0">
            <ProfileSidebar />
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default ProfileLayout
import React from 'react'
import Header from '../components/Layout/Header'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
    return (
        <>
            <Header />
            <div className="flex">
                <ProfileSidebar />

                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default ProfileLayout

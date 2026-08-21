import { Camera } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Profile = () => {
  const { user } = useSelector((state) => state.user)

  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phoneNumber || "")
  const [email, setEmail] = useState(user.email || "")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
}

return (
  <div className="mx-auto max-w-2xl px-4 py-10">
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-8 text-2xl font-bold text-[#2E294E]">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={
                avatarPreview
                  ? avatarPreview
                  : user?.avatar
                    ? `${import.meta.env.VITE_URL}/uploads/${user.avatar}`
                    : "/default-avatar.png"
              }
              className="h-40 w-40 rounded-full border-4 border-[#2E294E] object-cover"
              alt="Profile avatar"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-2 left-[65%] cursor-pointer rounded-full bg-[#f1e8ec] p-2 shadow-sm transition hover:bg-[#e8d8de]"
            >
              <Camera className="h-5 w-5 text-[#2E294E]" strokeWidth={1.5} />
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>
        </div>

        {/* name + email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#2E294E]">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#f2e4ea] px-3 py-2 text-sm text-[#2E294E] outline-none transition focus:border-[#2E294E]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#2E294E]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#f2e4ea] px-3 py-2 text-sm text-[#6b6480] outline-none"
            />
          </div>
        </div>

        {/* phone + password */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[#2E294E]">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XX-XXXXXXX"
              className="w-full rounded-xl border border-[#f2e4ea] px-3 py-2 text-sm text-[#2E294E] outline-none transition focus:border-[#2E294E]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#2E294E]">
              Enter Your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              className="w-full rounded-xl border border-[#f2e4ea] px-3 py-2 text-sm text-[#2E294E] outline-none transition focus:border-[#2E294E]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#2E294E] py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Update
        </button>
      </form>
    </div>
  </div>
)
}

export default Profile
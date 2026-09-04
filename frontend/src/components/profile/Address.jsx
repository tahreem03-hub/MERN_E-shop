import React, { useState, useEffect } from 'react'
import { Trash2, Plus, MapPin, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { addUserAddress, deleteUserAddress } from '../../redux/actions/user'

const Address = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)
  const addresses = user?.addresses || []

  const [open, setOpen] = useState(false)

  // Form states
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [addressType, setAddressType] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const resetForm = () => {
    setCountry(''); setCity(''); setAddress1('')
    setAddress2(''); setZipCode(''); setAddressType('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!country || !city || !address1 || !zipCode || !addressType) {
      toast.error('Please fill all fields')
      return
    }
    setSubmitting(true)
    const res = await dispatch(addUserAddress({
      country, city, address1, address2, zipCode, addressType,
    }))
    setSubmitting(false)

    if (res.ok) {
      toast.success('Address added successfully')
      setOpen(false)
      resetForm()
    } else {
      toast.error(res.error)
    }
  }

  const handleDelete = async (addressId) => {
    if (!addressId) return
    if (!window.confirm('Are you sure you want to delete this address?')) return

    setDeletingId(addressId)
    const res = await dispatch(deleteUserAddress(addressId))
    setDeletingId(null)

    res.ok
      ? toast.success('Address deleted successfully')
      : toast.error(res.error)
  }
  return (
    <div className="rounded-2xl border border-[#f2e4ea] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#2E294E]">Saved Addresses</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {addresses.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No saved addresses yet</p>
        ) : (
          addresses.map((addr, index) => (
            <div
              key={addr._id || index}
              className="flex items-center justify-between rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 py-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#2E294E]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-[#2E294E] capitalize">{addr.addressType}</p>
                  <p className="text-sm text-[#6b6480]">{addr.address1}, {addr.address2 || ''}</p>
                  <p className="text-xs text-[#6b6480]">{addr.city}, {addr.country} - {addr.zipCode}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(addr._id)}
                disabled={deletingId === addr._id}
                aria-label="Delete address"
                className="text-[#6b6480] transition hover:text-[#B5316B] disabled:opacity-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Address Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-bold text-[#2E294E] mb-4">Add New Address</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>

              {/* Address 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="Street, house number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>

              {/* Address 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="Apartment, suite, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter zip code"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Type</label>
                <select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                  <option value="other">Default</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Address'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Address
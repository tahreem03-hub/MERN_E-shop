import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCoupons, createCoupon, deleteCoupon } from '../../redux/actions/coupon'
import toast from 'react-hot-toast'
import { X, Trash2, Loader2, TicketX } from 'lucide-react'

const AllCoupons = () => {
  const { seller } = useSelector((state) => state.seller)
  const { coupons, isLoading, success, error } = useSelector((state) => state.coupon)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [value, setValue] = useState(null)
  const [minAmount, setMinAmount] = useState(null)
  const [maxAmount, setMaxAmount] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState('')

  const { products } = useSelector((state) => state.product)

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllCoupons(seller._id))
    }
  }, [dispatch, seller?._id])

  useEffect(() => {
    if (error) toast.error(error)
    if (success) {
      toast.success('Coupon code created successfully!')
      setOpen(false)
      window.location.reload()
    }
  }, [error, success])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createCoupon({
        name,
        value,
        minAmount,
        maxAmount,
        selectedProduct,
        shop: seller,
      })
    )
  }

  const handleDelete = (id) => {
    dispatch(deleteCoupon(id))
    window.location.reload()
  }

  return (
    <div className='w-full mx-8 pt-1 mt-10 bg-white'>
      <div className='flex justify-end mb-3'>
        <button
          onClick={() => setOpen(true)}
          className='max-w-max h-[45px] px-3 rounded-[5px] bg-[#B5316B] text-white font-[600]'
        >
          Create Coupon Code
        </button>
      </div>

      {isLoading ? (
        <div className='flex flex-col items-center justify-center py-24 text-[#2E294E]/50'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <p className='mt-3 text-sm'>Loading coupons…</p>
        </div>
      ) : !coupons || coupons.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <TicketX className='h-8 w-8 text-[#2E294E]/30' />
          <p className='mt-3 text-sm font-medium text-[#2E294E]'>No coupon codes yet</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[#f2e4ea] text-xs uppercase tracking-wide text-[#2E294E]/60'>
                <th className='py-3 px-2'>Name</th>
                <th className='py-3 px-2'>Discount %</th>
                <th className='py-3 px-2'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className='border-b border-[#f2e4ea] text-sm text-[#2E294E]'>
                  <td className='py-3 px-2'>{coupon.name}</td>
                  <td className='py-3 px-2'>{coupon.value}%</td>
                  <td className='py-3 px-2'>
                    <button onClick={() => handleDelete(coupon._id)}>
                      <Trash2 className='h-4 w-4 text-[#2E294E]/60 hover:text-[#B5316B]' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className='fixed top-0 left-0 w-full h-screen bg-black/60 z-[2000] flex items-center justify-center'>
          <div className='w-[90%] md:w-[50%] h-[80vh] bg-white rounded-[4px] shadow-sm relative overflow-y-scroll p-4'>
            <button onClick={() => setOpen(false)} className='absolute top-3 right-3 cursor-pointer'>
              <X size={30} className='text-[#2E294E]' />
            </button>

            <h5 className='text-[30px] font-Poppins text-center text-[#2E294E]'>Create Coupon Code</h5>
            <form onSubmit={handleSubmit}>
              <br />
              <div>
                <label className='pb-2'>
                  Name <span className='text-[#B5316B]'>*</span>
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder='Enter your coupon code name'
                  className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
                />
              </div>

              <br />
              <div>
                <label className='pb-2'>
                  Discount Percentage <span className='text-[#B5316B]'>*</span>
                </label>
                <input
                  type='number'
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  placeholder='Enter discount percentage'
                  className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
                />
              </div>

              <br />
              <div>
                <label className='pb-2'>Minimum Amount</label>
                <input
                  type='number'
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder='Enter minimum order amount'
                  className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
                />
              </div>

              <br />
              <div>
                <label className='pb-2'>Maximum Amount</label>
                <input
                  type='number'
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder='Enter maximum order amount'
                  className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
                />
              </div>

              <br />
              <div>
                <label className='pb-2'>Selected Product</label>
                <select
                  className='w-full mt-2 border h-[35px] rounded-[5px] border-[#f2e4ea]'
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value=''>Choose a selected product</option>
                  {products?.map((p) => (
                    <option value={p._id} key={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <br />
              <input
                type='submit'
                value='Create'
                className='w-full h-[42px] rounded-[5px] bg-[#B5316B] text-white font-[600] cursor-pointer'
              />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllCoupons
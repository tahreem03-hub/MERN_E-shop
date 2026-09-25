import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillBagFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getAllOrdersOfUser } from '../../redux/actions/order'

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [rating, setRating] = useState(1)

  useEffect(() => {
    if (user?._id) dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user?._id])

  const data = orders && orders.find((item) => item._id === id)

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${import.meta.env.VITE_URL}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message)
        dispatch(getAllOrdersOfUser(user._id))
        setComment('')
        setRating(null)
        setOpen(false)
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message)
      })
  }

  const refundHandler = async () => {
    await axios
      .put(`${import.meta.env.VITE_URL}/order/order-refund/${id}`, {
        status: 'Processing refund',
      })
      .then((res) => {
        toast.success(res.data.message)
        dispatch(getAllOrdersOfUser(user._id))
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message)
      })
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2">
        <BsFillBagFill size={28} className="text-[#B5316B]" />
        <h1 className="text-2xl font-bold text-[#2E294E]">Order Details</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-6 text-sm text-[#6b6480]">
        <h5>
          Order ID: <span className="font-semibold text-[#2E294E]">#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5>
          Placed on:{' '}
          <span className="font-semibold text-[#2E294E]">
            {data?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>

      {/* Order items */}
      <div className="mt-8 space-y-4">
        {data &&
          data?.cart?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-[#f2e4ea] bg-white p-4"
            >
              <img
                src={`${import.meta.env.VITE_URL}/uploads/${item.images?.[0]}`}
                alt={item.name}
                className="w-20 h-20 object-contain rounded-xl bg-[#f1e8ec]"
              />
              <div className="flex-1">
                <h5 className="text-base font-semibold text-[#2E294E]">
                  {item.name}
                </h5>
                <h5 className="text-sm text-[#6b6480] mt-1">
                  ${item.discountPrice} × {item.quantity}
                </h5>
              </div>
              {!item.isReviewed && data?.status === 'Delivered' && (
                <button
                  onClick={() => {
                    setOpen(true)
                    setSelectedItem(item)
                  }}
                  className="rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Write a review
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Review popup */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 relative">
            <RxCross1
              size={26}
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute top-4 right-4 text-[#2E294E]"
            />

            <h2 className="text-xl font-bold text-[#2E294E] text-center">
              Give a Review
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_URL}/uploads/${selectedItem?.images?.[0]}`}
                alt=""
                className="w-16 h-16 object-contain rounded-lg bg-[#f1e8ec]"
              />
              <div>
                <div className="text-sm font-semibold text-[#2E294E]">
                  {selectedItem?.name}
                </div>
                <h4 className="text-sm text-[#6b6480]">
                  ${selectedItem?.discountPrice} × {selectedItem?.quantity}
                </h4>
              </div>
            </div>

            <h5 className="mt-6 text-sm font-semibold text-[#2E294E]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={24}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={24}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-[#2E294E]">
                Write a comment
                <span className="ml-1 text-xs text-[#6b6480]">(optional)</span>
              </label>
              <textarea
                cols="20"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product?"
                className="mt-2 w-full rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] p-3 text-sm outline-none focus:border-[#B5316B]"
              />
            </div>

            <button
              onClick={rating > 1 ? reviewHandler : null}
              className="mt-4 w-full h-11 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="border-t border-[#f2e4ea] mt-6 w-full text-right">
        <h5 className="pt-3 text-base text-[#2E294E]">
          Total Price: <strong>${data?.totalPrice}</strong>
        </h5>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        {/* Shipping */}
        <div className="w-full lg:w-[60%]">
          <h4 className="text-base font-semibold text-[#2E294E]">
            Shipping Address:
          </h4>
          <div className="mt-3 rounded-2xl border border-[#f2e4ea] bg-white p-4 text-sm text-[#6b6480] space-y-1">
            <p>
              {data?.shippingAddress?.address1} {data?.shippingAddress?.address2}
            </p>
            <p>{data?.shippingAddress?.country}</p>
            <p>{data?.shippingAddress?.city}</p>
            <p>{data?.user?.phoneNumber}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="w-full lg:w-[40%]">
          <h4 className="text-base font-semibold text-[#2E294E]">Payment Info:</h4>
          <div className="mt-3 rounded-2xl border border-[#f2e4ea] bg-white p-4 text-sm text-[#6b6480] space-y-3">
            <p>
              Status:{' '}
              <span className="font-semibold text-[#2E294E]">
                {data?.paymentInfo?.status ? data.paymentInfo.status : 'Not Paid'}
              </span>
            </p>

            {data?.status === 'Delivered' && (
              <button
                onClick={refundHandler}
                className="w-full h-11 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90"
              >
                Give a Refund
              </button>
            )}
          </div>
        </div>
      </div>

      <Link to="/profile">
        <button className="mt-6 w-full lg:w-[200px] h-11 rounded-xl border border-[#2E294E] text-[#2E294E] font-semibold hover:bg-[#2E294E] hover:text-white transition">
          Send Message
        </button>
      </Link>
    </div>
  )
}

export default UserOrderDetails
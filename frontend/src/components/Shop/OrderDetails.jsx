import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getAllOrdersOfShop } from "../../redux/actions/order";

const ORDER_STATUSES = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
];

const REFUND_STATUSES = ["Processing refund", "Refund Success"];

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (seller?._id) dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller?._id]);

  const data = orders && orders.find((item) => item._id === id);

  const isRefund = ["Processing refund", "Refund Success"].includes(
    data?.status
  );

  const orderUpdateHandler = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_URL}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order updated!");
        navigate("/dashboard/orders");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_URL}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const currentStatuses = isRefund ? REFUND_STATUSES : ORDER_STATUSES;
  const startIndex = currentStatuses.indexOf(data?.status);
  const availableStatuses =
    startIndex >= 0 ? currentStatuses.slice(startIndex) : currentStatuses;

  return (
    <div className="w-full px-4 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BsFillBagFill size={26} className="text-[#B5316B]" />
          <h1 className="text-2xl font-bold text-[#2E294E]">Order Details</h1>
        </div>
        <Link to="/dashboard/orders">
          <button className="rounded-xl border border-[#B5316B] text-[#B5316B] px-4 py-2 text-sm font-semibold hover:bg-[#B5316B] hover:text-white transition">
            Order List
          </button>
        </Link>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center justify-between pt-6 text-sm text-[#6b6480]">
        <h5>
          Order ID:{" "}
          <span className="font-semibold text-[#2E294E]">
            #{data?._id?.slice(0, 8)}
          </span>
        </h5>
        <h5>
          Placed on:{" "}
          <span className="font-semibold text-[#2E294E]">
            {data?.createdAt?.slice(0, 10)}
          </span>
        </h5>
      </div>

      {/* Items */}
      <div className="mt-8 space-y-4">
        {data?.cart?.map((item, index) => (
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
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-[#f2e4ea] pt-4 text-right">
        <h5 className="text-base text-[#2E294E]">
          Total Price: <strong>${data?.totalPrice}</strong>
        </h5>
      </div>

      {/* Shipping + Payment */}
      <div className="mt-8 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[60%]">
          <h4 className="text-base font-semibold text-[#2E294E]">
            Shipping Address
          </h4>
          <div className="mt-3 rounded-2xl border border-[#f2e4ea] bg-white p-4 text-sm text-[#6b6480] space-y-1">
            <p>
              {data?.shippingAddress?.address1}{" "}
              {data?.shippingAddress?.address2}
            </p>
            <p>{data?.shippingAddress?.country}</p>
            <p>{data?.shippingAddress?.city}</p>
            <p>{data?.user?.phoneNumber}</p>
          </div>
        </div>

        <div className="w-full lg:w-[40%]">
          <h4 className="text-base font-semibold text-[#2E294E]">
            Payment Info
          </h4>
          <div className="mt-3 rounded-2xl border border-[#f2e4ea] bg-white p-4 text-sm text-[#6b6480]">
            Status:{" "}
            <span className="font-semibold text-[#2E294E]">
              {data?.paymentInfo?.status || "Not Paid"}
            </span>
          </div>
        </div>
      </div>

      {/* Status Update */}
      <h4 className="mt-8 text-base font-semibold text-[#2E294E]">
        Order Status
      </h4>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-3 w-full max-w-[240px] h-11 rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 text-sm text-[#2E294E] outline-none focus:border-[#B5316B]"
      >
        <option value="">Select status</option>
        {availableStatuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={isRefund ? refundOrderUpdateHandler : orderUpdateHandler}
        className="mt-5 w-full max-w-[240px] h-11 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90 transition"
      >
        Update Status
      </button>
    </div>
  );
};

export default OrderDetails;
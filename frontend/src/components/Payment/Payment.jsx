import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(data);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };

    order.paymentInfo = { type: "Cash On Delivery" };

    await axios
      .post(`${import.meta.env.VITE_URL}/order/create-order`, order, config)
      .then(() => {
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[65%]">
          <PaymentInfo cashOnDeliveryHandler={cashOnDeliveryHandler} />
        </div>
        <div className="w-full lg:w-[35%]">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

/* ---------------- Payment Info ---------------- */
const PaymentInfo = ({ cashOnDeliveryHandler }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#f2e4ea] p-6 shadow-sm">
      <h4 className="text-base font-semibold text-[#2E294E] mb-4">
        Cash on Delivery
      </h4>

      <form className="w-full" onSubmit={cashOnDeliveryHandler}>
        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-[#2E294E] text-white font-semibold transition hover:opacity-90"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

/* ---------------- Cart Summary ---------------- */
const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);

  return (
    <div className="w-full bg-white rounded-2xl border border-[#f2e4ea] p-6 shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-sm text-[#6b6480]">Subtotal:</h3>
        <h5 className="text-base font-semibold text-[#2E294E]">
          ${orderData?.subTotalPrice}
        </h5>
      </div>

      <div className="flex justify-between mt-3">
        <h3 className="text-sm text-[#6b6480]">Shipping:</h3>
        <h5 className="text-base font-semibold text-[#2E294E]">${shipping}</h5>
      </div>

      <div className="flex justify-between mt-3 border-b border-[#f2e4ea] pb-3">
        <h3 className="text-sm text-[#6b6480]">Discount:</h3>
        <h5 className="text-base font-semibold text-[#B5316B]">
          {orderData?.discountPrice ? `- $${orderData.discountPrice}` : "- $0"}
        </h5>
      </div>

      <h5 className="text-lg font-bold text-[#2E294E] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
    </div>
  );
};

export default Payment;
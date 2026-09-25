import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = { address1, address2, zipCode, country, city };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios
      .get(`${import.meta.env.VITE_URL}/coupon/get-coupon-value/${name}`)
      .then((res) => {
        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value;


        if (res.data.couponCode !== null) {
          const isCouponValid =
            cart && cart.filter((item) => item.shopId === shopId);

          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.quantity * item.discountPrice,
              0
            );
            const discountPrice = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
          }
        }

        if (res.data.couponCode === null) {
          toast.error("Coupon code doesn't exist!");
          setCouponCode("");
        }
      });
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center py-10">
      <div className="w-[90%] lg:w-[70%] flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>

        <div className="w-full lg:w-[35%]">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>

      <button
        onClick={paymentSubmit}
        className="mt-10 w-[200px] lg:w-[280px] h-12 rounded-xl bg-[#2E294E] text-white font-semibold transition hover:opacity-90"
      >
        Go to Payment
      </button>
    </div>
  );
};

/* ---------------- Shipping Info ---------------- */
const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const inputClass =
    "w-full h-11 rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 text-sm text-[#2E294E] placeholder:text-[#2E294E]/50 outline-none focus:border-[#B5316B]";
  const labelClass = "block pb-2 text-sm font-medium text-[#2E294E]";

  return (
    <div className="w-full bg-white rounded-2xl border border-[#f2e4ea] p-6 shadow-sm">
      <h5 className="text-lg font-bold text-[#2E294E]">Shipping Address</h5>

      <form className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Full Name</label>
            <input type="text" value={user?.name || ""} readOnly className={inputClass} />
          </div>
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Email Address</label>
            <input type="email" value={user?.email || ""} readOnly className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Phone Number</label>
            <input type="text" value={user?.phoneNumber || ""} readOnly className={inputClass} />
          </div>
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Zip Code</label>
            <input
              type="text"
              value={zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            >
              <option value="">Choose your country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            >
              <option value="">Choose your City</option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Address 1</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className={labelClass}>Address 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>
      </form>

      <h5
        className="mt-4 text-sm font-semibold text-[#B5316B] cursor-pointer inline-block hover:underline"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </h5>

      {userInfo && (
        <div className="mt-2 space-y-1">
          {user?.addresses?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#B5316B]"
                value={item.addressType}
                onChange={() => {
                  setAddress1(item.address1);
                  setAddress2(item.address2);
                  setZipCode(item.zipCode);
                  setCountry(item.country);
                  setCity(item.city);
                }}
              />
              <h2 className="text-sm text-[#2E294E] capitalize">
                {item.addressType}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- Cart / Summary ---------------- */
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#f2e4ea] p-6 shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-sm text-[#6b6480]">Subtotal:</h3>
        <h5 className="text-base font-semibold text-[#2E294E]">${subTotalPrice}</h5>
      </div>

      <div className="flex justify-between mt-3">
        <h3 className="text-sm text-[#6b6480]">Shipping:</h3>
        <h5 className="text-base font-semibold text-[#2E294E]">${shipping.toFixed(2)}</h5>
      </div>

      <div className="flex justify-between mt-3 border-b border-[#f2e4ea] pb-3">
        <h3 className="text-sm text-[#6b6480]">Discount:</h3>
        <h5 className="text-base font-semibold text-[#B5316B]">
          {discountPercentenge ? `- $${discountPercentenge}` : "- $0"}
        </h5>
      </div>

      <h5 className="text-lg font-bold text-[#2E294E] text-end pt-3">
        ${totalPrice}
      </h5>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          className="w-full h-11 rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 text-sm text-[#2E294E] placeholder:text-[#2E294E]/50 outline-none focus:border-[#B5316B]"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full h-11 mt-4 rounded-xl border border-[#B5316B] text-[#B5316B] font-semibold text-sm transition hover:bg-[#B5316B] hover:text-white"
        >
          Apply code
        </button>
      </form>
    </div>
  );
};

export default Checkout;
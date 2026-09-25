import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { loadSeller } from "../../redux/actions/user";

const inputClass =
  "w-full h-11 rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 text-sm text-[#2E294E] outline-none focus:border-[#B5316B]";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(seller?.zipCode || "");

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${import.meta.env.VITE_URL}/shop/update-shop-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(() => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || error.message);
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${import.meta.env.VITE_URL}/shop/update-seller-info`,
        { name, address, zipCode, phoneNumber, description },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Shop info updated successfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="w-full p-4 lg:p-8 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                avatar ||
                `${import.meta.env.VITE_URL}/uploads/${seller?.avatar}`
              }
              alt="Shop"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#B5316B]"
            />
            <div className="w-9 h-9 bg-[#f1e8ec] rounded-full flex items-center justify-center cursor-pointer absolute bottom-1 right-2 border border-[#f2e4ea]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image" className="cursor-pointer">
                <AiOutlineCamera className="text-[#2E294E]" />
              </label>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={updateHandler}>
          <div>
            <label className="block pb-2 text-sm font-medium text-[#2E294E]">
              Shop Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block pb-2 text-sm font-medium text-[#2E294E]">
              Shop Description
            </label>
            <input
              type="text"
              placeholder={
                seller?.description || "Enter your shop description"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block pb-2 text-sm font-medium text-[#2E294E]">
              Shop Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block pb-2 text-sm font-medium text-[#2E294E]">
              Shop Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block pb-2 text-sm font-medium text-[#2E294E]">
              Shop Zip Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90 transition"
          >
            Update Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
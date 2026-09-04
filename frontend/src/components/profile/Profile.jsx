import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, updateAvatar, loadUser } from "../../redux/actions/user";
import { toast } from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error, success, loading } = useSelector((state) => state.user);
  
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (success) {
      toast.success("Profile updated successfully");
      dispatch({ type: "clearMessages" });
      dispatch(loadUser());
    }
  }, [error, success, dispatch]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password) {
      toast.error("Please enter your password to confirm changes");
      return;
    }
    
    const data = { name, email, phoneNumber, password };
    dispatch(updateUserInfo(data));
  };
  
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setAvatar(URL.createObjectURL(file));
    
    const formData = new FormData();
    formData.append("image", file);
    
    dispatch(updateAvatar(formData));
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={avatar || `${import.meta.env.VITE_URL}/uploads/${user?.avatar}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-0 bg-pink-600 rounded-full p-2 cursor-pointer hover:bg-pink-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </label>
          <input
            type="file"
            id="avatar"
            onChange={handleImage}
            className="hidden"
            accept="image/*"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Click camera icon to change photo</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your current password to update profile"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Required to confirm identity before updating
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
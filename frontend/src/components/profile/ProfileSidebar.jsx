import {
  Lock,
  LogOut,
  MapPinHouse,
  MessageSquareMore,
  Package,
  Truck,
  Undo2,
  User,
  CreditCard,
} from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfileSidebar = () => {
  const navItems = [
    { icon: User, title: "Profile", path: "/profile" },
    { icon: Package, title: "Orders", path: "/profile/orders" },
    { icon: Undo2, title: "Refunds", path: "/profile/refunds" },
    { icon: MessageSquareMore, title: "Inbox", path: "/profile/inbox" },
    { icon: Truck, title: "Track Order", path: "/profile/track-order" },
    { icon: MapPinHouse, title: "Address", path: "/profile/address" },
    { icon: CreditCard, title: "Payment Methods", path: "/profile/payment-methods" },
    { icon: Lock, title: "Change Password", path: "/profile/change-password" },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_URL}/user/logout`, {
        withCredentials: true,
      })
      toast.success(data.message);
      navigate("/login");
      window.location.reload(true);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <nav className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
        {navItems.map(({ icon: Icon, title, path }) => (
          <NavLink
            to={path}
            key={title}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200
              ${isActive
                ? "bg-[#f1e8ec] font-medium text-[#2E294E]"
                : "text-[#2E294E] hover:bg-[#f1e8ec]"
              }`
            }
          >
            <Icon size={20} />
            <span>{title}</span>
          </NavLink>
        ))}

        <div className="my-1 hidden border-t border-[#f2e4ea] md:block" />

        <button
          onClick={handleLogout}
          className="flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left
                     text-[#2E294E] transition-all duration-200 hover:bg-[#f1e8ec]"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default ProfileSidebar;
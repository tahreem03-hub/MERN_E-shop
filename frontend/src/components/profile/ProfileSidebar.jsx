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
import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
    const navItems = [
        { icon: User, title: "Profile", path: "/profile" },
        { icon: Package, title: "Orders", path: "/profile/orders" },
        { icon: Undo2, title: "Refunds", path: "/profile/refunds" },
        { icon: MessageSquareMore, title: "Inbox", path: "/profile/inbox" },
        { icon: Truck, title: "Track Order", path: "/profile/track-order" },
        { icon: MapPinHouse, title: "Address", path: "/profile/address" },
        {
            icon: CreditCard,
            title: "Payment Methods",
            path: "/profile/payment-methods",
        },
        {
            icon: Lock,
            title: "Change Password",
            path: "/profile/change-password",
        },
    ];

    const handleLogout = () => {
        // Logout API will be added later
    };

    return (
        <aside className="w-full lg:w-64">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {navItems.map(({ icon: Icon, title, path }) => (
                    <NavLink
                        to={path}
                        key={title}
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-3 px-4 py-3 rounded-lg
              transition-all duration-200
              ${isActive
                                ? "bg-[#f1e8ec] text-[#2E294E] font-medium"
                                : "text-[#2E294E] hover:bg-[#f1e8ec]"
                            }`
                        }
                    >
                        <Icon size={20} />
                        <span>{title}</span>
                    </NavLink>
                ))}

                <button
                    onClick={handleLogout}
                    className="flex shrink-0 items-center gap-3 px-4 py-3 rounded-lg
                     text-[#2E294E] hover:bg-[#f1e8ec]
                     transition-all duration-200 text-left"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default ProfileSidebar;


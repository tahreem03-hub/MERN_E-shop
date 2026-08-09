import {
    Lock,
    LogOut,
    MapPinHouse,
    MessageSquareMore,
    Package,
    Truck,
    Undo2,
    User,
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
        { icon: Lock, title: "Change Password", path: "/profile/change-password" },
        { icon: LogOut, title: "Logout", path:"/profile/logout"},
    ];

    return (
        <div className="w-64">
            <div className="flex flex-col gap-2">
                {navItems.map(({ icon: Icon, title, path }) => (
                    <NavLink
                        to={path}
                        key={title}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        <Icon size={20} />
                        <span>{title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default ProfileSidebar;


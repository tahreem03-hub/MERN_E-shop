import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderPlus,
  CalendarDays,
  CalendarPlus,
  Wallet,
  MessageCircleCheck,
  Gift,
  Undo2,
  Settings,
} from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/shop/dashboard' },
  { label: 'All Orders', icon: Package, to: '/dashboard/orders' },
  { label: 'All Products', icon: ShoppingBag, to: '/dashboard/products' },
  { label: 'Create Product', icon: FolderPlus, to: '/dashboard/create-product' },
  { label: 'All Events', icon: CalendarDays, to: '/dashboard/events' },
  { label: 'Create Event', icon: CalendarPlus, to: '/dashboard/create-event' },
  { label: 'Withdraw Money', icon: Wallet, to: '/dashboard/withdraw-money' },
  { label: 'Shop Inbox', icon: MessageCircleCheck, to: '/dashboard/messages' },
  { label: 'Discount Codes', icon: Gift, to: '/dashboard/coupons' },
  { label: 'Order Refunds', icon: Undo2, to: '/dashboard/refunds' },
  { label: 'Settings', icon: Settings, to: '/dashboard/settings' },
]

const DashboardSidebar = () => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10 border-r border-[#f2e4ea]">
      {navItems.map(({ label, icon: Icon, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/dashboard'}
          className={({ isActive }) =>
            `w-full flex items-center py-3 px-4 gap-3 transition-colors duration-150 ${
              isActive ? 'bg-[#f1e8ec]' : 'hover:bg-[#f1e8ec]/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={1.7}
                className={isActive ? 'text-[#B5316B]' : 'text-[#2E294E]'}
              />
              <span
                className={`hidden md:inline text-[15px] ${
                  isActive ? 'text-[#B5316B] font-medium' : 'text-[#2E294E] font-normal'
                }`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}

export default DashboardSidebar
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  FileText,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/tenant-management", label: "Tenant Management", icon: Users },
    { path: "/admin/payment-tracking", label: "Payment Tracking", icon: CreditCard },
    { path: "/admin/room-occupancy", label: "Room Occupancy", icon: Building2 },
    { path: "/admin/reports-analytics", label: "Reports & Export", icon: FileText },
    { path: "/admin/settings", label: "Settings", icon: Settings }
  ];

  const getNavClasses = ({ isActive }) => {
    const baseClasses =
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium";
    return isActive
      ? `${baseClasses} bg-blue-600 text-white shadow-md`
      : `${baseClasses} text-gray-400 hover:text-white hover:bg-blue-500/30`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#0F172A] text-white w-64 flex flex-col shadow-lg z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="p-5 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold">DataHub Pro</h2>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-gray-700 rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-5 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={getNavClasses}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-5 border-t border-gray-700">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-300 hover:bg-red-600/30 hover:text-white rounded-lg transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 bg-white h-16 shadow-sm border-b border-gray-200 z-30 flex items-center px-5 justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-5">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tenants, rooms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Notification + Profile */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded-lg">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Property Admin</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-20 px-5">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

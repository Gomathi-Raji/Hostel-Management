import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  Search,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminLayout = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock pending tickets count - in real app, this would come from API/state
  const pendingTicketsCount = 3;

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/tenant-management", label: "Tenant Management", icon: Users },
    { path: "/admin/payment-tracking", label: "Payment Tracking", icon: CreditCard },
    { path: "/admin/payment-ticketing", label: "Payment Ticketing", icon: FileText },
    { 
      path: "/admin/tickets", 
      label: "Tickets", 
      icon: AlertTriangle, 
      badge: pendingTicketsCount > 0 ? pendingTicketsCount : null 
    },
    { path: "/admin/room-occupancy", label: "Room Occupancy", icon: Building2 },
    { path: "/admin/reports-analytics", label: "Reports & Analytics", icon: FileText },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Fixed Sidebar - Full Height, Never Scrolls */}
      <div
        className={`
          fixed lg:static 
          inset-y-0 left-0
          w-64 
          bg-white 
          border-r border-gray-200 
          shadow-sm 
          transform transition-transform duration-300 
          z-50 lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section - Fixed */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation - Fixed, No Scrolling */}
          <nav className="flex-1 p-4 bg-white">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {/* Badge for pending count */}
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User Info & Logout - Fixed at Bottom */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Logged in as</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area with Top Navigation */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Navigation Bar - Always Visible Across All Admin Pages */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Side - Brand & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>
                
                {/* Brand */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DH</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">DataHub Pro</h1>
                    <p className="text-xs text-gray-500">Data Management</p>
                  </div>
                </div>
              </div>

              {/* Center - Search */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="w-full relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search tenants, rooms..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
                  />
                </div>
              </div>

              {/* Right Side - Notifications & Profile */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="h-6 w-6" />
                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">Property Admin</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tenants, rooms..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area - Only This Scrolls */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
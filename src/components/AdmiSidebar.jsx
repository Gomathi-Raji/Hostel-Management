import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  Search,
  Bell,
  User
} from "lucide-react";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/tenant-management", label: "Tenant Management", icon: Users },
    { path: "/admin/payment-tracking", label: "Payment Tracking", icon: CreditCard },
    { path: "/admin/room-occupancy", label: "Room Occupancy", icon: Building2 },
    { path: "/admin/reports-analytics", label: "Reports & Export", icon: FileText },
    { path: "/admin/settings", label: "Settings", icon: Settings }
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const getNavClasses = ({ isActive }) => {
    const baseClasses = "flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-300 font-medium group";
    return isActive 
      ? `${baseClasses} bg-admin-sidebar-active-bg text-admin-sidebar-active-text font-semibold shadow-sm` 
      : `${baseClasses} text-admin-sidebar-text hover:text-admin-sidebar-active-text hover:bg-admin-sidebar-active-bg/30`;
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-admin-header-bg border-b border-admin-border z-30 lg:left-64">
        <div className="flex items-center justify-between h-full px-6">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-admin-description-text hover:bg-admin-bg transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Project Title - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:flex items-center">
            <h1 className="text-xl font-bold text-admin-header-text">DataHub Pro</h1>
          </div>

          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-description-text h-4 w-4" />
              <input
                type="text"
                placeholder="Search tenants, rooms..."
                className="w-full pl-10 pr-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary bg-admin-card text-admin-header-text text-sm"
              />
            </div>
          </div>

          {/* User Avatar and Notifications */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-admin-description-text hover:text-admin-header-text transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-admin-danger rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-admin-primary text-admin-primary-foreground rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-admin-header-text">Property Admin</p>
                <p className="text-xs text-admin-description-text">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-admin-sidebar-bg z-40 transition-all duration-300 lg:relative lg:translate-x-0 w-64 border-r border-admin-border ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-admin-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-admin-primary rounded-lg flex items-center justify-center shadow-sm">
                  <LayoutDashboard className="h-5 w-5 text-admin-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-admin-sidebar-text">DataHub Pro</h2>
                  <p className="text-xs text-admin-description-text font-medium">Data Management</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-md hover:bg-admin-sidebar-active-bg transition-colors lg:hidden"
              >
                <X className="h-5 w-5 text-admin-description-text" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-3">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={getNavClasses}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0 transition-all duration-200 group-hover:text-admin-sidebar-icon" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-admin-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-admin-sidebar-active-bg/30 rounded-lg transition-all duration-300 text-admin-danger hover:text-admin-danger group"
            >
              <LogOut className="h-5 w-5 transition-transform duration-200" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Content spacer */}
      <div className="hidden lg:block w-64" />
    </>
  );
};

export default AdminSidebar;
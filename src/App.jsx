import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Tickets from "./pages/Tickets";
import RaiseTicket from "./pages/RaiseTicket";
import VacatingForm from "./pages/VacatingForm";
import NotFound from "./pages/NotFound";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/TempDashboard"; 
import TenantManagement from "./pages/admin/TenantManagement";
import PaymentTracking from "./pages/admin/PaymentTracking";

import PaymentTicketDetail from "./pages/admin/PaymentTicketDetail";
import AddNewTicket from "./pages/admin/AddNewTicket";
import ReportsAnalytics from "./pages/admin/TempReportsAnalytics";
import RoomOccupancy from "./pages/admin/RoomOccupancy";
import Settings from "./pages/admin/Settings";
import AdminTickets from "./pages/admin/AdminTickets"; // NEW: Admin Tickets Page

import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  // No persistent authentication - always start fresh
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  // Clear any existing auth data and start fresh
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Always clear authentication data on app start
        console.log("🔄 Clearing previous session data...");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userType");
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        
        // Always start with fresh state
        setIsAuthenticated(false);
        setUserType("user");
        
        console.log("✅ App initialized - User must login");
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Don't persist auth state - keep it session-only
  const handleSetIsAuthenticated = (value) => {
    console.log("🔑 Setting authentication to:", value);
    setIsAuthenticated(value);
    
    // No persistence at all - user has to login every time
  };

  // Set user type without persistence
  const handleSetUserType = (type) => {
    console.log("🔄 Setting user type to:", type);
    setUserType(type);
    
    // No persistence - user type is only kept in memory
    // This ensures fresh login selection every time
  };

  // Logout function
  const handleLogout = () => {
    console.log("🚪 Logging out user");
    setIsAuthenticated(false);
    setUserType("user"); // Reset to default
    localStorage.clear();
    sessionStorage.clear();
  };

  // DEBUG: Show current state values
  console.log("🔍 Current App State:", { 
    isAuthenticated, 
    userType, 
    isLoading,
    currentPath: window.location.pathname 
  });

  // Show loading spinner while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* LOGIN - Always show if not authenticated */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login
                  setIsAuthenticated={handleSetIsAuthenticated}
                  setUserType={handleSetUserType}
                />
              ) : (
                // Redirect based on userType after login
                <Navigate to={userType === "admin" ? "/admin/dashboard" : "/dashboard"} replace />
              )
            }
          />

          {/* FORGOT PASSWORD */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register />
              ) : (
                <Navigate to={userType === "admin" ? "/admin/dashboard" : "/dashboard"} replace />
              )
            }
          />

          {/* USER DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                userType === "admin" ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <UserLayout onLogout={handleLogout}>
                    <Dashboard userType={userType} />
                  </UserLayout>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* USER ROUTES */}
          <Route
            path="/invoices"
            element={
              isAuthenticated && userType === "user" ? (
                <UserLayout onLogout={handleLogout}>
                  <Invoices />
                </UserLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/tickets"
            element={
              isAuthenticated && userType === "user" ? (
                <UserLayout onLogout={handleLogout}>
                  <Tickets />
                </UserLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/raise-ticket"
            element={
              isAuthenticated && userType === "user" ? (
                <UserLayout onLogout={handleLogout}>
                  <RaiseTicket />
                </UserLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/vacating-form"
            element={
              isAuthenticated && userType === "user" ? (
                <UserLayout onLogout={handleLogout}>
                  <VacatingForm />
                </UserLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tenant-management" element={<TenantManagement />} />
            <Route path="payment-tracking" element={<PaymentTracking />} />

            <Route
              path="payment-ticket-detail/:ticketId"
              element={<PaymentTicketDetail />}
            />
            <Route path="add-new-ticket" element={<AddNewTicket />} />
            {/* NEW: Admin Tickets Route */}
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="room-occupancy" element={<RoomOccupancy />} />
            <Route path="reports-analytics" element={<ReportsAnalytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* DEFAULT ROUTE - Always redirect to login if not authenticated */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to={userType === "admin" ? "/admin/dashboard" : "/dashboard"} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
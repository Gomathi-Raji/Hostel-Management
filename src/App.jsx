import React, { useState } from "react";
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
import AdminDashboard from "./pages/admin/TempDashboard";
import TenantManagement from "./pages/admin/TenantManagement";
import PaymentTracking from "./pages/admin/PaymentTracking";
import PaymentTicketing from "./pages/admin/PaymentTicketing";
import PaymentTicketDetail from "./pages/admin/PaymentTicketDetail";
import AddNewTicket from "./pages/admin/AddNewTicket";
import ReportsAnalytics from "./pages/admin/TempReportsAnalytics";
import RoomOccupancy from "./pages/admin/RoomOccupancy";
import Settings from "./pages/admin/Settings";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("user");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* LOGIN ROUTE */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUserType={setUserType}
                />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* REGISTER ROUTE */}
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register />
              ) : (
                <Navigate to="/dashboard" replace />
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
                  <UserLayout>
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
              isAuthenticated ? (
                <UserLayout>
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
              isAuthenticated ? (
                <UserLayout>
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
              isAuthenticated ? (
                <UserLayout>
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
              isAuthenticated ? (
                <UserLayout>
                  <VacatingForm />
                </UserLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/tenant-management"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <TenantManagement />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/payment-tracking"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <PaymentTracking />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/payment-ticketing"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <PaymentTicketing />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/payment-ticket-detail/:ticketId"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <PaymentTicketDetail />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/add-new-ticket"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <AddNewTicket />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/room-occupancy"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <RoomOccupancy />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/reports-analytics"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <ReportsAnalytics />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/settings"
            element={
              isAuthenticated && userType === "admin" ? (
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* DEFAULT ROUTE */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from "react";
import {
  Plus,
  Send,
  Download,
  FileText,
  Settings,
  CheckCircle,
  Search,
  Database,
  Server,
  Wifi,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Home,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // ✅ Mock stats data
  const stats = {
    totalTenants: 0,
    monthlyRevenue: 0,
    occupancyRate: 0,
    overduePayments: 0,
  };

  // ✅ Dummy Data
  const revenueData = [];

  const tenantGrowthData = [];

  const recentActivity = [];

  const recentPayments = [];

  const roomOccupancy = {
    available: 0,
    occupied: 0,
    maintenance: 0,
    total: 0,
  };

  const systemStatus = [
    { name: "Database", icon: Database },
    { name: "Server", icon: Server },
    { name: "WiFi", icon: Wifi },
  ];

  // ✅ Filter tenants
  const filteredTenants = recentActivity.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || tenant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* ✅ 1. Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tenants */}
        <div className="flex items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-x-4 hover:scale-105 transition-transform duration-200">
          <Users className="h-10 w-10 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tenants</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.totalTenants}
            </h3>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="flex items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-x-4 hover:scale-105 transition-transform duration-200">
          <DollarSign className="h-10 w-10 text-green-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">
              ₹{stats.monthlyRevenue.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="flex items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-x-4 hover:scale-105 transition-transform duration-200">
          <Home className="h-10 w-10 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Vacant Rooms</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.occupancyRate}%
            </h3>
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="flex items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-x-4 hover:scale-105 transition-transform duration-200">
          <AlertTriangle className="h-10 w-10 text-red-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">
              Overdue Payments
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.overduePayments}
            </h3>
          </div>
        </div>
      </section>

      {/* ✅ 2. Analytics Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Analytics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Analytics
            </h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tenant Growth */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Tenant Growth
            </h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenantGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Tenants"]} />
              <Bar dataKey="tenants" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ✅ 3. Recent Tenant Activity */}
      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h3 className="text-xl font-bold">Recent Tenant Activity</h3>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by tenant name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-gray-900">{tenant.name}</div>
                <div className="text-sm text-gray-500">Room {tenant.room}</div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tenant.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : tenant.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tenant.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ 4. Recent Payments */}
      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-6">Recent Payments</h3>
        <div className="space-y-4">
          {recentPayments.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-gray-900">{payment.tenant}</div>
                <div className="text-sm text-gray-500">{payment.date}</div>
              </div>
              <span className="text-green-600 font-semibold">
                ₹{payment.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ 5. Room Occupancy */}
      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Room Occupancy Status
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Available</span>
            <span className="text-lg font-bold text-gray-600 bg-green-100 px-2 py-1 rounded">
              {roomOccupancy.available}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Occupied</span>
            <span className="text-lg font-bold text-blue-600">
              {roomOccupancy.occupied}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              Maintenance
            </span>
            <span className="text-lg font-bold text-yellow-600">
              {roomOccupancy.maintenance}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Total</span>
            <span className="text-lg font-bold text-gray-900">
              {roomOccupancy.total}
            </span>
          </div>
        </div>
      </section>

      {/* ✅ 6. Quick Actions */}
      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: Plus, label: "Add Tenant" },
            { icon: Send, label: "Send Reminders" },
            { icon: Download, label: "Export Data" },
            { icon: FileText, label: "Payment Reports" },
            { icon: Settings, label: "Manage Rooms" },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-gray-100 rounded-xl shadow-sm hover:scale-105 transition-transform duration-200"
            >
              <action.icon className="h-6 w-6 mb-2 text-gray-700" />
              <span className="text-sm font-medium text-gray-800">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ✅ 7. System Status */}
      <section className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-6">System Status</h3>
        <div className="space-y-3">
          {systemStatus.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <service.icon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {service.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">
                  Online
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;








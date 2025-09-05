import React, { useState } from "react";
import {
  Users, DollarSign, Building2, AlertTriangle, Plus, Send, Download,
  FileText, Settings, CheckCircle, Database, Mail, Clock,
  BarChart3, TrendingUp, Activity, Search
} from "lucide-react";
import AddTenantModal from "../../components/AddTenantModal";
import {
  Line, Bar, ResponsiveContainer, LineChart, BarChart,
  XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

const AdminDashboard = () => {
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock data
  const stats = {
    totalTenants: 45,
    monthlyRevenue: 125000,
    occupancyRate: 85,
    overduePayments: 3,
  };

  const recentActivity = [
    { name: "John Doe", room: "A-101", status: "Active", nextPayment: "2024-02-15", id: 1 },
    { name: "Jane Smith", room: "B-205", status: "Pending", nextPayment: "2024-02-12", id: 2 },
    { name: "Mike Johnson", room: "C-301", status: "Active", nextPayment: "2024-02-18", id: 3 },
    { name: "Sarah Wilson", room: "A-102", status: "Overdue", nextPayment: "2024-02-10", id: 4 },
    { name: "David Brown", room: "B-203", status: "Active", nextPayment: "2024-02-20", id: 5 },
  ];

  const roomOccupancy = {
    available: 15,
    occupied: 40,
    maintenance: 5,
    total: 60,
  };

  const systemStatus = [
    { name: "Email Service", status: "online", icon: Mail },
    { name: "Database", status: "online", icon: Database },
    { name: "Cron Service", status: "online", icon: Clock },
  ];

  const revenueData = [
    { month: "Jan", revenue: 95000 },
    { month: "Feb", revenue: 110000 },
    { month: "Mar", revenue: 125000 },
    { month: "Apr", revenue: 130000 },
    { month: "May", revenue: 140000 },
    { month: "Jun", revenue: 135000 },
  ];

  const tenantGrowthData = [
    { month: "Jan", tenants: 35 },
    { month: "Feb", tenants: 38 },
    { month: "Mar", tenants: 42 },
    { month: "Apr", tenants: 45 },
    { month: "May", tenants: 48 },
    { month: "Jun", tenants: 45 },
  ];

  const recentTickets = [
    { id: "T001", issueType: "Plumbing", status: "In Progress", dateCreated: "2024-02-15" },
    { id: "T002", issueType: "Electrical", status: "Pending", dateCreated: "2024-02-14" },
    { id: "T003", issueType: "Maintenance", status: "Completed", dateCreated: "2024-02-13" },
    { id: "T004", issueType: "AC Repair", status: "Pending", dateCreated: "2024-02-12" },
  ];

  return (
    <div className="p-6 bg-admin-bg min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-admin-card-foreground">Dashboard</h1>
        <p className="text-admin-description-text mt-2">
          Welcome back! Here's what's happening with your property.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-admin-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-admin-secondary-text">Total Tenants</p>
              <p className="text-3xl font-bold mt-1">{stats.totalTenants}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-admin-primary" />
            </div>
          </div>
        </div>

        <div className="bg-admin-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-admin-secondary-text">Monthly Revenue</p>
              <p className="text-3xl font-bold mt-1">₹{stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-8 w-8 text-admin-success" />
            </div>
          </div>
        </div>

        <div className="bg-admin-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-admin-secondary-text">Occupancy Rate</p>
              <p className="text-3xl font-bold mt-1">{stats.occupancyRate}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="h-8 w-8 text-admin-primary" />
            </div>
          </div>
        </div>

        <div className="bg-admin-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-admin-secondary-text">Overdue Payments</p>
              <p className="text-3xl font-bold mt-1">{stats.overduePayments}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-admin-danger" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Analytics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tenant Growth */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tenant Growth</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenantGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tenants" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tenant Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        {/* Header with Search + Filter + Add Tenant */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Tenant Activity</h3>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by Name, Email, or Room"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Filter Dropdown */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            {/* Add Tenant Button */}
            <button
              onClick={() => setIsAddTenantModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Tenant
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Tenant Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Room</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Next Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity
                .filter((tenant) => filterStatus === "All" || tenant.status === filterStatus)
                .filter((tenant) =>
                  tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tenant.room.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((tenant) => (
                  <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-900">{tenant.name}</td>
                    <td className="p-4 text-sm text-gray-600">{tenant.room}</td>
                    <td className="p-4">
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
                    </td>
                    <td className="p-4 text-sm text-gray-600">{tenant.nextPayment}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
           {/* Add New Tenant */}
          <button
            onClick={() => setIsAddTenantModalOpen(true)}
            className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-gray-50"
          >
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Add New Tenant</span>
          </button>
          
         {/* Send Bulk Reminders */}

          <button className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-gray-50">
            <Send className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Send Bulk Reminders</span>
          </button>
           {/* Export Tenant Data */}
          <button className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-gray-50">
            <Download className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Export Tenant Data</span>
          </button>
            {/* Payment Reports */}
          <button className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-gray-50">
            <FileText className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Payment Reports</span>
          </button>
            {/* Manage Rooms */}
          <button className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition hover:bg-gray-50">
            <Settings className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Manage Rooms</span>
          </button>
        </div>
      </div>

      {/* Room Occupancy Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Room Occupancy Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Available</span>
            <span className="text-lg font-bold text-gray-600 bg-green-100 px-2 py-1 rounded">{roomOccupancy.available}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Occupied</span>
            <span className="text-lg font-bold text-blue-600">{roomOccupancy.occupied}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Maintenance</span>
            <span className="text-lg font-bold text-yellow-600">{roomOccupancy.maintenance}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Total Rooms</span>
            <span className="text-lg font-bold text-gray-900">{roomOccupancy.total}</span>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-medium">✅ All Systems Operational</p>
          <p className="text-sm text-green-600 mt-1">No critical warnings detected</p>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">System Status</h3>
        <div className="space-y-3">
          {systemStatus.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <service.icon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{service.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Add Tenant Modal */}
      {isAddTenantModalOpen && (
        <AddTenantModal onClose={() => setIsAddTenantModalOpen(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;


import React, { useState, useEffect } from "react";
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
import apiFetch from "@/lib/apiClient";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Real stats data from API
  const [stats, setStats] = useState({
    totalTenants: 0,
    monthlyRevenue: 0,
    occupancyRate: 0,
    overduePayments: 0,
  });

  // ✅ Real data from APIs
  const [revenueData, setRevenueData] = useState([]);
  const [tenantGrowthData, setTenantGrowthData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [roomOccupancy, setRoomOccupancy] = useState({
    available: 0,
    occupied: 0,
    maintenance: 0,
    total: 0,
  });

  const systemStatus = [
    { name: "Database", icon: Database },
    { name: "Server", icon: Server },
    { name: "WiFi", icon: Wifi },
  ];

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        tenantsRes,
        paymentsRes,
        roomsRes,
        expensesRes,
        ticketsRes
      ] = await Promise.all([
        apiFetch("/tenants"),
        apiFetch("/payments"),
        apiFetch("/rooms"),
        apiFetch("/expenses"),
        apiFetch("/tickets")
      ]);

      // Calculate stats
      const totalTenants = tenantsRes.tenants?.length || 0;
      const totalPayments = paymentsRes.payments || [];
      const monthlyRevenue = totalPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      const rooms = roomsRes.rooms || [];
      const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
      const totalRooms = rooms.length;
      const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

      // Mock overdue payments (in real app, calculate based on due dates)
      const overduePayments = totalPayments.filter(p =>
        p.status === 'pending' &&
        new Date(p.dueDate || p.paidAt) < new Date()
      ).length;

      setStats({
        totalTenants,
        monthlyRevenue,
        occupancyRate,
        overduePayments,
      });

      // Set room occupancy
      setRoomOccupancy({
        available: rooms.filter(r => r.status === 'available').length,
        occupied: occupiedRooms,
        maintenance: rooms.filter(r => r.status === 'maintenance').length,
        total: totalRooms,
      });

      // Process recent payments (last 5)
      const recentPaymentsData = totalPayments
        .slice(-5)
        .reverse()
        .map(payment => ({
          id: payment._id,
          tenant: payment.tenant?.firstName ?
            `${payment.tenant.firstName} ${payment.tenant.lastName || ''}`.trim() :
            'Unknown Tenant',
          amount: payment.amount || 0,
          date: new Date(payment.paidAt || payment.createdAt).toLocaleDateString(),
          method: payment.method || 'N/A',
          status: payment.status || 'pending',
        }));
      setRecentPayments(recentPaymentsData);

      // Process recent tenant activity (recent tenants and tickets)
      const recentTenants = tenantsRes.tenants?.slice(-5).reverse().map(tenant => ({
        id: tenant._id,
        name: `${tenant.firstName} ${tenant.lastName || ''}`.trim(),
        room: tenant.room?.number || 'N/A',
        status: tenant.active ? 'Active' : 'Inactive',
        joinDate: new Date(tenant.moveInDate || tenant.createdAt).toLocaleDateString(),
      })) || [];

      const recentTickets = ticketsRes.tickets?.slice(-3).map(ticket => ({
        id: ticket._id,
        name: ticket.tenant?.firstName ?
          `${ticket.tenant.firstName} ${ticket.tenant.lastName || ''}`.trim() :
          'Unknown Tenant',
        room: ticket.tenant?.room?.number || 'N/A',
        status: ticket.status === 'open' ? 'Pending' :
                ticket.status === 'in_progress' ? 'In Progress' :
                ticket.status === 'resolved' ? 'Resolved' : 'Closed',
        type: 'Ticket',
        description: ticket.title,
      })) || [];

      setRecentActivity([...recentTenants, ...recentTickets]);

      // Generate revenue data (mock monthly data based on payments)
      const monthlyRevenueData = [];
      const currentDate = new Date();
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthPayments = totalPayments.filter(p => {
          const paymentDate = new Date(p.paidAt || p.createdAt);
          return paymentDate.getMonth() === monthDate.getMonth() &&
                 paymentDate.getFullYear() === monthDate.getFullYear();
        });
        const monthRevenue = monthPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

        monthlyRevenueData.push({
          month: monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          revenue: monthRevenue,
        });
      }
      setRevenueData(monthlyRevenueData);

      // Generate tenant growth data
      const tenantGrowth = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthTenants = tenantsRes.tenants?.filter(t => {
          const joinDate = new Date(t.moveInDate || t.createdAt);
          return joinDate.getMonth() === monthDate.getMonth() &&
                 joinDate.getFullYear() === monthDate.getFullYear();
        }).length || 0;

        tenantGrowth.push({
          month: monthDate.toLocaleDateString('en-US', { month: 'short' }),
          tenants: monthTenants,
        });
      }
      setTenantGrowthData(tenantGrowth);

    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ Filter tenants
  const filteredTenants = recentActivity.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || tenant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">Error Loading Dashboard</p>
          <p>{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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








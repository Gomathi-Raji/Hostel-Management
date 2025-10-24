import React, { useState, useEffect } from "react";
import { DollarSign, Clock, AlertTriangle, Download, Search, Filter } from "lucide-react";
import apiFetch from '@/lib/apiClient';

const PaymentTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalAmount: 0,
    paid: 0,
    pending: 0,
    overdue: 0
  });

  // Load payments and stats on component mount
  useEffect(() => {
    loadPayments();
    loadPaymentStats();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/payments');
      setPayments(response.payments || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load payments');
      console.error('Error loading payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentStats = async () => {
    try {
      const response = await apiFetch('/payments/stats');
      setStats(response.stats || {
        totalAmount: 0,
        paid: 0,
        pending: 0,
        overdue: 0
      });
    } catch (err) {
      console.error('Error loading payment stats:', err);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "paid": return `${baseClasses} bg-green-100 text-green-800`;
      case "pending": return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "overdue": return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-500`;
    }
  };

  const markAsPaid = async (paymentId) => {
    try {
      await apiFetch(`/payments/${paymentId}/status`, {
        method: 'PATCH',
        body: { status: 'paid' }
      });
      // Reload payments and stats
      loadPayments();
      loadPaymentStats();
    } catch (err) {
      console.error('Error marking payment as paid:', err);
      alert(err.message || 'Failed to mark payment as paid');
    }
  };

  const handleExportData = () => {
    // Create CSV content
    const headers = ['Tenant Name', 'Email', 'Room', 'Amount', 'Status', 'Due Date', 'Paid Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(payment => [
        payment.tenant ? `"${payment.tenant.firstName} ${payment.tenant.lastName}"` : 'Unknown',
        payment.tenant?.email || 'N/A',
        payment.room?.number || 'N/A',
        payment.amount,
        payment.status,
        payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A',
        payment.status === "paid" && payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : '-'
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `payment_tracking_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = payments.filter(payment => {
    const tenantName = payment.tenant ? `${payment.tenant.firstName} ${payment.tenant.lastName}` : '';
    const matchesSearch = tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (payment.tenant?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(stats).map(([key, value]) => {
          const icons = { totalAmount: DollarSign, paid: DollarSign, pending: Clock, overdue: AlertTriangle };
          const colors = { totalAmount: "text-blue-600", paid: "text-green-600", pending: "text-yellow-600", overdue: "text-red-600" };
          const Icon = icons[key];
          return (
            <div key={key} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className={`text-3xl font-bold mt-1 ${colors[key]}`}>₹{value.toLocaleString()}</p>
                </div>
                <div className={`bg-gray-100 p-3 rounded-lg`}>
                  <Icon className={`h-8 w-8 ${colors[key]}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payment Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor and manage tenant payments</p>
        </div>
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md border border-blue-700 hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          <Download className="h-5 w-5" /> Export Data
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Tenant Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Records */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left text-sm font-medium text-gray-500">Tenant Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Room</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Due Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Paid Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    Loading payments...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredRecords.length > 0 ? filteredRecords.map(payment => (
                <tr key={payment._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {payment.tenant ? `${payment.tenant.firstName} ${payment.tenant.lastName}` : 'Unknown'}
                    <div className="text-xs text-gray-500">{payment.tenant?.email || 'N/A'}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-800">{payment.room?.number || 'N/A'}</td>
                  <td className="p-4 text-sm font-medium text-gray-800">₹{payment.amount.toLocaleString()}</td>
                  <td className="p-4"><span className={getStatusBadge(payment.status)}>{payment.status}</span></td>
                  <td className="p-4 text-sm text-gray-800">{payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-4 text-sm text-gray-500">{payment.status === "paid" && payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}</td>
                  <td className="p-4 flex flex-col gap-2">
                    {payment.status === "pending" && <button onClick={() => markAsPaid(payment._id)} className="text-xs bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">Mark Paid</button>}
                    {payment.status === "overdue" && <button className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Send Reminder</button>}
                    <button className="text-xs text-blue-600 hover:text-blue-800">View</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    {searchTerm || filterStatus !== "all" ? "No records found." : "No records available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading payments...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredRecords.length > 0 ? filteredRecords.map(payment => (
            <div key={payment._id} className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800">
                    {payment.tenant ? `${payment.tenant.firstName} ${payment.tenant.lastName}` : 'Unknown'}
                  </div>
                  <div className="text-xs text-gray-500">{payment.tenant?.email || 'N/A'}</div>
                </div>
                <span className={getStatusBadge(payment.status)}>{payment.status}</span>
              </div>
              <div className="text-sm text-gray-800">Room: {payment.room?.number || 'N/A'}</div>
              <div className="text-sm text-gray-800">Amount: ₹{payment.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Due: {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : 'N/A'}</div>
              <div className="text-sm text-gray-500">Paid: {payment.status === "paid" && payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {payment.status === "pending" && <button onClick={() => markAsPaid(payment._id)} className="text-xs bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium">Mark Paid</button>}
                {payment.status === "overdue" && <button className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Send Reminder</button>}
                <button className="text-xs text-blue-600 hover:text-blue-800">View</button>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500">No records available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;

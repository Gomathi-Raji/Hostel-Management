import React, { useState, useEffect } from "react";
import {
  Calendar,
  Home,
  AlertCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Lock,
  DollarSign,
  AlertTriangle,
  FileText,
  User
} from "lucide-react";
import apiFetch from "@/lib/apiClient";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    userName: "",
    currentRent: 0,
    dueDate: null,
    activeIssues: 0,
    roomNumber: null,
    recentInvoices: [],
    activeTickets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for showing more/less invoices
  const [showAllInvoices, setShowAllInvoices] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/tenants/dashboard/my-info");
      setDashboardData(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get invoices to display based on show more/less state
  const displayedInvoices = showAllInvoices ? dashboardData.recentInvoices : (dashboardData.recentInvoices || []).slice(0, 3);

  // Check if invoice is paid (downloadable)
  const isInvoicePaid = (invoice) => invoice.status?.toLowerCase() === "completed";

  const handleDownload = (invoice) => {
    if (isInvoicePaid(invoice)) {
      console.log(`Downloading invoice for ${invoice.paidAt}`);
      alert(`Downloading invoice for ${formatDate(invoice.paidAt)}...`);
    } else {
      alert(`Cannot download invoice. Payment is required first.`);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status?.toLowerCase()) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
      case "in_progress":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`;
      case "open":
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority?.toLowerCase()) {
      case "high":
        return `${baseClasses} bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800`;
      case "medium":
        return `${baseClasses} bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800`;
      case "low":
        return `${baseClasses} bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <button
                onClick={fetchDashboardData}
                className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back, {dashboardData.userName || "User"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's an overview of your hostel account
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-orange-600 dark:text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Rent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(dashboardData.currentRent)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Due Date</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.dueDate ? formatDate(dashboardData.dueDate) : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Issues</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.activeIssues}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-green-600 dark:text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Room Number</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.roomNumber || "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Invoices</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {displayedInvoices && displayedInvoices.length > 0 ? displayedInvoices.map((invoice, index) => {
                const isPaid = isInvoicePaid(invoice);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {invoice.type === 'rent' ? 'Monthly Rent' : invoice.type}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatCurrency(invoice.amount)}
                      </p>
                      {invoice.paidAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Paid on: {formatDate(invoice.paidAt)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={getStatusBadge(invoice.status)}>{invoice.status}</span>

                      {/* Download / Lock */}
                      {isPaid ? (
                        <button
                          onClick={() => handleDownload(invoice)}
                          className="p-2 rounded-lg transition-all duration-200"
                          title="Download invoice"
                        >
                          <Download className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleDownload(invoice)}
                            disabled
                            className="text-gray-400 dark:text-gray-600 cursor-not-allowed p-2 rounded-lg"
                            title="Payment required to download"
                          >
                            <Lock className="h-4 w-4" />
                          </button>
                          <span className="text-xs text-gray-400 dark:text-gray-600">
                            Payment Required
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No recent invoices</p>
              )}
            </div>

            {/* Show More/Show Less Button */}
            {dashboardData.recentInvoices && dashboardData.recentInvoices.length > 3 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllInvoices(!showAllInvoices)}
                  className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                >
                  {showAllInvoices ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      <span>Show More ({dashboardData.recentInvoices.length - 3} more)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Tickets */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Tickets</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.activeTickets && dashboardData.activeTickets.length > 0 ? dashboardData.activeTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h3>
                    <div className="flex space-x-2">
                      <span className={getStatusBadge(ticket.status)}>{ticket.status}</span>
                      <span className={getPriorityBadge(ticket.priority)}>{ticket.priority}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created: {formatDate(ticket.createdAt)}
                  </p>
                </div>
              )) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No active tickets</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

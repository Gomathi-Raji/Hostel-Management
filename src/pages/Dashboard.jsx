import React, { useState } from "react";
import {
  Calendar,
  Home,
  AlertCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";

const Dashboard = () => {
  const userName = "";
  const currentRent = "₹0";
  const dueDate = "";
  const activeIssues = 0;
  const roomNumber = "";

  // State for showing more/less invoices
  const [showAllInvoices, setShowAllInvoices] = useState(false);

  const recentInvoices = [];

  const activeTickets = [];

  // Get invoices to display based on show more/less state
  const displayedInvoices = showAllInvoices ? recentInvoices : recentInvoices.slice(0, 3);

  // Check if invoice is paid (downloadable)
  const isInvoicePaid = (invoice) => invoice.status.toLowerCase() === "paid";

  const handleDownload = (invoice) => {
    if (isInvoicePaid(invoice)) {
      console.log(`Downloading invoice for ${invoice.month}`);
      alert(`Downloading invoice for ${invoice.month}...`);
    } else {
      alert(`Cannot download invoice for ${invoice.month}. Payment is required first.`);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "paid":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
      case "overdue":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
      case "in-progress":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`;
      case "open":
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority.toLowerCase()) {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back, {userName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's an overview of your hostel account
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-orange-600 dark:text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Rent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentRent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Due Date</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dueDate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Issues</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeIssues}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-green-600 dark:text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Room Number</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{roomNumber}</p>
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
              {displayedInvoices.map((invoice, index) => {
                const isPaid = isInvoicePaid(invoice);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{invoice.month}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.amount}</p>
                      {invoice.paidDate && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Paid on: {new Date(invoice.paidDate).toLocaleDateString()}
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
                          <Download className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
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
              })}
            </div>

            {/* Show More/Show Less Button */}
            {recentInvoices.length > 3 && (
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
                      <span>Show More ({recentInvoices.length - 3} more)</span>
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
              {activeTickets.map((ticket) => (
                <div
                  key={ticket.id}
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
                    Created: {new Date(ticket.createdDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Calendar, Home, AlertCircle, Download } from "lucide-react";

const Dashboard = ( ) => {
  const userName = "John Smith";
  const currentRent = "₹12,000";
  const dueDate = "5th";
  const activeIssues = 2;
  const roomNumber = "101";

  const recentInvoices = [
    { month: "December 2024", amount: "₹12,000", status: "Paid", paidDate: "2024-12-01" },
    { month: "November 2024", amount: "₹12,000", status: "Paid", paidDate: "2024-11-03" },
    { month: "October 2024", amount: "₹12,000", status: "Overdue", paidDate: null },
    { month: "September 2024", amount: "₹12,000", status: "Pending", paidDate: null }
  ];

  const activeTickets = [
    {
      id: 1,
      title: "AC not working",
      status: "In-progress",
      priority: "High",
      createdDate: "2024-12-15"
    },
    {
      id: 2,
      title: "Wi-Fi issues",
      status: "Open",
      priority: "Medium",
      createdDate: "2024-12-14"
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "paid":
        return `${baseClasses} bg-status-paid text-status-paid-foreground`;
      case "pending":
        return `${baseClasses} bg-status-pending text-status-pending-foreground`;
      case "overdue":
        return `${baseClasses} bg-status-overdue text-status-overdue-foreground`;
      case "in-progress":
        return `${baseClasses} bg-blue-500 text-white`;
      case "open":
        return `${baseClasses} bg-gray-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority.toLowerCase()) {
      case "high":
        return `${baseClasses} bg-priority-high text-priority-high-foreground`;
      case "medium":
        return `${baseClasses} bg-priority-medium text-priority-medium-foreground`;
      case "low":
        return `${baseClasses} bg-priority-low text-priority-low-foreground`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome Back, {userName}!</h1>
        <p className="text-muted-foreground mt-2">Here's an overview of your hostel account</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card shadow-card rounded-lg p-6 border border-border">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-mustard-orange" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Current Rent</p>
              <p className="text-2xl font-bold text-foreground">{currentRent}</p>
            </div>
          </div>
        </div>

        <div className="bg-card shadow-card rounded-lg p-6 border border-border">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-accent-purple" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Due Date</p>
              <p className="text-2xl font-bold text-foreground">{dueDate}</p>
            </div>
          </div>
        </div>

        <div className="bg-card shadow-card rounded-lg p-6 border border-border">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-status-overdue" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Issues</p>
              <p className="text-2xl font-bold text-foreground">{activeIssues}</p>
            </div>
          </div>
        </div>

        <div className="bg-card shadow-card rounded-lg p-6 border border-border">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-status-paid" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Room Number</p>
              <p className="text-2xl font-bold text-foreground">{roomNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <div className="bg-card shadow-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Recent Invoices</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentInvoices.map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{invoice.month}</p>
                    <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={getStatusBadge(invoice.status)}>
                      {invoice.status}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Tickets */}
        <div className="bg-card shadow-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Active Tickets</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activeTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 bg-background rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">{ticket.title}</h3>
                    <div className="flex space-x-2">
                      <span className={getStatusBadge(ticket.status)}>
                        {ticket.status}
                      </span>
                      <span className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
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
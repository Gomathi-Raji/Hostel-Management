import React, { useState } from "react";
import { DollarSign, Clock, AlertTriangle, Download, Search, Filter } from "lucide-react";

const PaymentTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const paymentStats = {
    totalAmount: 450000,
    paid: 380000,
    pending: 45000,
    overdue: 25000
  };

  const paymentRecords = [
    {
      id: 1,
      tenantName: "John Doe",
      tenantEmail: "john.doe@email.com",
      amount: 15000,
      status: "Paid",
      date: "2024-02-01",
      dueDate: "2024-02-01",
      room: "A-101"
    },
    {
      id: 2,
      tenantName: "Jane Smith",
      tenantEmail: "jane.smith@email.com",
      amount: 15000,
      status: "Pending",
      date: "2024-02-12",
      dueDate: "2024-02-05",
      room: "B-205"
    },
    {
      id: 3,
      tenantName: "Mike Johnson",
      tenantEmail: "mike.johnson@email.com",
      amount: 15000,
      status: "Overdue",
      date: "2024-02-10",
      dueDate: "2024-01-30",
      room: "C-301"
    },
    {
      id: 4,
      tenantName: "Sarah Wilson",
      tenantEmail: "sarah.wilson@email.com",
      amount: 15000,
      status: "Paid",
      date: "2024-01-28",
      dueDate: "2024-01-30",
      room: "A-102"
    },
    {
      id: 5,
      tenantName: "David Brown",
      tenantEmail: "david.brown@email.com",
      amount: 15000,
      status: "Pending",
      date: "2024-02-20",
      dueDate: "2024-02-15",
      room: "B-203"
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Paid":
        return `${baseClasses} bg-paid text-paid-foreground`;
      case "Pending":
        return `${baseClasses} bg-pending text-pending-foreground`;
      case "Overdue":
        return `${baseClasses} bg-overdue text-overdue-foreground`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const handleExportData = () => {
    // Handle CSV export
    console.log("Exporting payment data...");
  };

  const filteredRecords = paymentRecords.filter(record => {
    const matchesSearch = record.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.tenantEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || record.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-datahub-bg min-h-screen">
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-content-text/70">Total Amount</p>
                <p className="text-3xl font-bold text-payment-primary mt-1">₹{paymentStats.totalAmount.toLocaleString()}</p>
              </div>
              <div className="bg-payment-primary/10 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-payment-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-content-text/70">Paid</p>
                <p className="text-3xl font-bold text-paid mt-1">₹{paymentStats.paid.toLocaleString()}</p>
              </div>
              <div className="bg-paid/10 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-paid" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-content-text/70">Pending</p>
                <p className="text-3xl font-bold text-payment-warning mt-1">₹{paymentStats.pending.toLocaleString()}</p>
              </div>
              <div className="bg-payment-warning/10 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-payment-warning" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-content-text/70">Overdue</p>
                <p className="text-3xl font-bold text-overdue mt-1">₹{paymentStats.overdue.toLocaleString()}</p>
              </div>
              <div className="bg-overdue/10 p-3 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-overdue" />
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-payment-primary">Payment Tracking</h1>
            <p className="text-admin-content-text mt-1">Monitor and manage tenant payments</p>
          </div>
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold 
             shadow-md border border-blue-700 hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          <Download className="h-5 w-5" />
          Export Data
        </button>
      </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Tenant Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

        {/* Payment Records Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Payment Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tenant Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Room</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Due Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Paid Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">{record.tenantName}</div>
                        <div className="text-xs text-muted-foreground">{record.tenantEmail}</div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-foreground">{record.room}</td>
                    <td className="p-4 text-sm font-medium text-foreground">₹{record.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={getStatusBadge(record.status)}>{record.status}</span>
                    </td>
                    <td className="p-4 text-sm text-foreground">{record.dueDate}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {record.status === "Paid" ? record.date : "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {record.status === "Pending" && (
                          <button className="text-xs bg-admin-accent text-white px-3 py-2 rounded-lg hover:bg-admin-accent/90 transition-colors font-medium">
                            Mark Paid
                          </button>
                        )}
                        {record.status === "Overdue" && (
                          <button className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                            Send Reminder
                          </button>
                        )}
                        <button className="text-xs text-primary hover:text-primary/80">View</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-muted-foreground">
                    {searchTerm || filterStatus !== "all" ? "No payment records found matching your criteria." : "No payment records available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Showing 1-5 of {filteredRecords.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted">Previous</button>
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">1</button>
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted">Next</button>
          </div>
        </div>
        </div>
    </div>
  );
};

export default PaymentTracking;
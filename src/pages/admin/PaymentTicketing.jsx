import React from "react";
import { Plus, Download, FileText, DollarSign, Clock, CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentTicketing = () => {
  const navigate = useNavigate();

  // Mock data
  const ticketStats = {
    totalTickets: 156,
    pendingPayments: 23,
    completedPayments: 133
  };

  const paymentTickets = [
    { id: "PT001", tenantName: "John Doe", amount: 15000, status: "Paid", dueDate: "2024-02-15", issueType: "Monthly Rent" },
    { id: "PT002", tenantName: "Jane Smith", amount: 15000, status: "Pending", dueDate: "2024-02-12", issueType: "Monthly Rent" },
    { id: "PT003", tenantName: "Mike Johnson", amount: 18000, status: "Overdue", dueDate: "2024-01-30", issueType: "Monthly Rent + Utilities" },
    { id: "PT004", tenantName: "Sarah Wilson", amount: 15000, status: "Paid", dueDate: "2024-02-10", issueType: "Monthly Rent" },
    { id: "PT005", tenantName: "David Brown", amount: 20000, status: "Pending", dueDate: "2024-02-20", issueType: "Monthly Rent + Security Deposit" }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Overdue": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Ticketing</h1>
          <p className="text-gray-600 mt-1">Manage payment tickets and track payment status</p>
        </div>
        <button
          onClick={() => navigate("/admin/add-new-ticket")}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          <Plus className="h-5 w-5" /> Generate New Ticket
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{ticketStats.totalTickets}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{ticketStats.pendingPayments}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Payments</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{ticketStats.completedPayments}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Tickets */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left text-sm font-medium text-gray-500">Ticket ID</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Tenant</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Due Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentTickets.map(ticket => (
                <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{ticket.id}</td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.tenantName}</div>
                    <div className="text-xs text-gray-500">{ticket.issueType}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">₹{ticket.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(ticket.status)}`}>{ticket.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{ticket.dueDate}</td>
                  <td className="p-4 flex flex-col gap-2">
                    <button 
                      onClick={() => navigate(`/admin/payment-ticket-detail/${ticket.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" /> View
                    </button>
                    {ticket.status === "Pending" && (
                      <button className="text-green-600 hover:text-green-800 text-sm">Mark Paid</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {paymentTickets.map(ticket => (
            <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{ticket.id}</div>
                  <div className="text-xs text-gray-500">{ticket.tenantName}</div>
                  <div className="text-xs text-gray-500">{ticket.issueType}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(ticket.status)}`}>{ticket.status}</span>
              </div>
              <div className="text-sm text-gray-900">Amount: ₹{ticket.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Due: {ticket.dueDate}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                <button 
                  onClick={() => navigate(`/admin/payment-ticket-detail/${ticket.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" /> View
                </button>
                {ticket.status === "Pending" && (
                  <button className="text-green-600 hover:text-green-800 text-sm">Mark Paid</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentTicketing;

import React, { useState } from "react";
import { ArrowLeft, Download, FileText, DollarSign, Calendar, User, Home, CreditCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentTicketDetail = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [isPaid, setIsPaid] = useState(false);

  // Mock ticket data
  const ticketData = {
    id: ticketId || "PT001",
    tenantName: "John Doe",
    roomNumber: "A-101",
    issueType: "Monthly Rent",
    totalAmount: 15000,
    paidAmount: 0,
    remainingBalance: 15000,
    paymentDueDate: "2024-02-15",
    status: "Pending",
    generatedDate: "2024-01-15",
    description: "Monthly rent payment for February 2024"
  };

  const paymentHistory = [
    {
      id: "PAY001",
      date: "2024-01-15",
      amount: 15000,
      mode: "Bank Transfer"
    },
    {
      id: "PAY002", 
      date: "2023-12-15",
      amount: 15000,
      mode: "Cash"
    },
    {
      id: "PAY003",
      date: "2023-11-15", 
      amount: 15000,
      mode: "Online Payment"
    }
  ];

  const handleMarkAsPaid = () => {
    setIsPaid(true);
    console.log("Payment marked as paid");
  };

  return (
    <div className="p-6 bg-datahub-bg min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/admin/payment-ticketing")}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Payment Ticket Details</h1>
            </div>
            <p className="text-gray-600">Invoice-style payment ticket layout</p>
          </div>

          {/* Ticket Details Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
            {/* Header Info */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Invoice</h2>
                <p className="text-gray-600">Ticket ID: {ticketData.id}</p>
                <p className="text-gray-600">Generated: {ticketData.generatedDate}</p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isPaid || ticketData.status === 'Paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {isPaid ? 'Paid' : ticketData.status}
                </div>
              </div>
            </div>

            {/* Tenant & Property Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Tenant Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">{ticketData.tenantName}</p>
                  <p className="text-gray-600">Room: {ticketData.roomNumber}</p>
                  <p className="text-gray-600">Issue Type: {ticketData.issueType}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Payment Details
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Due Date: {ticketData.paymentDueDate}</p>
                  <p className="text-gray-600">Description: {ticketData.description}</p>
                </div>
              </div>
            </div>

            {/* Amount Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Amount Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-xl font-bold text-gray-900">₹{ticketData.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Paid Amount:</span>
                  <span className="text-lg font-medium text-green-600">₹{isPaid ? ticketData.totalAmount.toLocaleString() : ticketData.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                  <span className="text-gray-900 font-medium">Remaining Balance:</span>
                  <span className="text-xl font-bold text-red-600">₹{isPaid ? '0' : ticketData.remainingBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!isPaid && ticketData.status !== 'Paid' && (
              <div className="mb-8">
                <button
                  onClick={handleMarkAsPaid}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Mark as Paid
                </button>
              </div>
            )}
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Payment ID</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Amount Paid</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Mode of Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-900">{payment.id}</td>
                      <td className="p-4 text-sm text-gray-600">{payment.date}</td>
                      <td className="p-4 text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-gray-600">{payment.mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           </div>
    </div>
  );
};

export default PaymentTicketDetail;
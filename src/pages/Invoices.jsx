import { useState } from "react";
import { Download, Search, Filter, Lock } from "lucide-react";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const invoices = [
    { id: 1, period: "December 2024", amount: "₹12,000", dueDate: "2024-12-05", paidDate: "2024-12-01", status: "Paid" },
    { id: 2, period: "November 2024", amount: "₹12,000", dueDate: "2024-11-05", paidDate: "2024-11-03", status: "Paid" },
    { id: 3, period: "October 2024", amount: "₹12,000", dueDate: "2024-10-05", paidDate: null, status: "Overdue" },
    { id: 4, period: "September 2024", amount: "₹12,000", dueDate: "2024-09-05", paidDate: null, status: "Pending" },
    { id: 5, period: "August 2024", amount: "₹12,000", dueDate: "2024-08-05", paidDate: "2024-08-02", status: "Paid" }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "paid":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
      case "overdue":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`;
    }
  };

  const isInvoicePaid = (invoice) => invoice.status.toLowerCase() === "paid";

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleDownloadAll = () => {
    const paidInvoices = invoices.filter(isInvoicePaid);
    if (paidInvoices.length === 0) {
      alert("No paid invoices available for download.");
      return;
    }
    alert(`Downloading ${paidInvoices.length} paid invoices...`);
  };

  const handleDownloadInvoice = (invoice) => {
    if (isInvoicePaid(invoice)) {
      alert(`Downloading invoice for ${invoice.period}...`);
    } else {
      alert(`Invoice for ${invoice.period} cannot be downloaded. Payment is required first.`);
    }
  };

  const paidInvoicesCount = invoices.filter(isInvoicePaid).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoice Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track and download your payment invoices</p>
        </div>
        <button
          onClick={handleDownloadAll}
          disabled={paidInvoicesCount === 0}
          className={`mt-4 sm:mt-0 font-medium py-2 px-6 rounded-lg flex items-center gap-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              paidInvoicesCount > 0
                ? "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
            }`}
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Paid Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => {
                const isPaid = isInvoicePaid(invoice);
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{invoice.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{invoice.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(invoice.status)}>{invoice.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {isPaid ? (
                        <button
                          onClick={() => handleDownloadInvoice(invoice)}
                          className="p-1 rounded"
                          title="Download Invoice"
                        >
                          <Download className="h-4 w-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" />
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleDownloadInvoice(invoice)}
                            disabled
                            className="text-gray-400 dark:text-gray-600 cursor-not-allowed p-1 rounded"
                            title="Payment required to download"
                          >
                            <Lock className="h-4 w-4" />
                          </button>
                          <span className="text-xs text-gray-400 dark:text-gray-600">Payment Required</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No invoices found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Invoices;


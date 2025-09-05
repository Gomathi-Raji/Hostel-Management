import { useState } from "react";
import { Download, Search, Filter } from "lucide-react";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const invoices = [
    {
      id: 1,
      period: "December 2024",
      amount: "₹12,000",
      dueDate: "2024-12-05",
      paidDate: "2024-12-01",
      status: "Paid"
    },
    {
      id: 2,
      period: "November 2024",
      amount: "₹12,000",
      dueDate: "2024-11-05",
      paidDate: "2024-11-03",
      status: "Paid"
    },
    {
      id: 3,
      period: "October 2024",
      amount: "₹12,000",
      dueDate: "2024-10-05",
      paidDate: null,
      status: "Overdue"
    },
    {
      id: 4,
      period: "September 2024",
      amount: "₹12,000",
      dueDate: "2024-09-05",
      paidDate: null,
      status: "Pending"
    },
    {
      id: 5,
      period: "August 2024",
      amount: "₹12,000",
      dueDate: "2024-08-05",
      paidDate: "2024-08-02",
      status: "Paid"
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "paid":
        return `${baseClasses} bg-status-paid text-status-paid-foreground`;
      case "pending":
        return `${baseClasses} bg-status-pending text-status-pending-foreground`;
      case "overdue":
        return `${baseClasses} bg-status-overdue text-status-overdue-foreground`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleDownloadAll = () => {
    alert("Downloading all invoices...");
  };

  const handleDownloadInvoice = (invoiceId) => {
    alert(`Downloading invoice ${invoiceId}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoice Management</h1>
          <p className="text-muted-foreground mt-2">Track and download your payment invoices</p>
        </div>
        <button
          onClick={handleDownloadAll}
          className="mt-4 sm:mt-0 bg-accent-purple hover:bg-accent-purple/90 text-accent-purple-foreground font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download All</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card shadow-card rounded-lg border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none"
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
      <div className="bg-card shadow-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Paid Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {invoice.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(invoice.status)}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    <button
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No invoices found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Invoices;
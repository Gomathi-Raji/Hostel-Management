import { useState, useEffect } from "react";
import { Download, Search, Filter, Lock } from "lucide-react";
import apiFetch from "@/lib/apiClient";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/payments/tenant/my-payments");
      setInvoices(data.payments || []);
    } catch (err) {
      setError(err.message || "Failed to load invoices");
      console.error("Invoices fetch error:", err);
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

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status?.toLowerCase()) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`;
    }
  };

  const isInvoicePaid = (invoice) => invoice.status?.toLowerCase() === "completed";

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const generateInvoicePDF = (invoice) => {
    const doc = new jsPDF();
    const id = invoice._id?.slice(-8)?.toUpperCase() || "N/A";

    // Header
    doc.setFontSize(20);
    doc.setTextColor(88, 28, 135);
    doc.text("RootnSpace", 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Hostel Management System", 14, 28);

    // Invoice title
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("INVOICE", 150, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`#INV-${id}`, 150, 28);

    // Line
    doc.setDrawColor(200);
    doc.line(14, 34, 196, 34);

    // Details
    doc.setFontSize(11);
    doc.setTextColor(0);
    const y = 44;
    doc.text(`Type:`, 14, y);
    doc.text(invoice.type === "rent" ? "Monthly Rent" : (invoice.type || "N/A"), 60, y);
    doc.text(`Amount:`, 14, y + 8);
    doc.text(formatCurrency(invoice.amount), 60, y + 8);
    doc.text(`Method:`, 14, y + 16);
    doc.text(invoice.method || "N/A", 60, y + 16);
    doc.text(`Status:`, 14, y + 24);
    doc.text(invoice.status || "N/A", 60, y + 24);
    doc.text(`Due Date:`, 14, y + 32);
    doc.text(invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-", 60, y + 32);
    doc.text(`Paid Date:`, 14, y + 40);
    doc.text(invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : "-", 60, y + 40);
    if (invoice.reference) {
      doc.text(`Reference:`, 14, y + 48);
      doc.text(invoice.reference, 60, y + 48);
    }
    if (invoice.notes) {
      doc.text(`Notes:`, 14, y + 56);
      doc.text(invoice.notes.substring(0, 80), 60, y + 56);
    }

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 280);
    doc.text("Thank you for your payment!", 14, 286);

    return doc;
  };

  const handleDownloadAll = () => {
    const paidInvoices = invoices.filter(isInvoicePaid);
    if (paidInvoices.length === 0) {
      alert("No paid invoices available for download.");
      return;
    }
    // Generate a combined PDF with all paid invoices
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("RootnSpace — All Paid Invoices", 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()} | Total: ${paidInvoices.length} invoices`, 14, 30);

    doc.autoTable({
      startY: 38,
      head: [["#", "Type", "Amount", "Method", "Due Date", "Paid Date", "Reference"]],
      body: paidInvoices.map((inv, i) => [
        i + 1,
        inv.type === "rent" ? "Monthly Rent" : (inv.type || "-"),
        formatCurrency(inv.amount),
        inv.method || "-",
        inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-",
        inv.paidAt ? new Date(inv.paidAt).toLocaleDateString() : "-",
        inv.reference || "-",
      ]),
    });

    doc.save("all-invoices.pdf");
  };

  const handleDownloadInvoice = (invoice) => {
    if (!isInvoicePaid(invoice)) {
      alert("Invoice cannot be downloaded. Payment is required first.");
      return;
    }
    const doc = generateInvoicePDF(invoice);
    const id = invoice._id?.slice(-8)?.toUpperCase() || "invoice";
    doc.save(`invoice-${id}.pdf`);
  };

  const paidInvoicesCount = invoices.filter(isInvoicePaid).length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
          <div className="bg-card p-6 rounded-lg border border-border mb-6">
            <div className="h-10 bg-muted rounded mb-4"></div>
          </div>
          <div className="bg-card rounded-lg border border-border">
            <div className="h-12 bg-muted rounded mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded mb-2"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">Error loading invoices</h3>
              <div className="mt-2 text-sm text-destructive/80">{error}</div>
              <button
                onClick={fetchInvoices}
                className="mt-2 px-3 py-1 bg-destructive text-destructive-foreground text-sm rounded hover:bg-destructive/90"
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoice Management</h1>
          <p className="text-muted-foreground mt-2">Track and download your payment invoices</p>
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
      <div className="bg-card shadow-sm rounded-lg border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-card shadow-sm rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Paid Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredInvoices.map((invoice) => {
                const isPaid = isInvoicePaid(invoice);
                return (
                  <tr key={invoice._id} className="hover:bg-muted">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {invoice.type === 'rent' ? 'Monthly Rent' : invoice.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : "-"}
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
                          <Download className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleDownloadInvoice(invoice)}
                            disabled
                            className="text-muted-foreground cursor-not-allowed p-1 rounded"
                            title="Payment required to download"
                          >
                            <Lock className="h-4 w-4" />
                          </button>
                          <span className="text-xs text-muted-foreground">Payment Required</span>
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
          <p className="text-muted-foreground">
            {invoices.length === 0 ? "No invoices found." : "No invoices found matching your criteria."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Invoices;


import React, { useState, useEffect } from "react";
import { Download, FileText, BarChart3, Users, DollarSign, Home, TrendingUp, Activity, RefreshCw } from "lucide-react";
import apiFetch from "@/lib/apiClient";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportsAnalytics = () => {
  const [selectedReport, setSelectedReport] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [keyMetrics, setKeyMetrics] = useState({ totalTenants: 0, occupancyRate: 0, monthlyRevenue: 0, totalRooms: 0, availableRooms: 0, maintenanceRooms: 0, openTickets: 0 });
  const [recentActivity, setRecentActivity] = useState({ newTenants: 0, paymentsReceived: 0, resolvedTickets: 0 });
  const [insights, setInsights] = useState({ revenueGrowth: 0, collectionRate: 0, pendingPayments: 0, pendingAmount: 0 });

  const reportTypes = [
    { value: "overview", label: "Overview Report" },
    { value: "financial", label: "Financial Report" },
    { value: "occupancy", label: "Occupancy Report" },
    { value: "tenant-activity", label: "Tenant Activity" },
    { value: "tenant-data", label: "Tenant Data" },
  ];

  const fetchOverview = async () => {
    try {
      const data = await apiFetch("/reports/overview");
      setKeyMetrics(data.keyMetrics);
      setRecentActivity(data.recentActivity);
      setInsights(data.insights);
    } catch (err) {
      console.error("Overview fetch error:", err);
    }
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/reports/${selectedReport}`);
      setReportData(data);
    } catch (err) {
      console.error("Report fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [selectedReport]);

  const handleExport = (format) => {
    if (!reportData) return;
    const reportLabel = reportTypes.find(t => t.value === selectedReport)?.label || selectedReport;

    if (format === "json") {
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `${selectedReport}-report.json`; a.click();
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      let csv = "";
      if (selectedReport === "tenant-data" && reportData.tenants) {
        csv = "First Name,Last Name,Email,Phone,Room,Move-in Date,Security Deposit,Active\n";
        reportData.tenants.forEach(t => {
          csv += `${t.firstName},${t.lastName || ""},${t.email},${t.phone || ""},${t.room?.number || ""},${t.moveInDate ? new Date(t.moveInDate).toLocaleDateString() : ""},${t.securityDeposit || 0},${t.active}\n`;
        });
      } else if (selectedReport === "financial" && reportData.monthly) {
        csv = "Month,Income,Expense,Profit\n";
        reportData.monthly.forEach(m => { csv += `${m.month},${m.income},${m.expense},${m.profit}\n`; });
      } else {
        csv = JSON.stringify(reportData);
      }
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${selectedReport}-report.csv`; a.click(); URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(reportLabel, 14, 22);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

      if (selectedReport === "financial" && reportData.monthly) {
        doc.autoTable({ startY: 38, head: [["Month", "Income (₹)", "Expense (₹)", "Profit (₹)"]], body: reportData.monthly.map(m => [m.month, m.income.toLocaleString(), m.expense.toLocaleString(), m.profit.toLocaleString()]) });
      } else if (selectedReport === "tenant-data" && reportData.tenants) {
        doc.autoTable({ startY: 38, head: [["Name", "Email", "Phone", "Room", "Active"]], body: reportData.tenants.map(t => [`${t.firstName} ${t.lastName || ""}`, t.email, t.phone || "", t.room?.number || "", t.active ? "Yes" : "No"]) });
      } else if (selectedReport === "occupancy" && reportData.rooms) {
        doc.autoTable({ startY: 38, head: [["Room", "Type", "Status", "Occupancy", "Capacity", "Rent (₹)"]], body: reportData.rooms.map(r => [r.number, r.type, r.status, r.occupancy, r.capacity, r.rent]) });
      } else {
        doc.setFontSize(11);
        doc.text(JSON.stringify(reportData, null, 2).substring(0, 3000), 14, 38);
      }
      doc.save(`${selectedReport}-report.pdf`);
    }
  };

  const renderReportPreview = () => {
    if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
    if (!reportData) return <p className="text-muted-foreground text-center py-6">No data available</p>;

    if (selectedReport === "financial" && reportData.monthly) {
      return (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Monthly Financial Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="text-left py-2 text-foreground">Month</th><th className="text-right py-2 text-foreground">Income</th><th className="text-right py-2 text-foreground">Expense</th><th className="text-right py-2 text-foreground">Profit</th></tr></thead>
              <tbody>{reportData.monthly.map((m, i) => (
                <tr key={i} className="border-b border-border/50"><td className="py-2 text-muted-foreground">{m.month}</td><td className="text-right text-green-600 dark:text-green-400">₹{m.income.toLocaleString()}</td><td className="text-right text-red-600 dark:text-red-400">₹{m.expense.toLocaleString()}</td><td className="text-right text-foreground font-medium">₹{m.profit.toLocaleString()}</td></tr>
              ))}</tbody>
            </table>
          </div>
          {reportData.byMethod?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mt-4 mb-2">Payment Methods (This Month)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {reportData.byMethod.map((m, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground capitalize">{m._id || "N/A"}</p><p className="text-sm font-semibold text-foreground">₹{m.total.toLocaleString()} ({m.count})</p></div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (selectedReport === "occupancy" && reportData.rooms) {
      return (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Room Occupancy Details</h3>
          {reportData.byType && Object.entries(reportData.byType).map(([type, info]) => (
            <div key={type} className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium capitalize text-foreground">{type} Rooms</p>
              <p className="text-sm text-muted-foreground">Total: {info.total} | Occupied: {info.occupied} | Available: {info.available} | Maintenance: {info.maintenance}</p>
              <p className="text-sm text-muted-foreground">Capacity: {info.occupancy}/{info.capacity} ({info.capacity > 0 ? Math.round((info.occupancy / info.capacity) * 100) : 0}%)</p>
            </div>
          ))}
        </div>
      );
    }

    if (selectedReport === "tenant-activity" && reportData.summary) {
      return (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Tenant Activity</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Active</p><p className="text-xl font-bold text-green-600 dark:text-green-400">{reportData.summary.totalActive}</p></div>
            <div className="bg-muted/50 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Inactive</p><p className="text-xl font-bold text-red-600 dark:text-red-400">{reportData.summary.totalInactive}</p></div>
            <div className="bg-muted/50 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">New (Month)</p><p className="text-xl font-bold text-blue-600 dark:text-blue-400">{reportData.summary.newThisMonth}</p></div>
          </div>
          {reportData.recentTenants?.length > 0 && (
            <div className="overflow-x-auto mt-2"><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left py-2 text-foreground">Name</th><th className="text-left py-2 text-foreground">Room</th><th className="text-left py-2 text-foreground">Joined</th></tr></thead><tbody>{reportData.recentTenants.map(t => (
              <tr key={t._id} className="border-b border-border/50"><td className="py-1.5 text-muted-foreground">{t.firstName} {t.lastName || ""}</td><td className="py-1.5 text-muted-foreground">{t.room?.number || "-"}</td><td className="py-1.5 text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</td></tr>
            ))}</tbody></table></div>
          )}
        </div>
      );
    }

    if (selectedReport === "tenant-data" && reportData.tenants) {
      return (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Tenant Directory ({reportData.tenants.length} total)</h3>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left py-2 text-foreground">Name</th><th className="text-left py-2 text-foreground">Email</th><th className="text-left py-2 text-foreground">Room</th><th className="text-left py-2 text-foreground">Status</th></tr></thead><tbody>{reportData.tenants.slice(0, 20).map(t => (
            <tr key={t._id} className="border-b border-border/50"><td className="py-1.5 text-muted-foreground">{t.firstName} {t.lastName || ""}</td><td className="py-1.5 text-muted-foreground">{t.email}</td><td className="py-1.5 text-muted-foreground">{t.room?.number || "-"}</td><td className="py-1.5">{t.active ? <span className="text-green-600 dark:text-green-400">Active</span> : <span className="text-red-600 dark:text-red-400">Inactive</span>}</td></tr>
          ))}</tbody></table></div>
          {reportData.tenants.length > 20 && <p className="text-xs text-muted-foreground">Showing first 20 of {reportData.tenants.length}. Export for full data.</p>}
        </div>
      );
    }

    // Default overview
    return (
      <div className="text-sm text-muted-foreground">
        <p>Overview report loaded. Use the export buttons to download.</p>
      </div>
    );
  };

  const analyticsCards = [
    { title: "Payment Data", description: "Detailed payment analytics and trends", icon: DollarSign, color: "text-primary", action: () => setSelectedReport("financial") },
    { title: "Full Report", description: "Comprehensive RootnSpace management report", icon: FileText, color: "text-accent", action: () => setSelectedReport("tenant-data") },
    { title: "Advanced Analytics", description: "Deep insights and performance metrics", icon: BarChart3, color: "text-secondary", action: () => setSelectedReport("occupancy") },
  ];

  return (
  <div className="p-4 md:p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Reports & Analytics</h1>
  <p className="text-sm md:text-base text-muted-foreground">Generate and export comprehensive reports</p>
      </div>

      {/* Report Selection */}
  <div className="bg-card rounded-lg border border-border shadow p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 md:mt-0">
            <button onClick={() => handleExport("csv")} className="flex-1 sm:flex-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={() => handleExport("pdf")} className="flex-1 sm:flex-auto flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button onClick={() => handleExport("json")} className="flex-1 sm:flex-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="h-4 w-4" /> Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {analyticsCards.map((card, idx) => (
          <div key={idx} onClick={card.action} className="bg-card rounded-lg border border-border shadow p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`h-6 w-6 ${card.color}`} />
              <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">View Details</button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Key Metrics & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        {/* Key Metrics */}
        <div className="bg-card rounded-lg border border-border shadow p-4 md:p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3"><Users className="h-5 w-5 text-blue-600 dark:text-blue-400" /><div><p className="text-sm font-medium text-foreground">Total Tenants</p><p className="text-xs text-muted-foreground">Active residents</p></div></div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{keyMetrics.totalTenants}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3"><Home className="h-5 w-5 text-green-600 dark:text-green-400" /><div><p className="text-sm font-medium text-foreground">Occupancy Rate</p><p className="text-xs text-muted-foreground">Current occupancy</p></div></div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">{keyMetrics.occupancyRate}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center gap-3"><DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" /><div><p className="text-sm font-medium text-foreground">Monthly Revenue</p><p className="text-xs text-muted-foreground">Current month</p></div></div>
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">₹{keyMetrics.monthlyRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-lg border border-border shadow p-4 md:p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3"><TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" /><div><p className="text-sm font-medium text-foreground">New Tenants</p><p className="text-xs text-muted-foreground">This month</p></div></div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{recentActivity.newTenants}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3"><Activity className="h-5 w-5 text-green-600 dark:text-green-400" /><div><p className="text-sm font-medium text-foreground">Payments Received</p><p className="text-xs text-muted-foreground">This month</p></div></div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">{recentActivity.paymentsReceived}</span>
            </div>

            {/* Quick Insights */}
            <div className="border-t border-border pt-3">
              <h3 className="text-sm font-medium text-foreground mb-2">Quick Insights</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Revenue Growth</span><span className="text-blue-600 dark:text-blue-400 font-medium">{insights.revenueGrowth}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Pending Payments</span><span className="text-orange-600 dark:text-orange-400 font-medium">{insights.pendingPayments} (₹{insights.pendingAmount.toLocaleString()})</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Payment Collection</span><span className="text-blue-600 dark:text-blue-400 font-medium">{insights.collectionRate}%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-card rounded-lg border border-border shadow p-4 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Report Preview</h2>
          <button onClick={fetchReport} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"><RefreshCw className="h-4 w-4" /> Refresh</button>
        </div>
        {renderReportPreview()}
      </div>
    </div>
  );
};

export default ReportsAnalytics;
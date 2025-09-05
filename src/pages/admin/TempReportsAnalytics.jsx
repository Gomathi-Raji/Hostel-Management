import React, { useState } from "react";
import { Download, FileText, BarChart3, Users, DollarSign, Home, TrendingUp, Activity } from "lucide-react";

const ReportsAnalytics = () => {
  const [selectedReport, setSelectedReport] = useState("overview");

  // Mock data
  const keyMetrics = {
    totalTenants: 45,
    occupancyRate: 85,
    monthlyRevenue: 675000
  };

  const recentActivity = {
    newTenants: 5,
    paymentsReceived: 38
  };

  const analyticsCards = [
    {
      title: "Payment Data",
      description: "Detailed payment analytics and trends",
      icon: DollarSign,
      color: "text-primary"
    },
    {
      title: "Full Report",
      description: "Comprehensive hostel management report",
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights and performance metrics",
      icon: BarChart3,
      color: "text-secondary"
    }
  ];

  const reportTypes = [
    { value: "overview", label: "Overview Report" },
    { value: "financial", label: "Financial Report" },
    { value: "occupancy", label: "Occupancy Report" },
    { value: "tenant-activity", label: "Tenant Activity" },
    { value: "tenant-data", label: "Tenant Data" }
  ];

  const handleExport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
  };

  return (
    <div className="p-6 bg-datahub-bg min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-reports-primary mb-2">Reports & Analytics</h1>
        <p className="text-admin-content-text">Generate and export comprehensive reports</p>
      </div>

      {/* Report Selection */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => handleExport("csv")}
              className="flex items-center gap-2 bg-reports-primary text-white px-4 py-2 rounded-lg hover:bg-reports-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="flex items-center gap-2 bg-reports-accent text-admin-content-text px-4 py-2 rounded-lg hover:bg-reports-accent/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport("json")}
              className="flex items-center gap-2 bg-reports-primary text-white px-4 py-2 rounded-lg hover:bg-reports-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {analyticsCards.map((card, index) => (
          <div key={index} className="bg-card rounded-lg border border-border shadow-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`h-8 w-8 ${card.color}`} />
              <button className="text-sm text-primary hover:text-primary/80">View Details</button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Metrics Section */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Key Metrics</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Total Tenants</p>
                  <p className="text-xs text-muted-foreground">Active residents</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{keyMetrics.totalTenants}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Home className="h-6 w-6 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Occupancy Rate</p>
                  <p className="text-xs text-muted-foreground">Current occupancy</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-accent">{keyMetrics.occupancyRate}%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Monthly Revenue</p>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-secondary">₹{keyMetrics.monthlyRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activity Summary</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-paid/10 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-paid" />
                <div>
                  <p className="text-sm font-medium text-foreground">New Tenants</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-paid">{recentActivity.newTenants}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-pending/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-pending" />
                <div>
                  <p className="text-sm font-medium text-foreground">Payments Received</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-pending">{recentActivity.paymentsReceived}</span>
            </div>

            {/* Additional Insights */}
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Quick Insights</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revenue Growth</span>
                  <span className="text-paid font-medium">+12.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Occupancy Change</span>
                  <span className="text-paid font-medium">+3.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Collection</span>
                  <span className="text-paid font-medium">94.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Section */}
      <div className="mt-8 bg-card rounded-lg border border-border shadow-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Report Preview</h2>
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            {reportTypes.find(type => type.value === selectedReport)?.label} will be generated here
          </p>
          <p className="text-sm text-muted-foreground">
            Select a report type and click export to generate your report
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
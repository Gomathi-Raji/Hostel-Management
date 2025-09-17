import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Home,
  FileText,
  Clock,
  MessageSquare,
  Download,
} from "lucide-react";

const FormRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Mock form requests data
  const [formRequests, setFormRequests] = useState([
    {
      id: 1,
      type: "Vacating",
      tenantName: "John Doe",
      tenantEmail: "john.doe@email.com",
      roomNumber: "A-101",
      submittedDate: "2024-01-15",
      vacatingDate: "2024-02-15",
      reason: "Job relocation to another city",
      status: "Pending",
      priority: "Medium",
      documents: ["ID Proof", "Room Condition Photos"]
    },
    {
      id: 2,
      type: "Exchange",
      tenantName: "Jane Smith",
      tenantEmail: "jane.smith@email.com",
      roomNumber: "B-205",
      submittedDate: "2024-01-14",
      preferredRoom: "C-301",
      reason: "Need larger room for family visit",
      status: "Approved",
      priority: "Low",
      documents: ["Medical Certificate"]
    },
    {
      id: 3,
      type: "Vacating",
      tenantName: "Mike Johnson",
      tenantEmail: "mike.j@email.com",
      roomNumber: "C-301",
      submittedDate: "2024-01-13",
      vacatingDate: "2024-01-31",
      reason: "Completed studies",
      status: "Rejected",
      priority: "High",
      documents: ["Certificate", "Clearance Form"]
    },
    {
      id: 4,
      type: "Exchange",
      tenantName: "Sarah Wilson",
      tenantEmail: "sarah.w@email.com",
      roomNumber: "D-402",
      submittedDate: "2024-01-12",
      preferredRoom: "A-203",
      reason: "Closer to workspace",
      status: "Pending",
      priority: "High",
      documents: ["Work Certificate"]
    },
    {
      id: 5,
      type: "Vacating",
      tenantName: "David Brown",
      tenantEmail: "david.brown@email.com",
      roomNumber: "B-108",
      submittedDate: "2024-01-11",
      vacatingDate: "2024-03-01",
      reason: "Marriage - moving with spouse",
      status: "Pending",
      priority: "Low",
      documents: ["Marriage Certificate", "Address Proof"]
    }
  ]);

  // Filter requests
  const filteredRequests = formRequests.filter(request => {
    const matchesSearch = 
      request.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    const matchesType = typeFilter === "All" || request.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Update request status
  const updateRequestStatus = (requestId, newStatus) => {
    setFormRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
      "Approved": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400",
      "Rejected": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400"
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const styles = {
      "High": "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
      "Medium": "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400",
      "Low": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
    };
    return styles[priority] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  // Get type icon and color
  const getTypeIcon = (type) => {
    return type === "Vacating" ? 
      <Home className="h-4 w-4" /> : 
      <FileText className="h-4 w-4" />;
  };

  // Get counts
  const requestCounts = {
    total: formRequests.length,
    pending: formRequests.filter(r => r.status === "Pending").length,
    approved: formRequests.filter(r => r.status === "Approved").length,
    rejected: formRequests.filter(r => r.status === "Rejected").length,
    vacating: formRequests.filter(r => r.type === "Vacating").length,
    exchange: formRequests.filter(r => r.type === "Exchange").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Form Requests</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage tenant vacating and room exchange requests
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-blue-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestCounts.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestCounts.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Approved</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestCounts.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <XCircle className="h-6 w-6 text-red-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Rejected</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestCounts.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <Home className="h-6 w-6 text-purple-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Vacating</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestCounts.vacating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-indigo-600" />
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Exchange</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestCounts.exchange}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Search by tenant name, room, or reason..."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="All">All Types</option>
              <option value="Vacating">Vacating</option>
              <option value="Exchange">Exchange</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Form Requests ({filteredRequests.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Request Header */}
                  <div className="flex items-center flex-wrap gap-3 mb-3">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${request.type === "Vacating" ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400" : "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400"}`}>
                      {getTypeIcon(request.type)}
                      <span className="ml-1">{request.type}</span>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityBadge(request.priority)}`}>
                      {request.priority} Priority
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {request.type} Request #{request.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong>Reason:</strong> {request.reason}
                    </p>
                    
                    {/* Tenant and Room Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <User className="h-4 w-4 mr-2" />
                        <span className="font-medium">{request.tenantName}</span>
                        <span className="mx-2">•</span>
                        <span>{request.tenantEmail}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Home className="h-4 w-4 mr-2" />
                        <span>Current Room: <strong>{request.roomNumber}</strong></span>
                        {request.preferredRoom && (
                          <>
                            <span className="mx-2">→</span>
                            <span>Preferred: <strong>{request.preferredRoom}</strong></span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Date Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Submitted: {request.submittedDate}</span>
                      </div>
                      {request.vacatingDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Vacating Date: {request.vacatingDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Documents */}
                    {request.documents && request.documents.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <strong>Documents:</strong>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {request.documents.map((doc, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 ml-4">
                  {/* Status Dropdown */}
                  <select
                    value={request.status}
                    onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {/* Action Buttons */}
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                    title="Send Message"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                    title="Download Documents"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No form requests found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormRequests;
import React, { useState } from "react";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Eye,
  MessageSquare,
  Settings,
  Mail,
  Phone,
  Tag,
  TrendingUp,
} from "lucide-react";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      user: "John Doe",
      userEmail: "john.doe@email.com",
      userPhone: "+1 234-567-8901",
      subject: "WiFi not working in Room A-101",
      description:
        "The WiFi connection has been unstable for the past 3 days. Unable to connect any devices. This is affecting my work from home setup.",
      status: "Open",
      priority: "High",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      category: "Technical",
      room: "A-101",
    },
    {
      id: 2,
      user: "Jane Smith",
      userEmail: "jane.smith@email.com",
      userPhone: "+1 234-567-8902",
      subject: "Payment issue with monthly rent",
      description:
        "Payment was deducted from my bank account but not reflected in the hostel account. Need immediate assistance to resolve this billing discrepancy.",
      status: "In Progress",
      priority: "Medium",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-16",
      category: "Payment",
      room: "B-205",
    },
    {
      id: 3,
      user: "Mike Johnson",
      userEmail: "mike.j@email.com",
      userPhone: "+1 234-567-8903",
      subject: "Room maintenance - Broken AC",
      description:
        "Air conditioning unit is not working properly. Room temperature is uncomfortable, especially during hot weather. Need urgent repair.",
      status: "Resolved",
      priority: "High",
      createdAt: "2024-01-13",
      updatedAt: "2024-01-17",
      category: "Maintenance",
      room: "C-301",
    },
    {
      id: 4,
      user: "Sarah Wilson",
      userEmail: "sarah.w@email.com",
      userPhone: "+1 234-567-8904",
      subject: "Noise complaint from neighbors",
      description:
        "Continuous loud music and disturbance during night hours from adjacent room. Need mediation to resolve this ongoing issue.",
      status: "Open",
      priority: "Low",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
      category: "Complaint",
      room: "A-203",
    },
    {
      id: 5,
      user: "David Brown",
      userEmail: "david.brown@email.com",
      userPhone: "+1 234-567-8905",
      subject: "Key card not working",
      description:
        "Room key card stopped working yesterday evening. Cannot access the room. Currently staying with a friend but need immediate resolution.",
      status: "In Progress",
      priority: "High",
      createdAt: "2024-01-11",
      updatedAt: "2024-01-16",
      category: "Security",
      room: "B-108",
    },
    {
      id: 6,
      user: "Emma Davis",
      userEmail: "emma.davis@email.com",
      userPhone: "+1 234-567-8906",
      subject: "Hot water not available",
      description:
        "No hot water in the bathroom for the past 2 days. This is making daily routines very difficult, especially during cold weather.",
      status: "Open",
      priority: "Medium",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
      category: "Plumbing",
      room: "D-402",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === "All" || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] }
          : ticket
      )
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      Open: "bg-red-100 text-red-800 border-red-200",
      "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Resolved: "bg-green-100 text-green-800 border-green-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      High: "bg-red-50 text-red-700 border-red-200",
      Medium: "bg-orange-50 text-orange-700 border-orange-200",
      Low: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return styles[priority] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <AlertTriangle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "technical":
        return <Settings className="h-4 w-4" />;
      case "payment":
        return <TrendingUp className="h-4 w-4" />;
      case "maintenance":
        return <Settings className="h-4 w-4" />;
      case "complaint":
        return <MessageSquare className="h-4 w-4" />;
      case "security":
        return <Eye className="h-4 w-4" />;
      case "plumbing":
        return <Settings className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const ticketCounts = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    inProgress: tickets.filter((t) => t.status === "In Progress").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
  };

  const categories = [...new Set(tickets.map((t) => t.category))];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticket Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and resolve tenant support tickets
          </p>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Settings className="h-4 w-4 inline" />
            Ticket Settings
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tickets", value: ticketCounts.total, icon: <AlertTriangle className="h-8 w-8 text-blue-600" /> },
          { label: "Open", value: ticketCounts.open, icon: <AlertTriangle className="h-8 w-8 text-red-600" /> },
          { label: "In Progress", value: ticketCounts.inProgress, icon: <Clock className="h-8 w-8 text-yellow-600" /> },
          { label: "Resolved", value: ticketCounts.resolved, icon: <CheckCircle className="h-8 w-8 text-green-600" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex items-center gap-4">
            <div className="flex-shrink-0">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Search by subject, user, or room..."
          />
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <div className="divide-y divide-gray-200">
          {filteredTickets.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
              <p>No tickets found</p>
            </div>
          )}
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                      ticket.status
                    )}`}
                  >
                    {getStatusIcon(ticket.status)}
                    <span className="ml-1">{ticket.status}</span>
                  </div>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {getCategoryIcon(ticket.category)}
                    <span className="ml-1">{ticket.category}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  #{ticket.id} - {ticket.subject}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{ticket.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{ticket.userEmail}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{ticket.userPhone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>{ticket.room}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={ticket.status}
                  onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;

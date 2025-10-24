import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import RaiseTicketModal from "../components/RaiseTicketModal";
import apiFetch from "@/lib/apiClient";

const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/tickets/tenant/my-tickets");
      setTickets(data);
    } catch (err) {
      setError(err.message || "Failed to load tickets");
      console.error("Tickets fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status?.toLowerCase()) {
      case "in_progress":
        return `${baseClasses} bg-blue-500 text-white`;
      case "open":
        return `${baseClasses} bg-gray-500 text-white`;
      case "resolved":
        return `${baseClasses} bg-green-500 text-white`;
      case "closed":
        return `${baseClasses} bg-gray-400 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (priority?.toLowerCase()) {
      case "high":
        return `${baseClasses} bg-red-500 text-white`;
      case "medium":
        return `${baseClasses} bg-yellow-500 text-white`;
      case "low":
        return `${baseClasses} bg-green-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      await apiFetch("/tickets", {
        method: "POST",
        body: ticketData
      });
      setIsModalOpen(false);
      // Refresh tickets list
      fetchTickets();
    } catch (err) {
      console.error("Ticket creation error:", err);
      alert("Failed to create ticket. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card p-6 rounded-lg border border-border">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading tickets</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <button
                onClick={fetchTickets}
                className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
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
          <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground mt-2">Manage your support requests and issues</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 bg-accent-purple hover:bg-accent-purple/90 text-accent-purple-foreground font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Raise New Ticket</span>
        </button>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="bg-card shadow-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                {ticket.title}
              </h3>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {ticket.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={getStatusBadge(ticket.status)}>
                {ticket.status?.replace('_', ' ')}
              </span>
              <span className={getPriorityBadge(ticket.priority)}>
                {ticket.priority} Priority
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-muted rounded text-xs">
                {ticket.category}
              </span>
              <span>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No tickets found.</p>
          <p className="text-muted-foreground text-sm mt-2">
            Create your first support ticket by clicking the "Raise New Ticket" button.
          </p>
        </div>
      )}

      {/* Raise Ticket Modal */}
      <RaiseTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
};

export default Tickets;
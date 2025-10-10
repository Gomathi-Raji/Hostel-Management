import { useState } from "react";
import { Plus } from "lucide-react";
import RaiseTicketModal from "../components/RaiseTicketModal";

const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tickets = [];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "in-progress":
        return `${baseClasses} bg-blue-500 text-white`;
      case "open":
        return `${baseClasses} bg-gray-500 text-white`;
      case "resolved":
        return `${baseClasses} bg-status-paid text-status-paid-foreground`;
      case "closed":
        return `${baseClasses} bg-gray-400 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (priority.toLowerCase()) {
      case "high":
        return `${baseClasses} bg-priority-high text-priority-high-foreground`;
      case "medium":
        return `${baseClasses} bg-priority-medium text-priority-medium-foreground`;
      case "low":
        return `${baseClasses} bg-priority-low text-priority-low-foreground`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const handleCreateTicket = (ticketData) => {
    console.log("Creating ticket:", ticketData);
    // Here you would typically send the data to your backend
    setIsModalOpen(false);
  };

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
          <div key={ticket.id} className="bg-card shadow-card rounded-lg border border-border p-6">
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
                {ticket.status}
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
                {new Date(ticket.createdDate).toLocaleDateString()}
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
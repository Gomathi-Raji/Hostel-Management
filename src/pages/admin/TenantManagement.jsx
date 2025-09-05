import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2, X } from 'lucide-react';
import AddTenantModal from '../../components/AddTenantModal';

const TenantManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomAssignment: "",
    moveInDate: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    securityDeposit: ""
  });

  // Mock data
  const tenants = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 9876543210",
      room: "A-101",
      moveInDate: "2024-01-15",
      status: "Active",
      securityDeposit: 15000
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+91 9876543211",
      room: "B-205",
      moveInDate: "2024-01-20",
      status: "Active",
      securityDeposit: 15000
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+91 9876543212",
      room: "C-301",
      moveInDate: "2023-12-10",
      status: "Vacated",
      securityDeposit: 15000
    }
  ];

  const rooms = ["A-101", "A-102", "A-103", "B-201", "B-202", "B-203", "C-301", "C-302"];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setShowAddModal(false);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      roomAssignment: "",
      moveInDate: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      securityDeposit: ""
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Active":
        return `${baseClasses} bg-paid text-paid-foreground`;
      case "Vacated":
        return `${baseClasses} bg-muted text-muted-foreground`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || tenant.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-datahub-bg min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-tenant-primary">Tenant Management</h1>
          <p className="text-admin-content-text">Manage your hostel tenants</p>
        </div>
        <div className="flex gap-4">
          {/* Export Button */}
           <button
             onClick={() => console.log("Exporting data...")}
             className="flex items-center gap-2 bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-200 hover:bg-green-600 hover:text-white hover:border-green-600"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
            
       
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        ><Plus className="h-4 w-4" />
          Add Tenant
        </button>
    </div>
  </div>

        {/* Search & Filter Bar */}
        <div className="bg-tenant-card-bg rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-content-text/60 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Name, Email, or Room"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-tenant-primary/20 rounded-lg bg-white text-admin-content-text focus:outline-none focus:ring-2 focus:ring-tenant-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-content-text/60 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-tenant-primary/20 rounded-lg bg-white text-admin-content-text focus:outline-none focus:ring-2 focus:ring-tenant-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="vacated">Vacated</option>
            </select>
          </div>
        </div>
      </div>

        {/* Tenant List Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Phone</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Room</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Move-in Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 text-sm font-medium text-foreground">{tenant.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{tenant.email}</td>
                    <td className="p-4 text-sm text-muted-foreground">{tenant.phone}</td>
                    <td className="p-4 text-sm text-foreground">{tenant.room}</td>
                    <td className="p-4 text-sm text-muted-foreground">{tenant.moveInDate}</td>
                    <td className="p-4">
                      <span className={getStatusBadge(tenant.status)}>{tenant.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-muted-foreground hover:text-primary">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-muted-foreground hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-muted-foreground hover:text-overdue">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-muted-foreground">
                    {searchTerm || filterStatus !== "all" ? "No tenants found matching your criteria." : "No tenants available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Tenant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-form-bg rounded-lg border border-form-primary/20 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-form-primary/20 bg-white rounded-t-lg">
              <h2 className="text-xl font-semibold text-form-primary">Add New Tenant</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-admin-content-text/60 hover:text-admin-content-text"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-form-primary mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-form-primary rounded-lg bg-white text-admin-content-text focus:outline-none focus:ring-2 focus:ring-form-accent focus:border-form-accent transition-colors hover:border-form-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Room Assignment</label>
                <select
                  name="roomAssignment"
                  value={formData.roomAssignment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Move-in Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Emergency Contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Relationship</label>
                    <input
                      type="text"
                      name="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleInputChange}
                      placeholder="e.g., Father, Mother, Guardian"
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Security Deposit</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  placeholder="15000"
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Tenant
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
    </div>
  );
};

export default TenantManagement;
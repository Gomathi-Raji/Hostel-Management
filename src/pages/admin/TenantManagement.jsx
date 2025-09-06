import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2, X } from 'lucide-react';

const TenantManagement = () => {
  const [tenants, setTenants] = useState([
    { id: 1, name: "John Doe", email: "john.doe@email.com", phone: "+91 9876543210", room: "A-101", moveInDate: "2024-01-15", status: "Active", securityDeposit: 15000 },
    { id: 2, name: "Jane Smith", email: "jane.smith@email.com", phone: "+91 9876543211", room: "B-205", moveInDate: "2024-01-20", status: "Active", securityDeposit: 15000 },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@email.com", phone: "+91 9876543212", room: "C-301", moveInDate: "2023-12-10", status: "Vacated", securityDeposit: 15000 }
  ]);

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

  const rooms = ["A-101", "A-102", "A-103", "B-201", "B-202", "B-203", "C-301", "C-302"];

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTenant = {
      id: tenants.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      room: formData.roomAssignment,
      moveInDate: formData.moveInDate,
      status: "Active",
      securityDeposit: formData.securityDeposit
    };
    setTenants([...tenants, newTenant]);
    setShowAddModal(false);
    setFormData({
      firstName: "", lastName: "", email: "", phone: "", roomAssignment: "", moveInDate: "",
      emergencyContactName: "", emergencyContactRelationship: "", emergencyContactPhone: "", securityDeposit: ""
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    return status === "Active" ? `${baseClasses} bg-green-100 text-green-800` : `${baseClasses} bg-gray-100 text-gray-500`;
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || tenant.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tenant Management</h1>
          <p className="text-gray-600">Manage your hostel tenants</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" /> Add Tenant
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 md:mb-6 flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by Name, Email, or Room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="vacated">Vacated</option>
          </select>
        </div>
      </div>

      {/* Tenant Cards */}
      <div className="flex flex-col gap-4">
        {filteredTenants.length > 0 ? filteredTenants.map(tenant => (
          <div key={tenant.id} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{tenant.name}</p>
              <p className="text-gray-600 text-sm">{tenant.email}</p>
              <p className="text-gray-600 text-sm">{tenant.phone}</p>
              <p className="text-gray-800 text-sm">{tenant.room} | Move-in: {tenant.moveInDate}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className={getStatusBadge(tenant.status)}>{tenant.status}</span>
              <button className="p-1 text-gray-500 hover:text-blue-500"><Eye className="h-4 w-4" /></button>
              <button className="p-1 text-gray-500 hover:text-blue-500"><Edit className="h-4 w-4" /></button>
              <button className="p-1 text-gray-500 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500 p-4">No tenants found.</p>
        )}
      </div>

      {/* Add Tenant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Add New Tenant</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
              </div>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
              <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
              <select name="roomAssignment" value={formData.roomAssignment} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Room</option>
                {rooms.map(room => <option key={room} value={room}>{room}</option>)}
              </select>
              <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />

              <h3 className="font-medium text-gray-800 mt-2">Emergency Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="emergencyContactName" placeholder="Contact Name" value={formData.emergencyContactName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                <input type="text" name="emergencyContactRelationship" placeholder="Relationship" value={formData.emergencyContactRelationship} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
              </div>
              <input type="tel" name="emergencyContactPhone" placeholder="Emergency Contact Phone" value={formData.emergencyContactPhone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
              <input type="number" name="securityDeposit" placeholder="Security Deposit" value={formData.securityDeposit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />

              <div className="flex flex-col sm:flex-row gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Add Tenant</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantManagement;



import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2, X } from 'lucide-react';
import apiFetch from '@/lib/apiClient';

const TenantManagement = () => {
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadharNumber: "",
    roomAssignment: "",
    moveInDate: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    securityDeposit: ""
  });

  const [errors, setErrors] = useState({});

  // Load tenants and rooms on component mount
  useEffect(() => {
    loadTenants();
    loadRooms();
  }, []);

  const loadTenants = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/tenants');
      setTenants(response.tenants || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load tenants');
      console.error('Error loading tenants:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRooms = async () => {
    try {
      const response = await apiFetch('/rooms');
      setRooms(response.rooms || []);
    } catch (err) {
      console.error('Error loading rooms:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // ✅ Validation for required fields
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.aadharNumber.trim()) newErrors.aadharNumber = "Aadhaar is required";
    if (!formData.roomAssignment.trim()) newErrors.roomAssignment = "Room selection is required";
    if (!formData.moveInDate.trim()) newErrors.moveInDate = "Move-in date is required";
    if (!formData.securityDeposit.trim()) newErrors.securityDeposit = "Security Deposit is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop form submission if there are errors
    }

    try {
      const tenantData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        aadharNumber: formData.aadharNumber,
        room: formData.roomAssignment, // This is now the room ID
        moveInDate: formData.moveInDate,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactRelationship: formData.emergencyContactRelationship,
        emergencyContactPhone: formData.emergencyContactPhone,
        securityDeposit: parseFloat(formData.securityDeposit)
      };

      await apiFetch('/tenants', {
        method: 'POST',
        body: tenantData
      });

      alert('Tenant added successfully!');
      setShowAddModal(false);
      resetForm();
      loadTenants(); // Reload the tenants list
      loadRooms(); // Reload available rooms
    } catch (err) {
      console.error('Error adding tenant:', err);
      alert(err.message || 'Failed to add tenant');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      aadharNumber: "",
      roomAssignment: "",
      moveInDate: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      securityDeposit: ""
    });
    setErrors({});
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    return status === "Active" ? `${baseClasses} bg-green-100 text-green-800` : `${baseClasses} bg-gray-100 text-gray-500`;
  };

  const filteredTenants = tenants.filter(tenant => {
    const fullName = `${tenant.firstName} ${tenant.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tenant.room?.number || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" ||
      (filterStatus === "active" && tenant.active) ||
      (filterStatus === "vacated" && !tenant.active);
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
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
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
        {loading ? (
          <p className="text-center text-gray-500 p-4">Loading tenants...</p>
        ) : error ? (
          <p className="text-center text-red-500 p-4">{error}</p>
        ) : filteredTenants.length > 0 ? filteredTenants.map(tenant => (
          <div key={tenant._id} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{tenant.firstName} {tenant.lastName}</p>
              <p className="text-gray-600 text-sm">{tenant.email}</p>
              <p className="text-gray-600 text-sm">{tenant.phone}</p>
              <p className="text-gray-600 text-sm">Aadhaar: {tenant.aadharNumber}</p>
              <p className="text-gray-800 text-sm">{tenant.room?.number || 'No room assigned'} | Move-in: {tenant.moveInDate ? new Date(tenant.moveInDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className={getStatusBadge(tenant.active ? "Active" : "Inactive")}>{tenant.active ? "Active" : "Inactive"}</span>
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
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-700 font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="10"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Aadhaar */}
              <div>
                <label className="text-gray-700 font-medium">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadharNumber"
                  maxLength="12"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.aadharNumber ? "border-red-500" : ""}`}
                />
                {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
              </div>

              {/* Room & Move-in */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-medium">
                    Room Assignment <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="roomAssignment"
                    value={formData.roomAssignment}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.roomAssignment ? "border-red-500" : ""}`}
                  >
                    <option value="">Select Room</option>
                    {rooms.filter(room => room.status === 'available').map(room => (
                      <option key={room._id} value={room._id}>{room.number}</option>
                    ))}
                  </select>
                  {errors.roomAssignment && <p className="text-red-500 text-xs mt-1">{errors.roomAssignment}</p>}
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Move-in Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.moveInDate ? "border-red-500" : ""}`}
                  />
                  {errors.moveInDate && <p className="text-red-500 text-xs mt-1">{errors.moveInDate}</p>}
                </div>
              </div>

              {/* Emergency Contact - Optional */}
              <h3 className="font-medium text-gray-800 mt-2">Emergency Contact (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="emergencyContactName"
                  placeholder="Contact Name"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="emergencyContactRelationship"
                  placeholder="Relationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="tel"
                name="emergencyContactPhone"
                placeholder="Emergency Contact Phone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {/* Security Deposit */}
              <div>
                <label className="text-gray-700 font-medium">
                  Security Deposit <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.securityDeposit ? "border-red-500" : ""}`}
                />
                {errors.securityDeposit && <p className="text-red-500 text-xs mt-1">{errors.securityDeposit}</p>}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Tenant
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
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






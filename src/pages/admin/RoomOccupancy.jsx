import React, { useState, useEffect } from "react";
import {
  Home,
  Plus,
  Search,
  Users,
  Wrench,
  X,
} from "lucide-react";
import apiFetch from '@/lib/apiClient';

const RoomOccupancy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    rentAmount: "",
    status: "available",
  });

  const roomTypes = ["Single", "Shared", "Deluxe"];

  // Load rooms on component mount
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/rooms');
      setRooms(response.rooms || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load rooms');
      console.error('Error loading rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "occupied":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
      case "available":
        return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-300`;
      case "maintenance":
        return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-300`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "occupied":
        return <Users className="h-4 w-4" />;
      case "available":
        return <Home className="h-4 w-4" />;
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      const roomData = {
        number: formData.roomNumber,
        type: formData.roomType,
        capacity: parseInt(formData.capacity),
        rentAmount: parseFloat(formData.rentAmount),
        status: formData.status,
      };

      await apiFetch('/rooms', {
        method: 'POST',
        body: roomData
      });

      alert('Room added successfully!');
      setShowModal(false);
      resetForm();
      loadRooms(); // Reload the rooms list
    } catch (err) {
      console.error('Error adding room:', err);
      alert(err.message || 'Failed to add room');
    }
  };

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      roomType: "",
      capacity: "",
      rentAmount: "",
      status: "available",
    });
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.tenants &&
        room.tenants.some((tenant) =>
          tenant.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const matchesStatus =
      statusFilter === "all" ||
      room.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType =
      typeFilter === "all" ||
      room.type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 bg-datahub-bg min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-room-primary">
            Room Occupancy
          </h1>
          <p className="text-admin-content-text mt-2">
            Manage room availability and assignments
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Room
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Room Number, Floor, or Tenant"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {roomTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading rooms...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-lg border shadow hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(room.status)}
                    <h3 className="text-lg font-semibold">{room.number}</h3>
                  </div>
                  <span className={getStatusBadge(room.status)}>
                    {room.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Type:</span>
                    <span>{room.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Capacity:</span>
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rent:</span>
                    <span>₹{room.rentAmount ? room.rentAmount.toLocaleString() : 'N/A'}</span>
                  </div>
                  {room.tenants && room.tenants.length > 0 && (
                    <div className="flex flex-col text-sm">
                      <span>Tenants:</span>
                      <ul className="list-disc list-inside">
                        {room.tenants.map((tenant, i) => (
                          <li key={i}>{tenant}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No rooms found.</p>
      )}

      {/* Add Room Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 hover:bg-gray-200 rounded-full p-1"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
            <form onSubmit={handleAddRoom} className="space-y-4">
              {/* Room Number */}
              <label className="block text-sm font-medium">
                Room Number <span className="text-red-500">*</span>
              </label>
              <input
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                placeholder="Room Number"
                required
                className="w-full border px-3 py-2 rounded-lg"
              />

              {/* Room Type */}
              <label className="block text-sm font-medium">
                Room Type <span className="text-red-500">*</span>
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">Select Type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Capacity */}
              <label className="block text-sm font-medium">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder="Room Capacity"
                required
                className="w-full border px-3 py-2 rounded-lg"
              />

              {/* Rent Amount */}
              <label className="block text-sm font-medium">
                Rent Amount <span className="text-red-500">*</span>
              </label>
              <input
                name="rentAmount"
                type="number"
                value={formData.rentAmount}
                onChange={handleInputChange}
                placeholder="Rent Amount"
                required
                className="w-full border px-3 py-2 rounded-lg"
              />

              {/* Status */}
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomOccupancy;

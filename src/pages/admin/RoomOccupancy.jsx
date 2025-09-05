import React, { useState } from "react";
import { Home, Plus, Search, Filter, Edit, Trash2, Users, Wrench } from "lucide-react";

const RoomOccupancy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data
  const roomStats = {
    totalRooms: 60,
    availableRooms: 15,
    occupiedRooms: 40,
    maintenanceRooms: 5,
    occupancyRate: 75
  };

  const rooms = [
    {
      id: 1,
      roomNumber: "A-101",
      floor: "A",
      type: "Single",
      status: "Occupied",
      tenant: "John Doe",
      rentAmount: 15000,
      moveInDate: "2024-01-15"
    },
    {
      id: 2,
      roomNumber: "A-102",
      floor: "A", 
      type: "Single",
      status: "Vacant",
      tenant: null,
      rentAmount: 15000,
      moveInDate: null
    },
    {
      id: 3,
      roomNumber: "B-201",
      floor: "B",
      type: "Shared",
      status: "Occupied",
      tenant: "Jane Smith",
      rentAmount: 12000,
      moveInDate: "2024-01-20"
    },
    {
      id: 4,
      roomNumber: "B-202",
      floor: "B",
      type: "Shared",
      status: "Maintenance",
      tenant: null,
      rentAmount: 12000,
      moveInDate: null
    },
    {
      id: 5,
      roomNumber: "C-301",
      floor: "C",
      type: "Deluxe",
      status: "Occupied",
      tenant: "Mike Johnson",
      rentAmount: 18000,
      moveInDate: "2023-12-10"
    }
  ];

  const roomTypes = ["Single", "Shared", "Deluxe"];

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Occupied":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
      case "Vacant":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
      case "Maintenance":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
      default:
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Occupied":
        return <Users className="h-4 w-4" />;
      case "Vacant":
        return <Home className="h-4 w-4" />;
      case "Maintenance":
        return <Wrench className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.tenant && room.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || room.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || room.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 bg-datahub-bg min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-room-primary">Room Occupancy</h1>
        <p className="text-admin-content-text mt-2">Manage room availability and assignments</p>
      </div>
      
      {/* Header Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-admin-content-text/70">Total Rooms</p>
              <p className="text-2xl font-bold text-room-primary">{roomStats.totalRooms}</p>
            </div>
            <div className="bg-room-primary/10 p-3 rounded-lg">
              <Home className="h-6 w-6 text-room-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-admin-content-text/70">Available</p>
              <p className="text-2xl font-bold text-room-accent">{roomStats.availableRooms}</p>
            </div>
            <div className="bg-room-accent/10 p-3 rounded-lg">
              <Home className="h-6 w-6 text-room-accent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-admin-content-text/70">Occupied</p>
              <p className="text-2xl font-bold text-room-primary">{roomStats.occupiedRooms}</p>
            </div>
            <div className="bg-room-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-room-primary" />
            </div>
          </div>
        
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-admin-content-text/70">Maintenance</p>
              <p className="text-2xl font-bold text-payment-warning">{roomStats.maintenanceRooms}</p>
            </div>
            <div className="bg-payment-warning/10 p-3 rounded-lg">
              <Wrench className="h-6 w-6 text-payment-warning" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-admin-content-text/70">Occupancy Rate</p>
              <p className="text-2xl font-bold text-room-primary">{roomStats.occupancyRate}%</p>
            </div>
            <div className="bg-room-primary/10 p-3 rounded-lg">
              <Home className="h-6 w-6 text-room-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Room Occupancy</h1>
          <p className="text-muted-foreground">Manage room availability and assignments</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Add Room
        </button>
      </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Room Number, Floor, or Tenant"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Types</option>
              {roomTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-card rounded-lg border border-border shadow-card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(room.status)}
                    <h3 className="text-lg font-semibold text-foreground">{room.roomNumber}</h3>
                  </div>
                  <span className={getStatusBadge(room.status)}>{room.status}</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Floor:</span>
                    <span className="text-foreground">{room.floor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-foreground">{room.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rent:</span>
                    <span className="text-foreground">₹{room.rentAmount.toLocaleString()}</span>
                  </div>
                  {room.tenant && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tenant:</span>
                        <span className="text-foreground font-medium">{room.tenant}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Move-in:</span>
                        <span className="text-foreground">{room.moveInDate}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button className="ml-auto text-sm text-red-500 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-card rounded-lg border border-border shadow-card p-12 text-center">
          <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No rooms found</h2>
          <p className="text-muted-foreground mb-6">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all" 
              ? "No rooms match your current filters." 
              : "Get started by adding your first room."}
          </p>
          {(!searchTerm && statusFilter === "all" && typeFilter === "all") && (
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors mx-auto">
              <Plus className="h-4 w-4" />
              Add First Room
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomOccupancy;
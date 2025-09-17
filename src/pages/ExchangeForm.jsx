import React, { useState } from "react"; 
import { ArrowRightLeft, Home, Calendar, User, Phone, Mail, FileText } from "lucide-react";

const ExchangeForm = () => {
  const [formData, setFormData] = useState({
    currentRoom: "",
    desiredRoom: "",
    reason: "",
    preferredDate: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    additionalNotes: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exchange Form Data:", formData);
    alert("Exchange form submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <ArrowRightLeft className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-foreground">Room Exchange Form</h1>
        </div>
        <p className="text-muted-foreground">
          Submit a request to exchange your current room with another available room.
        </p>
      </div>

      {/* Form */}
      <div className="bg-card shadow-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Exchange Request Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Room Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="currentRoom" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Current Room Number <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="text"
                id="currentRoom"
                name="currentRoom"
                value={formData.currentRoom}
                onChange={handleInputChange}
                placeholder="e.g., A-101"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="desiredRoom" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Desired Room Number <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="text"
                id="desiredRoom"
                name="desiredRoom"
                value={formData.desiredRoom}
                onChange={handleInputChange}
                placeholder="e.g., B-205"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Your phone number"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address <span className="text-red-500">*</span></span>
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Preferred Exchange Date <span className="text-red-500">*</span></span>
              </div>
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Reason for Exchange */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Reason for Room Exchange <span className="text-red-500">*</span></span>
              </div>
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a reason</option>
              <option value="roommate-compatibility">Roommate Compatibility Issues</option>
              <option value="noise-issues">Noise Issues</option>
              <option value="room-condition">Room Condition Problems</option>
              <option value="location-preference">Location Preference</option>
              <option value="medical-reasons">Medical Reasons</option>
              <option value="academic-needs">Academic Needs</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-foreground mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              rows="4"
              placeholder="Any additional information you'd like to provide..."
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Important Information:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Room exchange requests are subject to availability and approval</li>
              <li>• Processing time is typically 5-7 business days</li>
              <li>• You will be notified via email about the status of your request</li>
              <li>• Additional charges may apply for room differences</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-input rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Exchange Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExchangeForm;

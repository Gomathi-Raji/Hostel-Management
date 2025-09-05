import { useState } from "react";
import { Calendar } from "lucide-react";

const VacatingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "John Smith", // Pre-filled
    roomNumber: "101", // Pre-filled
    vacatingDate: "",
    reason: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting vacating request:", formData);
    // Here you would typically send the data to your backend
    alert("Vacating request submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Vacating Form</h1>
        <p className="text-muted-foreground mt-2">
          Submit your hostel vacation request with the required details
        </p>
      </div>

      {/* Form */}
      <div className="bg-card shadow-card rounded-lg border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium text-foreground mb-2">
              Room Number *
            </label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="vacatingDate" className="block text-sm font-medium text-foreground mb-2">
              Intended Vacating Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                id="vacatingDate"
                name="vacatingDate"
                value={formData.vacatingDate}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-2">
              Reason for Vacating *
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Please provide the reason for vacating the hostel (e.g., course completion, job relocation, personal reasons, etc.)"
              rows={5}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-mustard-orange hover:bg-mustard-orange/90 text-mustard-orange-foreground font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-mustard-orange focus:ring-offset-2"
            >
              Submit Request
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-light-green rounded-lg">
          <h3 className="text-sm font-medium text-light-green-foreground mb-2">
            Important Information:
          </h3>
          <ul className="text-sm text-light-green-foreground space-y-1">
            <li>• Please submit this form at least 30 days before your intended vacating date</li>
            <li>• Ensure all dues are cleared before vacating</li>
            <li>• Room inspection will be scheduled within 7 days of your vacating date</li>
            <li>• Security deposit will be refunded after successful room inspection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VacatingForm;
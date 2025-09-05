import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUserType }) => {
  const [activeTab, setActiveTab] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setUserType(activeTab);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        {/* Tab Selection */}
        <div className="flex mb-8 bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "user"
                ? "bg-light-green text-light-green-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "admin"
                ? "bg-light-green text-light-green-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-card shadow-card rounded-lg p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-foreground mb-2">
                Number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Your registered number"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-mustard-orange hover:bg-mustard-orange/90 text-mustard-orange-foreground font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-mustard-orange focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

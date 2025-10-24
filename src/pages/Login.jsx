import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import apiFetch, { setToken } from "@/lib/apiClient";

const Login = ({ setIsAuthenticated, setUserType }) => {
  const [activeTab, setActiveTab] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend login
    (async () => {
      try {
        const payload = { email: formData.email, password: formData.password };
        const res = await apiFetch("/auth/login", { method: "POST", body: payload });
        // save token and update app state
        if (res.token) {
          setToken(res.token);
        }
        setUserType(activeTab);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
        alert(err?.message || "Login failed");
      }
    })();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTabChange = (tabType) => {
    console.log("🔄 Tab changed to:", tabType); // DEBUG LOG
    setActiveTab(tabType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        {/* Tab Selection */}
        <div className="flex mb-8 bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleTabChange("user")}
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
            onClick={() => handleTabChange("admin")}
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
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Login as {activeTab === "admin" ? "Administrator" : "User"}
            </h2>
            <p className="text-sm text-center text-muted-foreground mt-2">
              {activeTab === "admin" ? "Access admin panel" : "Access your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email Address"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 pr-10 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeTab === "admin"
                  ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                  : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
              }`}
            >
              Login as {activeTab === "admin" ? "Administrator" : "User"}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import {
  User,
  Lock,
  Palette,
  Bell,
  Save,
  X,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState("light");

  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@datahubpro.com",
    role: "Property Administrator",
    phone: "+91 98765 43210",
    organization: "DataHub Pro",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newTenants: true,
      paymentReminders: true,
      maintenanceRequests: true,
      systemUpdates: false,
    },
    appNotifications: {
      pushNotifications: true,
      soundAlerts: true,
      desktopNotifications: false,
    },
  });

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "theme", label: "Theme Preference", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (category, setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [category]: {
        ...notificationSettings[category],
        [setting]: !notificationSettings[category][setting],
      },
    });
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSaveNotifications = () => {
    alert("Notification settings updated successfully!");
  };

  const handleSaveTheme = () => {
    alert("Theme preference updated successfully!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and system settings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white font-medium shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-600">
                    Profile Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["firstName", "lastName", "email", "phone", "organization"].map(
                    (field, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={profileData[field]}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-600">
                    Change Password
                  </h2>
                </div>

                <div className="max-w-md space-y-6">
                  {["currentPassword", "newPassword", "confirmPassword"].map(
                    (field, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <div className="relative">
                          <input
                            type={
                              (field === "currentPassword" && showCurrentPassword) ||
                              (field === "newPassword" && showNewPassword) ||
                              (field === "confirmPassword" && showConfirmPassword)
                                ? "text"
                                : "password"
                            }
                            name={field}
                            value={passwordData[field]}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (field === "currentPassword")
                                setShowCurrentPassword(!showCurrentPassword);
                              else if (field === "newPassword")
                                setShowNewPassword(!showNewPassword);
                              else setShowConfirmPassword(!showConfirmPassword);
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {(field === "currentPassword" && showCurrentPassword) ||
                            (field === "newPassword" && showNewPassword) ||
                            (field === "confirmPassword" && showConfirmPassword) ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSavePassword}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Update Password
                  </button>
                  <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Theme Preference Tab */}
            {activeTab === "theme" && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-600">
                    Theme Preference
                  </h2>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Choose your preferred theme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "light",
                        label: "Light Mode",
                        icon: Sun,
                        description: "Clean and bright interface",
                      },
                      {
                        id: "dark",
                        label: "Dark Mode",
                        icon: Moon,
                        description: "Easy on your eyes",
                      },
                      {
                        id: "system",
                        label: "System",
                        icon: Monitor,
                        description: "Matches your device settings",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          theme === option.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <option.icon
                            className={`h-5 w-5 ${
                              theme === option.id
                                ? "text-blue-600"
                                : "text-gray-500"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              theme === option.id
                                ? "text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSaveTheme}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Save Theme
                  </button>
                  <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-600">
                    Notification Settings
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(notificationSettings.emailNotifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between py-2"
                          >
                            <div>
                              <p className="font-medium text-gray-700">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleNotificationChange(
                                  "emailNotifications",
                                  key
                                )
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? "bg-blue-600" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSaveNotifications}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Save Settings
                  </button>
                  <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all">
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

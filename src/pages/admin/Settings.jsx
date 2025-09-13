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
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleNotificationChange = (category, setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [category]: {
        ...notificationSettings[category],
        [setting]: !notificationSettings[category][setting],
      },
    });
  };

  const handleSaveProfile = () => alert("Profile updated successfully!");
  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };
  const handleSaveNotifications = () =>
    alert("Notification settings updated successfully!");
  const handleSaveTheme = () => alert("Theme preference updated successfully!");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Settings</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Manage your account preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all text-center ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 space-y-6 w-full">
        {/* Profile */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <User className="h-4 w-4" /> Profile Information
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {["firstName", "lastName", "email", "phone", "organization"].map(
                (field, idx) => (
                  <div key={idx}>
                    <label className="text-sm text-gray-700 mb-1 block capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={profileData[field]}
                      onChange={handleProfileChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveProfile}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                <Save className="inline h-4 w-4 mr-1" /> Save
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md">
                <X className="inline h-4 w-4 mr-1" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Password */}
        {activeTab === "password" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <Lock className="h-4 w-4" /> Change Password
            </h2>
            <div className="space-y-3">
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field, idx) => (
                  <div key={idx} className="relative">
                    <label className="block text-sm text-gray-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {(field === "currentPassword" && showCurrentPassword) ||
                      (field === "newPassword" && showNewPassword) ||
                      (field === "confirmPassword" && showConfirmPassword) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSavePassword}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                <Save className="inline h-4 w-4 mr-1" /> Update
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md">
                <X className="inline h-4 w-4 mr-1" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Theme */}
        {activeTab === "theme" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <Palette className="h-4 w-4" /> Theme Preference
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: "light", label: "Light", icon: Sun, desc: "Bright" },
                { id: "dark", label: "Dark", icon: Moon, desc: "Eye-friendly" },
                
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`w-full border-2 rounded-md p-3 text-left ${
                    theme === option.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <option.icon
                      className={`h-5 w-5 ${
                        theme === option.id ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`${
                        theme === option.id ? "text-blue-600" : "text-gray-700"
                      } font-medium`}
                    >
                      {option.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{option.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveTheme}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                <Save className="inline h-4 w-4 mr-1" /> Save
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md">
                <X className="inline h-4 w-4 mr-1" /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </h2>
            <div className="space-y-2">
              {Object.entries(notificationSettings.emailNotifications).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="capitalize text-gray-700">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <button
                      onClick={() =>
                        handleNotificationChange("emailNotifications", key)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 bg-white rounded-full transform transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveNotifications}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                <Save className="inline h-4 w-4 mr-1" /> Save
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md">
                <X className="inline h-4 w-4 mr-1" /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;










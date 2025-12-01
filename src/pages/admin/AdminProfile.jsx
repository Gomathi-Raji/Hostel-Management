import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Save, Lock, Eye, EyeOff, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiFetch, { setToken } from "@/lib/apiClient";

const AdminProfile = ({ onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiFetch("/auth/profile");
      setProfileData({
        name: response.name || "",
        email: response.email || "",
        phone: response.phone || "",
        role: response.role || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message || "Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage("");

      const response = await apiFetch("/auth/profile", {
        method: "PUT",
        body: {
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
        },
      });

      setSuccessMessage(t("adminProfile.profileUpdated"));
      setIsEditingProfile(false);
      
      // Update profile data with response
      if (response.user) {
        setProfileData({
          name: response.user.name || "",
          email: response.user.email || "",
          phone: response.user.phone || "",
          role: response.user.role || "",
        });
      }

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || t("adminProfile.profileUpdateFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage("");

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await apiFetch("/auth/change-password", {
        method: "PUT",
        body: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
      });

      setSuccessMessage(t("adminProfile.passwordChanged"));
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.message || t("adminProfile.passwordChangeFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      try { setToken(null); } catch (e) {}
      if (onLogout) onLogout();
      navigate('/login');
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{t("adminProfile.profileInformation")}</h2>
        {!isEditingProfile && (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            {t("adminProfile.editProfile")}
          </button>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {!isEditingProfile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t("adminProfile.fullName")}</p>
            <p className="text-sm font-medium text-foreground">{profileData.name || t("adminProfile.notSet")}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t("adminProfile.email")}</p>
            <p className="text-sm font-medium text-foreground">{profileData.email || "Not set"}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t("adminProfile.phone")}</p>
            <p className="text-sm font-medium text-foreground">{profileData.phone || t("adminProfile.notSet")}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{t("adminProfile.role")}</p>
            <p className="text-sm font-medium text-foreground capitalize">{profileData.role || t("adminProfile.notSet")}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("adminProfile.fullName")}</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("adminProfile.email")}</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("adminProfile.phone")}</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{t("adminProfile.role")}</label>
              <input
                type="text"
                value={profileData.role}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground capitalize cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Save className="h-4 w-4" />}
              <span>{isSaving ? t("adminProfile.saving") : t("adminProfile.saveChanges")}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditingProfile(false);
                setError(null);
              }}
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 flex items-center gap-2 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>{t("adminProfile.cancel")}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const renderPasswordSection = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">{t("adminProfile.passwordSettings")}</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {!isChangingPassword ? (
        <div className="text-center py-8">
          <button
            onClick={() => setIsChangingPassword(true)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Lock className="h-5 w-5" />
            {t("adminProfile.changePassword")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("adminProfile.currentPassword")}
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("adminProfile.newPassword")}
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
                className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Minimum 6 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("adminProfile.confirmPassword")}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-background text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Lock className="h-4 w-4" />}
              <span>{isSaving ? t("adminProfile.saving") : t("adminProfile.changePassword")}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsChangingPassword(false);
                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setError(null);
              }}
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 flex items-center gap-2 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>{t("adminProfile.cancel")}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{t("adminProfile.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("adminProfile.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-4 space-y-2">
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "profile"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="font-medium">{t("adminProfile.profileInformation")}</span>
            </button>

            <button
              onClick={() => setActiveSection("password")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "password"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Lock className="h-5 w-5" />
              <span className="font-medium">{t("adminProfile.passwordSettings")}</span>
            </button>

            <div className="pt-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">{t("adminProfile.logout")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg border border-border p-6">
            {activeSection === "profile" && renderProfileSection()}
            {activeSection === "password" && renderPasswordSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

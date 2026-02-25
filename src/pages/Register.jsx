import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import apiFetch, { setToken } from "@/lib/apiClient";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    role: "tenant"
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("_NP84YByHFFxENh4J");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async () => {
    if (!formData.email || !formData.name) {
      alert("Please fill in name and email first");
      return;
    }

    setLoading(true);
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);

    try {
      const templateParams = {
        to_email: formData.email,
        to_name: formData.name,
        otp: otpCode,
        subject: "Email Verification OTP"
      };

      await emailjs.send(
        'service_urcjdpe',
        'otp_verify',
        templateParams
      );

      setIsOtpSent(true);
      alert("OTP sent to your email!");
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    if (otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: { name: formData.name, email: formData.email, phone: formData.number, password: formData.password },
      });
      if (res.token) setToken(res.token);
      alert("Account created successfully!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      sendOtp();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card shadow-card rounded-lg p-8 max-w-md w-full border border-border">
  <h2 className="text-2xl font-bold text-center text-foreground mb-6">{t('register.title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('register.name')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('register.placeholders.name')}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
              disabled={isOtpSent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('register.email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('register.placeholders.email')}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
              disabled={isOtpSent}
            />
          </div>

          {isOtpSent && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">OTP</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  className="flex-1 px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={verifyOtpAndRegister}
                  disabled={loading || otp.length !== 6}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('register.phone')}</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder={t('register.placeholders.phone')}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
              disabled={isOtpSent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('register.password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('register.placeholders.password')}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
              disabled={isOtpSent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('register.confirmPassword')}</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('register.placeholders.confirmPassword')}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
              disabled={isOtpSent}
            />
          </div>

          {!isOtpSent && (
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.name}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          {t('register.haveAccount')} {" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            {t('register.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

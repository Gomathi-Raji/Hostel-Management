import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, HelpCircle, LogOut, Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormsDropdownOpen, setIsFormsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFormsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/invoices", label: "Invoices", icon: FileText },
    { path: "/tickets", label: "Tickets", icon: HelpCircle },
  ];

  const formsDropdownItems = [
    { path: "/vacating-form", label: "Vacating Form" },
    { path: "/exchange-form", label: "Exchange Form" },
  ];

  // Check if any forms dropdown item is active
  const isFormsDropdownActive = formsDropdownItems.some(item => location.pathname === item.path);

  return (
    <nav className="bg-card shadow-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">
                Hostel Management
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-light-green text-light-green-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Forms Dropdown - Desktop */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsFormsDropdownOpen(!isFormsDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isFormsDropdownActive
                    ? "bg-light-green text-light-green-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Forms</span>
                {isFormsDropdownOpen ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isFormsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card shadow-card rounded-lg border border-border z-50">
                  {formsDropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsFormsDropdownOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-muted ${
                        location.pathname === item.path
                          ? "bg-light-green text-light-green-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-light-green text-light-green-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Forms Dropdown - Mobile */}
            <div>
              <button
                onClick={() => setIsFormsDropdownOpen(!isFormsDropdownOpen)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isFormsDropdownActive
                    ? "bg-light-green text-light-green-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Forms</span>
                </div>
                {isFormsDropdownOpen ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>

              {/* Mobile Dropdown Items */}
              {isFormsDropdownOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  {formsDropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsFormsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "bg-light-green text-light-green-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
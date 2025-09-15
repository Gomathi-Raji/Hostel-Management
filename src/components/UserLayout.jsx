import React from "react";
import Navbar from "./Navbar";

const UserLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={onLogout} />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default UserLayout;


// LoadingLogo.jsx
import React from "react";
// Your logo path
import logo from "/logos/Screenshot_2025-05-30_at_6.22.00_PM-removebg-preview-2.png";
import "./LoadingLogo.css";

const LoadingLogo = () => {
  return (
    <div className="loading-logo-container">
      <img src={logo} alt="Loading YaanBarpe..." className="loading-logo" />
    </div>
  );
};

export default LoadingLogo;
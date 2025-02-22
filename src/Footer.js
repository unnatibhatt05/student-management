import React from "react";
import "./App.css"; // Styles are included in App.css

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Student Course Management System</p>
    </footer>
  );
};

export default Footer;

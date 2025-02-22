import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "./firebase"; // Firebase authentication
import { useAuthState } from "react-firebase-hooks/auth"; // Firebase hook
import "./NavBar.css";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location to identify active route

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "active-link" : ""; // Add 'active-link' class if current path matches
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="course-manager">🎓 Course Manager</Link>
      </div>
      <ul className="nav-links">
        {user ? (
          <>
            <li className={`nav-item ${getLinkClass("/")}`}>
              <Link to="/">Dashboard</Link>
            </li>
            <li className={`nav-item ${getLinkClass("/progress")}`}>
              <Link to="/progress">Progress Tracker</Link>
            </li>
            <li className={`nav-item ${getLinkClass("/assignments")}`}>
              <Link to="/assignments">Assignments</Link>
            </li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li className={`nav-item ${getLinkClass("/login")}`}>
              <Link to="/login">Login</Link>
            </li>
            <li className={`nav-item ${getLinkClass("/signup")}`}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

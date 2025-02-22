import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./NavBar";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import ProgressTracker from "./ProgressTracker";
import Assignments from "./AssignmentUpload";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      {user && <Navbar />} {/* Navbar should be visible only after login */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/progress" element={user ? <ProgressTracker /> : <Navigate to="/login" />} />
        <Route path="/assignments" element={user ? <Assignments /> : <Navigate to="/login" />} />
        <Route path="/Footer" element={user ? <Footer /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

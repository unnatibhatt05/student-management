import React, { useState } from "react";
import "./App.css"; // Keep for other styles

const AssignmentUpload = () => {
  const [assignments, setAssignments] = useState([]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignments([...assignments, { name: file.name, status: "Uploaded" }]);
    }
  };

  // ✅ Inline CSS for background image
  const pageStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/ass.webp')", // ✅ Image from the public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backdropFilter: "blur(2px)", // ✅ Subtle blur effect
  };

  return (
    <div style={pageStyle}>
      <div className="assignment-box">
        <h2>📤 Assignment Upload</h2>

        {/* File Upload Section */}
        <div className="upload-section">
          <input
            type="file"
            onChange={handleFileUpload}
            className="file-input"
          />
        </div>

        {/* List of Uploaded Assignments */}
        <ul className="assignment-list">
          {assignments.length === 0 ? (
            <p className="empty-message">No assignments uploaded yet.</p>
          ) : (
            assignments.map((assignment, index) => (
              <li key={index} className="assignment-item">
                {assignment.name} - <span className="status">{assignment.status}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AssignmentUpload;

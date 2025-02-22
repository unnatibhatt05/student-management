import React, { useState, useEffect } from "react";
import { fetchCourses } from "./api"; // Fetch enrolled courses
import "./App.css"; // Styling

const ProgressTracker = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourses();
      console.log("Fetched Courses:", data); // Debugging Log

      const formattedData = data.map((course) => ({
        ...course,
        completed: Number(course.completed) || 0, // Convert to number, default 0
        total: Number(course.total) || 1, // Default 1 to prevent division by 0
      }));

      console.log("Formatted Courses:", formattedData); // Debugging Log
      setCourses(formattedData);
    };
    loadCourses();
  }, []);

  const completeAssignment = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === id && course.completed < course.total
          ? { ...course, completed: course.completed + 1 }
          : course
      )
    );
  };

  // ✅ Inline CSS for background
  const progressTrackerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/asg1.jpg')", // ✅ Image from public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backdropFilter: "blur(2px)",
  };

  return (
    <div style={progressTrackerStyle}>
      <div className="progress-box">
        <h2>📈 Course Progress Tracker</h2>
        <div className="progress-content">
          {courses.length === 0 ? (
            <p className="empty-message">No courses found.</p>
          ) : (
            <ul className="progress-list">
              {courses.map((course) => (
                <li key={course._id}>
                  <h3>{course.title}</h3>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${(course.completed / course.total) * 100}%` }}
                    >
                      {isNaN(course.completed) || isNaN(course.total)
                        ? "Loading..."
                        : `${course.completed}/${course.total}`}
                    </div>
                  </div>
                  {course.completed < course.total && (
                    <button className="button" onClick={() => completeAssignment(course._id)}>
                      ✅ Complete Assignment
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

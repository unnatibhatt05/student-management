import React, { useState, useEffect } from "react";
import { fetchCourses, addCourse, updateCourse, deleteCourse } from "./api"; // CRUD API calls
import "./App.css"; // Styling

const Dashboard = () => {
  const [courses, setCourses] = useState([]); // List of courses
  const [newCourse, setNewCourse] = useState({ title: "", description: "", instructor: "" });
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState({ title: "", description: "", instructor: "" });

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };
    loadCourses();
  }, []);

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.description || !newCourse.instructor) return;
    const addedCourse = await addCourse(newCourse);
    if (addedCourse) setCourses([...courses, addedCourse]);
    setNewCourse({ title: "", description: "", instructor: "" }); // Clear input fields
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setEditedCourse({ title: course.title, description: course.description, instructor: course.instructor });
  };

  const handleEditInputChange = (e) => {
    setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
  };

  const handleUpdateCourse = async () => {
    if (!editedCourse.title || !editedCourse.description || !editedCourse.instructor) return;
    const updatedCourse = await updateCourse(editingCourse, editedCourse);
    if (updatedCourse) {
      setCourses(
        courses.map((course) => (course._id === editingCourse ? updatedCourse : course))
      );
    }
    setEditingCourse(null);
    setEditedCourse({ title: "", description: "", instructor: "" });
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    setCourses(courses.filter((course) => course._id !== id)); // Remove from UI
  };

  // ✅ Inline CSS for background image
  const dashboardStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/dash.png')", // ✅ Image from public folder
    backgroundSize: "cover",
    backgroundPosition: "center", // ✅ Adjusts positioning to prevent excessive zoom-in
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",  // ✅ Prevents scrolling distortion
    backdropFilter: "blur(2px)",
  };

  return (
    <div style={dashboardStyle}>
      <div className="dashboard-box">
        <h2>🎓 Course Dashboard</h2>

        {/* Add Course Section */}
        <div className="add-course">
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            placeholder="Course Title"
          />
          <input
            type="text"
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            placeholder="Course Description"
          />
          <input
            type="text"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
            placeholder="Instructor Name"
          />
          <button className="button add" onClick={handleAddCourse}>
            ➕ Add Course
          </button>
        </div>

        {/* Course List */}
        <ul className="course-list">
          {courses.length === 0 ? (
            <p className="empty-message">No courses available. Start adding new courses!</p>
          ) : (
            courses.map((course) => (
              <li key={course._id}>
                {editingCourse === course._id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={editedCourse.title}
                      onChange={handleEditInputChange}
                    />
                    <input
                      type="text"
                      name="description"
                      value={editedCourse.description}
                      onChange={handleEditInputChange}
                    />
                    <input
                      type="text"
                      name="instructor"
                      value={editedCourse.instructor}
                      onChange={handleEditInputChange}
                    />
                    <button className="button save" onClick={handleUpdateCourse}>
                      ✅ Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      <b>{course.title}</b> - {course.description} (Instructor: {course.instructor})
                    </span>
                    <button className="button edit" onClick={() => handleEdit(course)}>
                      ✏ Edit
                    </button>
                    <button className="button delete" onClick={() => handleDelete(course._id)}>
                      ❌ Delete
                    </button>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

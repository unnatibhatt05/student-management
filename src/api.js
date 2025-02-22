import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change this if your backend URL is different

// ✅ Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    alert("Failed to fetch courses. Please try again.");
    return [];
  }
};

// ✅ Fetch a single course by ID
export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    alert("Failed to fetch course details.");
    return null;
  }
};

// ✅ Add a new course
export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/courses`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    alert("Failed to add course. Please check your input and try again.");
    return null;
  }
};

// ✅ Update an existing course
export const updateCourse = async (courseId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/courses/${courseId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating course ${courseId}:`, error);
    alert("Failed to update course. Please try again.");
    return null;
  }
};

// ✅ Delete a course
export const deleteCourse = async (courseId) => {
  try {
    await axios.delete(`${API_BASE_URL}/courses/${courseId}`);
  } catch (error) {
    console.error(`Error deleting course ${courseId}:`, error);
    alert("Failed to delete course.");
  }
};

// ✅ User Signup
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/signup`, { email, password });
    console.log("Signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response.data);
    alert("Signup failed. Please try again.");
  }
};

// ✅ User Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    alert("Login failed. Please check your credentials and try again.");
  }
};

// ✅ User Logout
export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/logout`);
    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response.data);
    alert("Logout failed. Please try again.");
  }
};

// ✅ Assignment Upload
export const uploadAssignment = async (title, student, file) => {
  const formData = new FormData();
  formData.append("assignment", file);
  formData.append("title", title);
  formData.append("student", student);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/upload-assignment`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Assignment uploaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Assignment upload failed:", error.response.data);
    alert("Failed to upload assignment. Please try again.");
  }
};

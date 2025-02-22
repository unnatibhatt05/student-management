require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());

// Set up storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add timestamp to the filename
  },
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define User Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Define Course Schema & Model
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
});
const Course = mongoose.model("Course", CourseSchema);

// Define Assignment Schema & Model (for storing assignment info)
const AssignmentSchema = new mongoose.Schema({
  title: String,
  student: String,
  file: String, // File path for the uploaded file
  dateUploaded: { type: Date, default: Date.now },
});
const Assignment = mongoose.model("Assignment", AssignmentSchema);

// Serve static files before defining routes
app.use(express.static(path.join(__dirname, "public")));

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    console.log(`✅ New User Registered: (${email})`); // Log signup action
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required!" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    console.log(`✅ User Logged In: ${email}`); // Log login action
    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout Route (simulated with a message)
app.post("/api/logout", (req, res) => {
  console.log("✅ User Logged Out"); // Log logout action
  res.status(200).json({ message: "Logout successful!" });
});

// Assignment Upload Route
app.post("/api/upload-assignment", upload.single("assignment"), async (req, res) => {
  try {
    const { title, student } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Missing required fields or file!" });
    }

    const newAssignment = new Assignment({
    
      file: file.path, // Save the file path in the database
    });

    await newAssignment.save();
    console.log(`✅ Assignment Uploaded: 'File Name: ${file.filename}`); // Log assignment upload action with file name
    res.status(201).json({ message: `Assignment uploaded successfully!`, fileName: file.filename });
  } catch (error) {
    console.error("❌ Assignment upload error:", error);
    res.status(500).json({ error: "Failed to upload assignment" });
  }
});

// Fetch All Courses
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    console.log("📚 Fetched All Courses"); // Log fetch action
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Add New Course
app.post("/courses", async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCourse = new Course({ title, description, instructor });
    await newCourse.save();
    console.log(`✅ Course Added: ${title} by ${instructor}`); // Log course added
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

// Update Course
app.put("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, instructor },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log(`✅ Course Updated: ${updatedCourse.title} by ${updatedCourse.instructor}`); // Log course updated
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
});

// Delete Course
app.delete("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log(`✅ Course Deleted: ${deletedCourse.title}`); // Log course deleted
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

// Serve React App for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));

import React, { useEffect, useState } from "react";
import { fetchCourses } from "./api";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  return (
    <div>
      <h2>All Courses</h2>
      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;

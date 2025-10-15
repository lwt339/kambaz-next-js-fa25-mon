// File: app/(Kambaz)/Courses/reducer.ts
// Manages all courses in Redux so they're available everywhere

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database";
import { Course } from "../Database/type";
import { v4 as uuidv4 } from "uuid";

// What our courses state looks like
interface CoursesState {
    courses: Course[];
}

// Start with courses from database
const initialState: CoursesState = {
    courses: db.courses as Course[]
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        // Add new course - can accept a provided ID or generate one
        addCourse: (state, action: PayloadAction<Partial<Course>>) => {
            const course = action.payload;
            const newCourse: Course = {
                _id: course._id || uuidv4(),
                name: course.name || "New Course",
                number: course.number || "NEW101",
                startDate: course.startDate || new Date().toISOString(),
                endDate: course.endDate || new Date().toISOString(),
                department: course.department || "Department",
                credits: course.credits || 3,
                instructor: course.instructor || "Staff",
                description: course.description || "",
                image: course.image || "/images/reactjs.jpg",
                color: course.color || "#dc3545"
            };
            state.courses = [...state.courses, newCourse];
        },

        // Remove course by ID
        deleteCourse: (state, action: PayloadAction<string>) => {
            const courseId = action.payload;
            state.courses = state.courses.filter(
                (c: Course) => c._id !== courseId
            );
        },

        // Update existing course with new data
        updateCourse: (state, action: PayloadAction<Course>) => {
            const updatedCourse = action.payload;
            state.courses = state.courses.map((c: Course) =>
                c._id === updatedCourse._id ? updatedCourse : c
            );
        }
    }
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
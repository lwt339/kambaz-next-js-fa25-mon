// File: app/(Kambaz)/Enrollments/reducer.ts
// Manages which students are enrolled in which courses

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database";
import { Enrollment } from "../Database/type";
import { v4 as uuidv4 } from "uuid";

// What our enrollments state looks like
interface EnrollmentsState {
    enrollments: Enrollment[];
}

// What data we need to enroll or unenroll someone
interface EnrollmentAction {
    userId: string;
    courseId: string;
}

// Start with enrollments from database
const initialState: EnrollmentsState = {
    enrollments: db.enrollments as Enrollment[]
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        // Add a user to a course
        enrollUser: (state, action: PayloadAction<EnrollmentAction>) => {
            const { userId, courseId } = action.payload;

            // Don't create duplicates - check if already enrolled
            const alreadyEnrolled = state.enrollments.some(
                (enrollment: Enrollment) =>
                    enrollment.user === userId &&
                    enrollment.course === courseId
            );

            if (!alreadyEnrolled) {
                const newEnrollment: Enrollment = {
                    _id: uuidv4(),
                    user: userId,
                    course: courseId
                };
                state.enrollments = [...state.enrollments, newEnrollment];
            }
        },

        // Remove a user from a course
        unenrollUser: (state, action: PayloadAction<EnrollmentAction>) => {
            const { userId, courseId } = action.payload;

            // Filter out the enrollment that matches both user and course
            state.enrollments = state.enrollments.filter(
                (enrollment: Enrollment) =>
                    !(enrollment.user === userId && enrollment.course === courseId)
            );
        },

        // Replace all enrollments at once (useful for loading from server)
        setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
            state.enrollments = action.payload;
        }
    }
});

export const { enrollUser, unenrollUser, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
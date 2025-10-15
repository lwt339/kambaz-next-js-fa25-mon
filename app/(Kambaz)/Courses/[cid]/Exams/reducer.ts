// File: app/(Kambaz)/Courses/[cid]/Exams/reducer.ts
// Manages all exams in Redux so they're available throughout the app

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { Exam } from "../../../Database/type";
import { v4 as uuidv4 } from "uuid";

// What our exams state looks like
interface ExamsState {
    exams: Exam[];
}

// Start with exams from the database
const initialState: ExamsState = {
    exams: db.exams as Exam[]
};

// Create the slice that handles all exam operations
const examsSlice = createSlice({
    name: "exams",
    initialState,
    reducers: {
        // Add a brand new exam to the list
        addExam: (state, action: PayloadAction<Partial<Exam>>) => {
            const exam = action.payload;
            const newExam: Exam = {
                _id: uuidv4(),
                title: exam.title || "Untitled Exam",
                course: exam.course || "",
                type: exam.type || "Comprehensive",
                questions: exam.questions || 50,
                points: exam.points || 100,
                dueDate: exam.dueDate || new Date().toISOString(),
                availableDate: exam.availableDate || new Date().toISOString(),
                timeLimit: exam.timeLimit || 120,
                published: exam.published ?? true
            };
            state.exams = [...state.exams, newExam];
        },

        // Remove an exam by its ID
        deleteExam: (state, action: PayloadAction<string>) => {
            const examId = action.payload;
            state.exams = state.exams.filter(
                (e: Exam) => e._id !== examId
            );
        },

        // Update an existing exam with new information
        updateExam: (state, action: PayloadAction<Exam>) => {
            const updatedExam = action.payload;
            state.exams = state.exams.map((e: Exam) =>
                e._id === updatedExam._id ? updatedExam : e
            );
        }
    }
});

// Export actions so components can use them
export const {
    addExam,
    deleteExam,
    updateExam
} = examsSlice.actions;

// Export reducer to add to the store
export default examsSlice.reducer;
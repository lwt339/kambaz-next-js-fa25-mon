// File: app/(Kambaz)/Courses/[cid]/Quizzes/reducer.ts
// Manages all quizzes in Redux so they're available throughout the app

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { Quiz } from "../../../Database/type";
import { v4 as uuidv4 } from "uuid";

// What our quizzes state looks like
interface QuizzesState {
    quizzes: Quiz[];
}

// Start with quizzes from the database
const initialState: QuizzesState = {
    quizzes: db.quizzes as Quiz[]
};

// Create the slice that handles all quiz operations
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        // Add a brand new quiz to the list
        addQuiz: (state, action: PayloadAction<Partial<Quiz>>) => {
            const quiz = action.payload;
            const newQuiz: Quiz = {
                _id: uuidv4(),
                title: quiz.title || "Untitled Quiz",
                course: quiz.course || "",
                type: quiz.type || "Graded Quiz",
                questions: quiz.questions || 10,
                points: quiz.points || 100,
                dueDate: quiz.dueDate || new Date().toISOString(),
                availableDate: quiz.availableDate || new Date().toISOString(),
                timeLimit: quiz.timeLimit || 20,
                published: quiz.published ?? true
            };
            state.quizzes = [...state.quizzes, newQuiz];
        },

        // Remove a quiz by its ID
        deleteQuiz: (state, action: PayloadAction<string>) => {
            const quizId = action.payload;
            state.quizzes = state.quizzes.filter(
                (q: Quiz) => q._id !== quizId
            );
        },

        // Update an existing quiz with new information
        updateQuiz: (state, action: PayloadAction<Quiz>) => {
            const updatedQuiz = action.payload;
            state.quizzes = state.quizzes.map((q: Quiz) =>
                q._id === updatedQuiz._id ? updatedQuiz : q
            );
        }
    }
});

// Export actions so components can use them
export const {
    addQuiz,
    deleteQuiz,
    updateQuiz
} = quizzesSlice.actions;

// Export reducer to add to the store
export default quizzesSlice.reducer;
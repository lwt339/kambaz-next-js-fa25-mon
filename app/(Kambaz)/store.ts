// File: app/(Kambaz)/store.ts
// Redux store bringing together all our reducers

import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import examsReducer from "./Courses/[cid]/Exams/reducer";
import accountReducer from "./Account/reducer";
import enrollmentsReducer from "./Enrollments/reducer";

// Combine all reducers into one store
const store = configureStore({
    reducer: {
        coursesReducer,
        modulesReducer,
        assignmentsReducer,
        quizzesReducer,
        examsReducer,
        accountReducer,
        enrollmentsReducer
    }
});

// Export the store
export default store;

// Export RootState so components can type their selectors properly
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch so components can type their dispatch calls
export type AppDispatch = typeof store.dispatch;
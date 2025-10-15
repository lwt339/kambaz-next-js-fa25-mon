// File: app/(Kambaz)/Courses/[cid]/Assignments/reducer.ts
// Manages all assignments in Redux so they're available throughout the app

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { Assignment } from "../../../Database/type";
import { v4 as uuidv4 } from "uuid";

// What our assignments state looks like
interface AssignmentsState {
    assignments: Assignment[];
}

// Start with assignments from the database
const initialState: AssignmentsState = {
    assignments: db.assignments as Assignment[]
};

// Create the slice that handles all assignment operations
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        // Add a brand new assignment to the list
        addAssignment: (state, action: PayloadAction<Partial<Assignment>>) => {
            const assignment = action.payload;
            const newAssignment: Assignment = {
                _id: uuidv4(),
                title: assignment.title || "Untitled Assignment",
                course: assignment.course || "",
                description: assignment.description || "",
                points: assignment.points || 100,
                dueDate: assignment.dueDate || new Date().toISOString(),
                availableDate: assignment.availableDate || new Date().toISOString(),
                assignmentType: assignment.assignmentType || "ASSIGNMENT"
            };
            state.assignments = [...state.assignments, newAssignment];
        },

        // Remove an assignment by its ID
        deleteAssignment: (state, action: PayloadAction<string>) => {
            const assignmentId = action.payload;
            state.assignments = state.assignments.filter(
                (a: Assignment) => a._id !== assignmentId
            );
        },

        // Update an existing assignment with new information
        updateAssignment: (state, action: PayloadAction<Assignment>) => {
            const updatedAssignment = action.payload;
            state.assignments = state.assignments.map((a: Assignment) =>
                a._id === updatedAssignment._id ? updatedAssignment : a
            );
        },

        // Mark an assignment as being edited (for inline editing)
        setEditingAssignment: (state, action: PayloadAction<string>) => {
            const assignmentId = action.payload;
            state.assignments = state.assignments.map((a: Assignment) =>
                a._id === assignmentId ? { ...a, editing: true } as Assignment : a
            );
        }
    }
});

// Export actions so components can use them
export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setEditingAssignment
} = assignmentsSlice.actions;

// Export reducer to add to the store
export default assignmentsSlice.reducer;
// File: app/(Kambaz)/Courses/[cid]/Modules/reducer.ts
// Manages all course modules in Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { Module, Lesson } from "../../../Database/type";
import { v4 as uuidv4 } from "uuid";

// Module might have an editing flag for inline editing
interface ModuleWithEditing extends Module {
    editing?: boolean;
}

// What our modules state looks like
interface ModulesState {
    modules: ModuleWithEditing[];
}

// Start with modules from database
const initialState: ModulesState = {
    modules: db.modules as Module[]
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        // Add a new module to the list
        addModule: (state, action: PayloadAction<{ name: string; course: string }>) => {
            const { name, course } = action.payload;
            const newModule: Module = {
                _id: uuidv4(),
                name,
                description: "",
                course,
                lessons: []
            };
            state.modules = [...state.modules, newModule];
        },

        // Remove a module by ID
        deleteModule: (state, action: PayloadAction<string>) => {
            const moduleId = action.payload;
            state.modules = state.modules.filter(
                (m: Module) => m._id !== moduleId
            );
        },

        // Update an existing module
        updateModule: (state, action: PayloadAction<ModuleWithEditing>) => {
            const updatedModule = action.payload;
            state.modules = state.modules.map((m: ModuleWithEditing) =>
                m._id === updatedModule._id ? updatedModule : m
            );
        },

        // Mark a module for inline editing
        editModule: (state, action: PayloadAction<string>) => {
            const moduleId = action.payload;
            state.modules = state.modules.map((m: ModuleWithEditing) =>
                m._id === moduleId ? { ...m, editing: true } : m
            );
        },

        // Add a lesson to a specific module
        addLesson: (state, action: PayloadAction<{ moduleId: string; lessonName: string }>) => {
            const { moduleId, lessonName } = action.payload;
            state.modules = state.modules.map((m: Module) => {
                if (m._id === moduleId) {
                    const newLesson: Lesson = {
                        _id: uuidv4(),
                        name: lessonName,
                        description: "",
                        module: moduleId
                    };
                    return {
                        ...m,
                        lessons: [...(m.lessons || []), newLesson]
                    };
                }
                return m;
            });
        }
    }
});

export const { addModule, deleteModule, updateModule, editModule, addLesson } = modulesSlice.actions;
export default modulesSlice.reducer;
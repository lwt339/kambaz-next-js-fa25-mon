// File: app/Labs/Lab4/ReduxExamples/todos/todosReducer.ts
// Manages todo list in Redux

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// What a todo looks like
interface Todo {
    id: string;
    title: string;
}

interface TodosState {
    todos: Todo[];
    todo: { title: string };
}

const initialState: TodosState = {
    todos: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ],
    todo: { title: "Learn Mongo" },
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // Add new todo to the list
        addTodo: (state, action: PayloadAction<{ title: string }>) => {
            const newTodos = [
                ...state.todos,
                {
                    ...action.payload,
                    id: new Date().getTime().toString()
                },
            ];
            state.todos = newTodos;
            state.todo = { title: "" };
        },

        // Remove todo by ID
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(
                (todo: Todo) => todo.id !== action.payload
            );
        },

        // Update existing todo
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map((item: Todo) =>
                item.id === action.payload.id ? action.payload : item
            );
            state.todo = { title: "" };
        },

        // Set current todo being edited
        setTodo: (state, action: PayloadAction<Todo>) => {
            state.todo = action.payload;
        },
    },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;
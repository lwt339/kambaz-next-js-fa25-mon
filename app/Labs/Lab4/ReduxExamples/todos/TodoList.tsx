// File: app/Labs/Lab4/ReduxExamples/todos/TodoList.tsx
// Main todo list component

import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

interface Todo {
    id: string;
    title: string;
}

interface LabsRootState {
    todosReducer: {
        todos: Todo[];
    };
}

export default function TodoList() {
    // Get todos from Redux
    const { todos } = useSelector((state: LabsRootState) => state.todosReducer);

    return (
        <div id="wd-todo-list-redux">
            <h2>Todo List</h2>
            <div className="p-3 bg-white border rounded">
                <ul className="list-group">
                    <TodoForm />
                    {todos.map((todo: Todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
            <hr />
        </div>
    );
}
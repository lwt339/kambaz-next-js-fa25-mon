// File: app/Labs/Lab4/ReduxExamples/todos/TodoItem.tsx
// Individual todo item component

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
    };
}

export default function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useDispatch();

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{todo.title}</span>

            <div>
                {/* Edit button */}
                <button
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"
                    className="btn btn-sm btn-primary me-2"
                >
                    Edit
                </button>

                {/* Delete button */}
                <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                    className="btn btn-sm btn-danger"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
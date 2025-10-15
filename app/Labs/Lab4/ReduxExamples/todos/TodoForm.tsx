// File: app/Labs/Lab4/ReduxExamples/todos/TodoForm.tsx
// Form for adding and updating todos

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

interface LabsRootState {
    todosReducer: {
        todo: Todo;
    };
}

export default function TodoForm() {
    // Get current todo from Redux
    const { todo } = useSelector((state: LabsRootState) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <li className="list-group-item d-flex align-items-center">
            {/* Input field */}
            <input
                className="form-control me-2"
                value={todo.title}
                onChange={(e) =>
                    dispatch(setTodo({ ...todo, title: e.target.value }))
                }
                placeholder="Enter todo title..."
            />

            {/* Update button */}
            <button
                onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"
                className="btn btn-warning me-2"
            >
                Update
            </button>

            {/* Add button */}
            <button
                onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"
                className="btn btn-success"
            >
                Add
            </button>
        </li>
    );
}
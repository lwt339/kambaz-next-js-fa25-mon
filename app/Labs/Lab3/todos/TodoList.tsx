import { ListGroup } from "react-bootstrap";
import  TodoItem  from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
    return (
        <div id="wd-todo-list" className="mb-4">
            <h3>Todo List</h3>
            <ListGroup>
                {todos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} />
                ))}
            </ListGroup>
            <hr/>
        </div>
    );
}
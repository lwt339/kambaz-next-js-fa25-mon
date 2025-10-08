import {ListGroupItem } from "react-bootstrap";


interface Todo {
    title: string;
    status: string;
    done: boolean;
}

interface TodoItemProps {
    todo?: Todo;
}

export default function TodoItem({
                             todo = {
                                 done: true,
                                 title: 'Buy milk',
                                 status: 'COMPLETED'
                             }
                         }: TodoItemProps) {

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'COMPLETED': return 'text-success';
            case 'IN PROGRESS': return 'text-warning';
            case 'CANCELED': return 'text-danger';
            case 'DEFERRED': return 'text-info';
            default: return 'text-secondary';
        }
    };

    return (
        <ListGroupItem className="d-flex align-items-center">
            <input
                type="checkbox"
                className="me-2"
                defaultChecked={todo.done}
                aria-label={`Mark ${todo.title} as ${todo.done ? 'incomplete' : 'complete'}`}
            />
            <span>
        {todo.title}
      </span>
            <span className={`ms-2 ${getStatusColor(todo.status)}`}>
        ({todo.status})
      </span>
        </ListGroupItem>
    );
}
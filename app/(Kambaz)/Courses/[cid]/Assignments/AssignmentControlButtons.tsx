// File: app/(Kambaz)/Courses/[cid]/Assignments/AssignmentControlButtons.tsx
// Edit and delete buttons that show up on each assignment row

import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { FaTrash, FaPencil } from "react-icons/fa6";

// What props this component needs
interface AssignmentControlButtonsProps {
    assignmentId: string;
    onEdit?: (assignmentId: string) => void;
    onDelete?: (assignmentId: string) => void;
}

export default function AssignmentControlButtons({
                                                     assignmentId,
                                                     onEdit,
                                                     onDelete
                                                 }: AssignmentControlButtonsProps) {
    return (
        <div className="float-end d-flex align-items-center gap-3">
            {/* Show edit button only if user has permission */}
            {onEdit && (
                <FaPencil
                    className="text-primary"
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEdit(assignmentId);
                    }}
                    title="Edit assignment"
                />
            )}

            {/* Show delete button only if user has permission */}
            {onDelete && (
                <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(assignmentId);
                    }}
                    title="Delete assignment"
                />
            )}

            {/* Green checkmark icon for published status */}
            <span
                className="position-relative d-inline-block"
                style={{
                    width: "18px",
                    height: "18px",
                    verticalAlign: "middle"
                }}
            >
                <FaCircle
                    className="text-white position-absolute"
                    style={{
                        fontSize: "12px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
                <FaCheckCircle
                    className="text-success position-absolute"
                    style={{
                        fontSize: "18px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
            </span>

            {/* Three dots menu icon */}
            <IoEllipsisVertical className="fs-4 text-muted" />
        </div>
    );
}
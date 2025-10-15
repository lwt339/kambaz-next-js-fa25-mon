// File: app/(Kambaz)/Courses/[cid]/Modules/ModuleControlButtons.tsx
// Edit, delete, and add buttons for each module

import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

// What props this component needs
interface ModuleControlButtonsProps {
    moduleId: string;
    deleteModule?: (moduleId: string) => void;
    editModule?: (moduleId: string) => void;
    addLesson?: (moduleId: string) => void;
}

export default function ModuleControlButtons({
                                                 moduleId,
                                                 deleteModule,
                                                 editModule,
                                                 addLesson
                                             }: ModuleControlButtonsProps) {
    return (
        <div className="float-end d-flex align-items-center">
            {/* Edit button - only show if user can edit */}
            {editModule && (
                <FaPencil
                    onClick={(e) => {
                        e.stopPropagation();
                        editModule(moduleId);
                    }}
                    className="text-primary me-3"
                    style={{ cursor: "pointer", fontSize: "16px" }}
                    title="Edit module name"
                />
            )}

            {/* Delete button - only show if user can delete */}
            {deleteModule && (
                <FaTrash
                    className="text-danger me-3"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteModule(moduleId);
                    }}
                    style={{ cursor: "pointer", fontSize: "16px" }}
                    title="Delete module"
                />
            )}

            {/* Green checkmark for published status */}
            <GreenCheckmark />

            {/* Add lesson button - only show if user can add */}
            {addLesson && (
                <BsPlus
                    className="fs-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        addLesson(moduleId);
                    }}
                    style={{ cursor: "pointer" }}
                    title="Add item to module"
                />
            )}

            {/* Three dots menu */}
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
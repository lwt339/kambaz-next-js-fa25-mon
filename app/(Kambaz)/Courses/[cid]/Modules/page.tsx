/**
 * Modules Page - Data-Driven Client Component Version
 * Location: app/(Kambaz)/Courses/[cid]/Modules/page.tsx
 *
 * Now pulls modules and lessons from the database filtered by course ID.
 * Uses client component with useParams() hook to match your other components.
 */

"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
// Import modules from database
import * as db from "../../../Database";

export default function Modules() {
    /**
     * Extract course ID from URL using useParams hook
     * Example: If URL is /Courses/RS101/Modules, then cid = "RS101"
     *
     * This is the client component approach, which matches how your
     * Navigation and other components work.
     */
    const { cid } = useParams();

    /**
     * Get modules from database and filter by current course
     * Only shows modules where module.course matches the course ID
     *
     * Example: If cid = "RS101", only shows modules with course: "RS101"
     */
    const courseModules = db.modules.filter((module: any) => module.course === cid);

    return (
        <div id="wd-modules">
            {/* Module Controls (Collapse All, View Progress, etc.) */}
            <ModulesControls />
            <br /><br /><br /><br />

            <ListGroup className="rounded-0">
                {/**
                 * Map through filtered modules and display each one
                 * Each module shows:
                 * - Module name
                 * - Module control buttons
                 * - List of lessons within the module
                 */}
                {courseModules.map((module: any) => (
                    <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                        {/* Module Header */}
                        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="text-truncate flex-grow-1 me-2">
                                {module.name}
                            </span>
                            <div className="flex-shrink-0">
                                <ModuleControlButtons />
                            </div>
                        </div>

                        {/* Lessons List */}
                        {module.lessons && module.lessons.length > 0 && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson: any) => (
                                    <ListGroupItem
                                        key={lesson._id}
                                        className="wd-lesson p-3 ps-1 d-flex align-items-center"
                                    >
                                        <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                                        <span className="flex-grow-1">{lesson.name}</span>
                                        <div className="flex-shrink-0">
                                            <LessonControlButtons />
                                        </div>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
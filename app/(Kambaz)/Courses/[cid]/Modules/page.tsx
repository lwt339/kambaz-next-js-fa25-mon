

"use client";

import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import * as db from "../../../Database";
import "./modules.css";

type Module = {
    _id: string;
    name: string;
    description?: string;
    course: string;
    lessons?: Lesson[];
};

type Lesson = {
    _id: string;
    name: string;
    description?: string;
    module: string;
};

export default function Modules() {
    const { cid } = useParams();

    // Filter modules for this course
    const courseModules = db.modules.filter(
        (module: Module) => module.course === cid
    );

    // state for collapse/expand
    // by module ID
    const [collapsedModules, setCollapsedModules] = useState<Set<string>>(new Set());

    // Toggle individual module
    const toggleModule = (moduleId: string) => {
        setCollapsedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    // Collapse all modules
    const collapseAll = () => {
        const allModuleIds = courseModules.map((m: Module) => m._id);
        setCollapsedModules(new Set(allModuleIds));
    };

    // Expand all modules
    const expandAll = () => {
        setCollapsedModules(new Set());
    };

    // Check if all modules are collapsed
    const allCollapsed = collapsedModules.size === courseModules.length && courseModules.length > 0;

    return (
        <div id="wd-modules">
            {/* MODULE CONTROLS */}
            <ModulesControls
                onCollapseAll={collapseAll}
                onExpandAll={expandAll}
                allCollapsed={allCollapsed}
            />
            <br /><br />

            {/* modules list */}
            <ListGroup className="wd-modules-list">
                {courseModules.map((module: Module) => {
                    const isCollapsed = collapsedModules.has(module._id);

                    return (
                        <ListGroupItem
                            key={module._id}
                            className="wd-module"
                        >
                            {/* module header */}
                            <div
                                className="wd-module-header"
                                onClick={() => toggleModule(module._id)}
                            >
                                <BsGripVertical className="wd-grip-icon" />

                                {/* Collapse Expand Arrow */}
                                {isCollapsed ? (
                                    <IoMdArrowDropright className="wd-collapse-icon" />
                                ) : (
                                    <IoMdArrowDropdown className="wd-collapse-icon" />
                                )}

                                <span className="wd-module-name">
                                    {module.name}
                                </span>
                                <div className="wd-module-controls">
                                    <ModuleControlButtons />
                                </div>
                            </div>

                            {/* lessons list */}
                            {!isCollapsed && module.lessons && module.lessons.length > 0 && (
                                <ListGroup className="wd-lessons-list">
                                    {module.lessons.map((lesson: Lesson) => (
                                        <ListGroupItem
                                            key={lesson._id}
                                            className="wd-lesson"
                                        >
                                            <BsGripVertical className="wd-grip-icon" />
                                            <span className="wd-lesson-name">
                                                {lesson.name}
                                            </span>
                                            <div className="wd-lesson-controls">
                                                <LessonControlButtons />
                                            </div>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>

            {/* no modules */}
            {courseModules.length === 0 && (
                <div className="wd-no-modules">
                    <p>No modules available for this course yet.</p>
                </div>
            )}
        </div>
    );
}

/**
 * HOW COLLAPSE/EXPAND WORKS:
 *
 * 1. State tracks collapsed module IDs in a Set
 * 2. Click module header → toggles that module
 * 3. Click "Collapse All" → adds all module IDs to Set
 * 4. Click "Expand All" → clears the Set
 * 5. Arrow icon changes: ▶ (collapsed) or ▼ (expanded)
 * 6. Lessons only render when module is not collapsed
 *
 * REMOVED:
 * - Module description display
 * - No more gray description box
 * - Cleaner, simpler interface
 */
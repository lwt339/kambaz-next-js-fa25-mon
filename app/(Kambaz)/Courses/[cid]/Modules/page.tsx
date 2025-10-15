// File: app/(Kambaz)/Courses/[cid]/Modules/page.tsx
// Shows all modules and lessons for a course with expand/collapse

"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { Module } from "../../../Database/type";
import { addModule, deleteModule, updateModule, editModule, addLesson } from "./reducer";
import { RootState, AppDispatch } from "../../../store";
import "./modules.css";

// Module might have editing flag for inline editing
interface ModuleWithEditing extends Module {
    editing?: boolean;
}

export default function Modules() {
    const { cid } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    // Get modules and current user from Redux
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // Track temporary input for new module name
    const [moduleName, setModuleName] = useState<string>("");

    // Track which modules are collapsed
    const [collapsedModules, setCollapsedModules] = useState<Set<string>>(new Set());

    // Toggle one module between collapsed and expanded
    const toggleModule = (moduleId: string) => {
        setCollapsedModules((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    // Collapse all modules at once
    const collapseAll = () => {
        const courseModules = modules.filter((m: Module) => m.course === cid);
        setCollapsedModules(new Set(courseModules.map((m: Module) => m._id)));
    };

    // Expand all modules at once
    const expandAll = () => setCollapsedModules(new Set());

    // Add a new lesson to a module
    const handleAddLesson = (moduleId: string) => {
        const lessonName = prompt("Enter lesson name:");
        if (lessonName?.trim()) {
            dispatch(addLesson({ moduleId, lessonName: lessonName.trim() }));
        }
    };

    // Filter to just this course's modules
    const courseModules = modules.filter((m: Module) => m.course === cid);
    const allCollapsed = collapsedModules.size === courseModules.length && courseModules.length > 0;

    // Check if user can edit (Faculty, Admin, or TA)
    const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";

    return (
        <div id="wd-modules">
            {/* Top controls for adding modules and collapse/expand */}
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={() => {
                    dispatch(addModule({ name: moduleName, course: cid as string }));
                    setModuleName("");
                }}
                onCollapseAll={collapseAll}
                onExpandAll={expandAll}
                allCollapsed={allCollapsed}
                canEdit={canEdit}
            />
            <br /><br />

            {/* List of all modules */}
            <ListGroup className="wd-modules-list">
                {courseModules.map((module: ModuleWithEditing) => {
                    const isCollapsed = collapsedModules.has(module._id);

                    return (
                        <ListGroupItem key={module._id} className="wd-module">
                            {/* Module header with name and controls */}
                            <div className="wd-module-header">
                                <BsGripVertical className="wd-grip-icon" />

                                {/* Arrow to expand/collapse */}
                                <div onClick={() => toggleModule(module._id)} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                    {isCollapsed ? <IoMdArrowDropright className="wd-collapse-icon" /> : <IoMdArrowDropdown className="wd-collapse-icon" />}
                                </div>

                                {/* Show module name or edit input */}
                                {!module.editing ? (
                                    <span className="wd-module-name" onClick={() => toggleModule(module._id)} style={{ cursor: "pointer", flex: 1, minWidth: 0 }}>
                                        {module.name}
                                    </span>
                                ) : (
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <FormControl
                                            className="d-inline-block"
                                            style={{ width: "50%" }}
                                            value={module.name}
                                            onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                            onKeyDown={(e) => e.key === "Enter" && dispatch(updateModule({ ...module, editing: false }))}
                                            autoFocus
                                        />
                                    </div>
                                )}

                                {/* Edit, delete, and add lesson buttons */}
                                <div className="wd-module-controls">
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={canEdit ? (id) => dispatch(deleteModule(id)) : undefined}
                                        editModule={canEdit ? (id) => dispatch(editModule(id)) : undefined}
                                        addLesson={canEdit ? handleAddLesson : undefined}
                                    />
                                </div>
                            </div>

                            {/* Show lessons when expanded */}
                            {!isCollapsed && module.lessons && module.lessons.length > 0 && (
                                <ListGroup className="wd-lessons-list">
                                    {module.lessons.map((lesson) => (
                                        <ListGroupItem key={lesson._id} className="wd-lesson">
                                            <BsGripVertical className="wd-grip-icon" />
                                            <span className="wd-lesson-name">{lesson.name}</span>
                                            <div className="wd-lesson-controls">
                                                <LessonControlButtons />
                                            </div>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}

                            {/* Empty state when no lessons */}
                            {!isCollapsed && (!module.lessons || module.lessons.length === 0) && (
                                <div className="p-3 text-muted text-center border-top">
                                    {canEdit ? "No items yet. Click + to add one." : "No items in this module."}
                                </div>
                            )}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>

            {/* Empty state when no modules */}
            {courseModules.length === 0 && (
                <div className="wd-no-modules">
                    <p>No modules available for this course yet.</p>
                    {canEdit && <p>Click + Module to create one!</p>}
                </div>
            )}
        </div>
    );
}
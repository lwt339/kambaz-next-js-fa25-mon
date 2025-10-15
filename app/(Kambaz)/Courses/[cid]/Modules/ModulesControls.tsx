// File: app/(Kambaz)/Courses/[cid]/Modules/ModulesControls.tsx
// Top control buttons for managing modules

"use client";

import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

// What props this component needs
interface ModulesControlsProps {
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
    onCollapseAll?: () => void;
    onExpandAll?: () => void;
    allCollapsed?: boolean;
    canEdit?: boolean;
}

export default function ModulesControls({
                                            moduleName,
                                            setModuleName,
                                            addModule,
                                            onCollapseAll,
                                            onExpandAll,
                                            allCollapsed = false,
                                            canEdit = false
                                        }: ModulesControlsProps) {
    // Track if module editor dialog is open
    const [show, setShow] = useState<boolean>(false);

    return (
        <div id="wd-modules-controls" className="text-nowrap d-flex flex-wrap justify-content-end gap-2">
            {/* Collapse/Expand all button */}
            {onCollapseAll && onExpandAll && (
                <Button variant="secondary" size="lg" id="wd-collapse-all" onClick={allCollapsed ? onExpandAll : onCollapseAll}>
                    {allCollapsed ? "Expand All" : "Collapse All"}
                </Button>
            )}

            {/* View progress button - instructors only */}
            {canEdit && (
                <Button variant="secondary" size="lg" id="wd-view-progress">
                    View Progress
                </Button>
            )}

            {/* Publish dropdown - instructors only */}
            {canEdit && (
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
                        <GreenCheckmark />
                        Publish All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item id="wd-publish-all">
                            <GreenCheckmark />
                            Publish All
                        </Dropdown.Item>
                        <Dropdown.Item id="wd-publish-all-modules-and-items">
                            <GreenCheckmark />
                            Publish all modules and items
                        </Dropdown.Item>
                        <Dropdown.Item id="wd-publish-modules-only">
                            <GreenCheckmark />
                            Publish modules only
                        </Dropdown.Item>
                        <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                            <MdDoNotDisturbAlt className="me-2 text-secondary" />
                            Unpublish all modules and items
                        </Dropdown.Item>
                        <Dropdown.Item id="wd-unpublish-modules-only">
                            <MdDoNotDisturbAlt className="me-2 text-secondary" />
                            Unpublish modules only
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}

            {/* Add module button and dialog - instructors only */}
            {canEdit && (
                <>
                    <Button variant="danger" size="lg" id="wd-add-module-btn" onClick={() => setShow(true)}>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Module
                    </Button>
                    <ModuleEditor
                        show={show}
                        handleClose={() => setShow(false)}
                        dialogTitle="Add Module"
                        moduleName={moduleName}
                        setModuleName={setModuleName}
                        addModule={addModule}
                    />
                </>
            )}
        </div>
    );
}
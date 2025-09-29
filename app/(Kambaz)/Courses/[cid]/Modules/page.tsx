"use client";
import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
    return (
        <div id="wd-modules">
            <ModulesControls />
            <br /><br /><br /><br />

            <ListGroup className="rounded-0">
                {/* Module 1 - Week 1 */}
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                        <span className="text-truncate flex-grow-1 me-2">
              Week 1 - Course Introduction, Syllabus, Agenda
            </span>
                        <div className="flex-shrink-0">
                            <ModuleControlButtons />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">LEARNING OBJECTIVES</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">Introduction to the course</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">Learn what is Web Development</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>

                {/* Module 2 - Week 2 */}
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                        <span className="text-truncate flex-grow-1 me-2">
              Week 2 - HTML & CSS
            </span>
                        <div className="flex-shrink-0">
                            <ModuleControlButtons />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">LESSON 1 - HTML Basics</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">LESSON 2 - CSS Styling</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>

                {/* Module 3 - Week 3 */}
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                        <span className="text-truncate flex-grow-1 me-2">
              Week 3 - JavaScript & React
            </span>
                        <div className="flex-shrink-0">
                            <ModuleControlButtons />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">LESSON 1 - JavaScript Fundamentals</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                            <span className="flex-grow-1">LESSON 2 - React Components</span>
                            <div className="flex-shrink-0">
                                <LessonControlButtons />
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
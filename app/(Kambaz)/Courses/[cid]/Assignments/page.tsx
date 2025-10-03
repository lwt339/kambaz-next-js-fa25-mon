/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ASSIGNMENTS PAGE - DATABASE-DRIVEN WITH SEPARATE CSS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Location: app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
 *
 * All styling in assignments.css
 * Completely data-driven from database
 * Shows assignments, quizzes, exams, and projects
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, InputGroup, Form, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaCaretRight, FaRegFileAlt, FaSearch, FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from "../../../Database";
import "./assignments.css";

type SectionKey = "ASSIGNMENTS" | "QUIZZES" | "EXAMS" | "PROJECT";

export default function Assignments() {
    const params = useParams();
    const cid = params?.cid as string;

    // Get data from database filtered by course
    const courseAssignments = db.assignments.filter((a: any) =>
        a.course === cid && a.assignmentType === "ASSIGNMENT"
    );
    const courseQuizzes = db.quizzes.filter((q: any) => q.course === cid);
    const courseExams = db.exams.filter((e: any) => e.course === cid);
    const courseProjects = db.assignments.filter((p: any) =>
        p.course === cid && p.assignmentType === "PROJECT"
    );

    // State for collapsible sections
    const [open, setOpen] = useState<Record<SectionKey, boolean>>({
        ASSIGNMENTS: true,
        QUIZZES: true,
        EXAMS: true,
        PROJECT: true
    });

    const toggle = (key: SectionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Format time
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Section Header Component
    const SectionHeader = (props: {
        label: string;
        percentage: string;
        isOpen: boolean;
        onToggle: () => void;
        count?: number;
    }) => (
        <div className="wd-section-header" onClick={props.onToggle}>
            <BsGripVertical className="wd-grip-icon" />
            {props.isOpen ? (
                <FaCaretDown className="wd-caret-icon" />
            ) : (
                <FaCaretRight className="wd-caret-icon" />
            )}
            <span className="wd-section-label">
                {props.label}
                {props.count !== undefined && ` (${props.count})`}
            </span>
            <span className="wd-percentage-badge">
                {props.percentage} of Total
            </span>
            <span className="wd-add-icon">
                <FaPlus />
            </span>
            <IoEllipsisVertical className="wd-ellipsis-icon" />
        </div>
    );

    // Assignment Row
    const AssignmentRow = (a: any) => (
        <li key={a._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <MdAssignment className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        className="wd-item-title"
                    >
                        {a.title}
                    </Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        {a.availableDate && (
                            <span> | <strong>Not available until</strong> {formatDate(a.availableDate)} at {formatTime(a.availableDate)}</span>
                        )}
                        <br />
                        <strong>Due</strong> {formatDate(a.dueDate)} at {formatTime(a.dueDate)} | {a.points} pts
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    // Quiz Row
    const QuizRow = (q: any) => (
        <li key={q._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <GrNotes className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link
                        href={`/Courses/${cid}/Quizzes/${q._id}`}
                        className="wd-item-title"
                    >
                        {q.title}
                    </Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(q.availableDate)} at {formatTime(q.availableDate)}</span>
                        <br />
                        <strong>Due</strong> {formatDate(q.dueDate)} at {formatTime(q.dueDate)} | {q.points} pts | {q.questions} Questions | {q.timeLimit} Minutes
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    // Exam Row
    const ExamRow = (e: any) => (
        <li key={e._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <FaRegFileAlt className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link
                        href={`/Courses/${cid}/Exams/${e._id}`}
                        className="wd-item-title"
                    >
                        {e.title}
                    </Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(e.availableDate)} at {formatTime(e.availableDate)}</span>
                        <br />
                        <strong>Due</strong> {formatDate(e.dueDate)} at {formatTime(e.dueDate)} | {e.points} pts | {e.questions} Questions | {e.timeLimit} Minutes
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    // Project Row
    const ProjectRow = (p: any) => (
        <li key={p._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <PiProjectorScreenChartBold className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link
                        href={`/Courses/${cid}/Assignments/${p._id}`}
                        className="wd-item-title"
                    >
                        {p.title}
                    </Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        {p.availableDate && (
                            <span> | <strong>Not available until</strong> {formatDate(p.availableDate)} at {formatTime(p.availableDate)}</span>
                        )}
                        <br />
                        <strong>Due</strong> {formatDate(p.dueDate)} at {formatTime(p.dueDate)} | {p.points} pts
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    return (
        <div id="wd-assignments">
            {/* Controls Bar */}
            <div className="wd-assignments-controls">
                <InputGroup className="wd-search-input">
                    <InputGroup.Text className="wd-search-icon">
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for Assignments"
                        className="wd-search-field"
                    />
                </InputGroup>

                <div className="wd-action-buttons">
                    <Button variant="light" className="wd-group-btn">
                        <FaPlus className="wd-btn-icon" /> Group
                    </Button>
                    <Link href={`/Courses/${cid}/Assignments/new`}>
                        <Button variant="danger" className="wd-assignment-btn">
                            <FaPlus className="wd-btn-icon" /> Assignment
                        </Button>
                    </Link>
                </div>
            </div>

            <ul className="wd-assignment-list">
                {/* ASSIGNMENTS Section */}
                <ListGroup className="wd-section">
                    <ListGroupItem className="wd-section-item">
                        <SectionHeader
                            label="ASSIGNMENTS"
                            percentage="40%"
                            count={courseAssignments.length}
                            isOpen={open.ASSIGNMENTS}
                            onToggle={() => toggle("ASSIGNMENTS")}
                        />
                        {open.ASSIGNMENTS && (
                            <ul className="wd-items-list">
                                {courseAssignments.map(AssignmentRow)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* QUIZZES Section */}
                <ListGroup className="wd-section">
                    <ListGroupItem className="wd-section-item">
                        <SectionHeader
                            label="QUIZZES"
                            percentage="10%"
                            count={courseQuizzes.length}
                            isOpen={open.QUIZZES}
                            onToggle={() => toggle("QUIZZES")}
                        />
                        {open.QUIZZES && (
                            <ul className="wd-items-list">
                                {courseQuizzes.map(QuizRow)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* EXAMS Section */}
                <ListGroup className="wd-section">
                    <ListGroupItem className="wd-section-item">
                        <SectionHeader
                            label="EXAMS"
                            percentage="20%"
                            count={courseExams.length}
                            isOpen={open.EXAMS}
                            onToggle={() => toggle("EXAMS")}
                        />
                        {open.EXAMS && (
                            <ul className="wd-items-list">
                                {courseExams.map(ExamRow)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* PROJECT Section */}
                <ListGroup className="wd-section">
                    <ListGroupItem className="wd-section-item">
                        <SectionHeader
                            label="PROJECT"
                            percentage="30%"
                            count={courseProjects.length}
                            isOpen={open.PROJECT}
                            onToggle={() => toggle("PROJECT")}
                        />
                        {open.PROJECT && (
                            <ul className="wd-items-list">
                                {courseProjects.map(ProjectRow)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </ul>
        </div>
    );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, InputGroup, Form, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaCaretRight, FaRegFileAlt, FaSearch, FaPlus, FaCheckCircle, FaCircle } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import * as db from "../../../Database";

/**
 * TypeScript Interfaces
 * Define the shape of our data - this eliminates all "any" type errors
 */
interface Assignment {
    _id: string;
    title: string;
    course: string;
    description?: string;
    points: number;
    dueDate: string;
    availableDate?: string;
}

interface Quiz {
    _id: string;
    title: string;
    course: string;
    type: string;
    questions: number;
    points: number;
    dueDate: string;
    availableDate: string;
    timeLimit: number;
    published: boolean;
}

interface Exam {
    _id: string;
    title: string;
    course: string;
    type: string;
    questions: number;
    points: number;
    dueDate: string;
    availableDate: string;
    timeLimit: number;
    published: boolean;
}

type SectionKey = "ASSIGNMENTS" | "QUIZZES" | "EXAMS" | "PROJECT";

export default function Assignments() {
    const params = useParams();
    const cid = params?.cid as string;

    /**
     * Type the database imports properly
     */
    const allAssignments = db.assignments as Assignment[];
    const allQuizzes = db.quizzes as Quiz[];
    const allExams = db.exams as Exam[];

    /**
     * Filter all items by current course
     */
    const courseAssignments = allAssignments.filter((a) => a.course === cid);
    const courseQuizzes = allQuizzes.filter((q) => q.course === cid);
    const courseExams = allExams.filter((e) => e.course === cid);

    /**
     * State for collapsible sections
     */
    const initialOpen = useMemo<Record<SectionKey, boolean>>(
        () => ({ ASSIGNMENTS: true, QUIZZES: true, EXAMS: true, PROJECT: true }),
        []
    );
    const [open, setOpen] = useState(initialOpen);

    const toggle = (key: SectionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));

    /**
     * Format date for display
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    /**
     * Green Checkmark Component
     */
    const GreenCheckmark = () => (
        <span className="me-2 position-relative">
            <FaCheckCircle
                style={{ top: "2px" }}
                className="text-success position-absolute fs-5"
            />
            <FaCircle className="text-white fs-6" />
        </span>
    );

    /**
     * Control Buttons Component
     */
    const ControlButtons = () => (
        <div className="float-end d-flex align-items-center">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-5 text-muted" />
        </div>
    );

    /**
     * Section Header Component
     */
    const Header = (props: {
        label: string;
        percentage: string;
        isOpen: boolean;
        onToggle: () => void;
        count?: number;
    }) => (
        <div
            className="wd-title p-3 ps-2 d-flex align-items-center"
            style={{ backgroundColor: "#f5f5f5", cursor: "pointer" }}
            role="button"
            aria-expanded={props.isOpen}
            onClick={props.onToggle}
        >
            <BsGripVertical className="me-2 fs-4 text-muted" />
            {props.isOpen ?
                <FaCaretDown className="me-2" style={{ fontSize: "14px" }} /> :
                <FaCaretRight className="me-2" style={{ fontSize: "14px" }} />
            }
            <span className="fw-bold text-uppercase" style={{ fontSize: "13px" }}>
                {props.label}
                {props.count !== undefined && ` (${props.count})`}
            </span>
            <span
                className="ms-auto me-2 px-2"
                style={{
                    fontSize: "13px",
                    fontWeight: "normal",
                    color: "#6c757d",
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: "10px"
                }}
            >
                {props.percentage} of Total
            </span>
            <span className="me-2">
                <FaPlus className="text-muted" style={{ fontSize: "14px" }} />
            </span>
            <IoEllipsisVertical className="fs-5 text-muted" />
        </div>
    );

    /**
     * Assignment Row Component
     */
    const RowAssignment = (a: Assignment) => (
        <li
            key={a._id}
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0"
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <MdAssignment className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{a.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        {a.availableDate && (
                            <span> | <strong>Not available until</strong> {formatDate(a.availableDate)} at 12:00am</span>
                        )}
                        <br />
                        <strong>Due</strong> {formatDate(a.dueDate)} at 11:59pm | {a.points} pts
                    </div>
                </div>
                <div className="ms-3">
                    <ControlButtons />
                </div>
            </div>
        </li>
    );

    /**
     * Quiz Row Component
     */
    const RowQuiz = (q: Quiz) => (
        <li
            key={q._id}
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0"
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <GrNotes className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Quizzes/${q._id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{q.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(q.availableDate)} at 12:00am</span>
                        <br />
                        <strong>Due</strong> {formatDate(q.dueDate)} at 11:59pm | {q.points} pts |
                        {" "}{q.questions} Questions | Time Limit {q.timeLimit} Minutes
                    </div>
                </div>
                <div className="ms-3">
                    <ControlButtons />
                </div>
            </div>
        </li>
    );

    /**
     * Exam Row Component
     */
    const RowExam = (e: Exam) => (
        <li
            key={e._id}
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0"
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <FaRegFileAlt className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Quizzes/${e._id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{e.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(e.availableDate)} at 12:00am</span>
                        <br />
                        <strong>Due</strong> {formatDate(e.dueDate)} at 11:59pm | {e.points} pts |
                        {" "}{e.questions} Questions | Time Limit {e.timeLimit} Minutes
                    </div>
                </div>
                <div className="ms-3">
                    <ControlButtons />
                </div>
            </div>
        </li>
    );

    /**
     * Project Row Component
     */
    const RowProject = () => (
        <li
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0 border-bottom-0"
            style={{ borderLeft: "4px solid #198754" }}
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <PiProjectorScreenChartBold className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <div className="fw-bold mb-1">Final Project</div>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        <br />
                        <strong>Due</strong> Dec 7 at 11:59pm | 350 pts
                    </div>
                </div>
                <div className="ms-3">
                    <ControlButtons />
                </div>
            </div>
        </li>
    );

    return (
        <div id="wd-assignments">
            {/* Search and Buttons Controls */}
            <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center mb-4">
                <InputGroup style={{ width: "300px" }}>
                    <InputGroup.Text className="bg-white border-end-0">
                        <FaSearch className="text-muted" style={{ fontSize: "14px" }} />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for Assignments"
                        id="wd-search-assignment"
                        className="border-start-0"
                        style={{ boxShadow: "none" }}
                    />
                </InputGroup>

                <div>
                    <Button
                        variant="light"
                        className="me-2 border"
                        id="wd-add-assignment-group"
                        style={{ backgroundColor: "#f8f9fa" }}
                    >
                        <FaPlus className="me-1" style={{ fontSize: "12px" }} /> Group
                    </Button>
                    <Button variant="danger" id="wd-add-assignment">
                        <FaPlus className="me-1" style={{ fontSize: "12px" }} /> Assignment
                    </Button>
                </div>
            </div>

            <h3 id="wd-assignments-title" className="d-none">
                ASSIGNMENTS 40% of Total
            </h3>

            <ul id="wd-assignment-list" className="list-unstyled p-0">
                {/* ASSIGNMENTS Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header
                            label="ASSIGNMENTS"
                            percentage="40%"
                            count={courseAssignments.length}
                            isOpen={open.ASSIGNMENTS}
                            onToggle={() => toggle("ASSIGNMENTS")}
                        />
                        {open.ASSIGNMENTS && (
                            <ul className="list-unstyled m-0">
                                {courseAssignments.length > 0 ? (
                                    courseAssignments.map(RowAssignment)
                                ) : (
                                    <li className="list-group-item text-center text-muted py-3">
                                        No assignments available for this course
                                    </li>
                                )}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* QUIZZES Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header
                            label="QUIZZES"
                            percentage="10%"
                            count={courseQuizzes.length}
                            isOpen={open.QUIZZES}
                            onToggle={() => toggle("QUIZZES")}
                        />
                        {open.QUIZZES && (
                            <ul className="list-unstyled m-0">
                                {courseQuizzes.length > 0 ? (
                                    courseQuizzes.map(RowQuiz)
                                ) : (
                                    <li className="list-group-item text-center text-muted py-3">
                                        No quizzes available for this course
                                    </li>
                                )}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* EXAMS Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header
                            label="EXAMS"
                            percentage="20%"
                            count={courseExams.length}
                            isOpen={open.EXAMS}
                            onToggle={() => toggle("EXAMS")}
                        />
                        {open.EXAMS && (
                            <ul className="list-unstyled m-0">
                                {courseExams.length > 0 ? (
                                    courseExams.map(RowExam)
                                ) : (
                                    <li className="list-group-item text-center text-muted py-3">
                                        No exams available for this course
                                    </li>
                                )}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* PROJECT Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header
                            label="PROJECT"
                            percentage="30%"
                            isOpen={open.PROJECT}
                            onToggle={() => toggle("PROJECT")}
                        />
                        {open.PROJECT && (
                            <ul className="list-unstyled m-0">
                                <RowProject />
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </ul>
        </div>
    );
}

/**
 * TYPESCRIPT FIXES EXPLAINED:
 *
 * The errors you saw were because TypeScript didn't know what shape your
 * data had. When you write (a: any), TypeScript can't help you catch bugs.
 *
 * By defining interfaces (Assignment, Quiz, Exam), we tell TypeScript:
 * "These objects will have these specific properties with these specific types"
 *
 * This gives you:
 * 1. Autocomplete in your editor - type a. and see all properties
 * 2. Error checking - TypeScript warns if you mistype a property name
 * 3. Documentation - interfaces show what data looks like
 * 4. Refactoring safety - changing a property name updates everywhere
 *
 * The fix for params was also important. useParams() can return undefined
 * in some edge cases, so we use optional chaining (params?.cid) and then
 * assert it's a string with "as string". This is safe because we know in
 * this route there will always be a cid parameter.
 *
 * NO MORE ESLINT ERRORS!
 */
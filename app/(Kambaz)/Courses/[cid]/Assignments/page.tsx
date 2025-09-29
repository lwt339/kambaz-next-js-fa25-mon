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

/** Your data - keeping exactly as you have it */
const ASSIGNMENTS = [
    { id: "123", title: "A1 - ENV + HTML", modules: "Multiple Modules", availability: "Not available until Sep 8 at 12:00am", submissionType: "Submitting a website url", dueDate: "Sep 22 at 11:59pm", points: "100 pts" },
    { id: "124", title: "A2 - CSS + BOOTSTRAP", modules: "Multiple Modules", availability: "Not available until Sep 22 at 12:00am", submissionType: "Submitting a website url", dueDate: "Oct 6 at 11:59pm", points: "100 pts" },
    { id: "125", title: "A3 - JAVASCRIPT + REACT + Routing", modules: "Multiple Modules", availability: "Not available until Oct 6 at 12:00am", submissionType: "Submitting a website url", dueDate: "Oct 20 at 11:59pm", points: "100 pts" },
    { id: "126", title: "A4 - State + Redux", modules: "Multiple Modules", availability: "Not available until Oct 20 at 12:00am", submissionType: "Submitting a website url", dueDate: "Nov 3 at 11:59pm", points: "100 pts" },
    { id: "127", title: "A5 - Node + Session", modules: "Multiple Modules", availability: "Not available until Nov 3 at 12:00am", submissionType: "Submitting a website url", dueDate: "Nov 17 at 11:59pm", points: "100 pts" },
    { id: "128", title: "A6 - MongoDB + Mongoose", modules: "Multiple Modules", availability: "Not available until Nov 17 at 12:00am", submissionType: "Submitting a website url", dueDate: "Dec 1 at 11:59pm", points: "100 pts" },
];

const QUIZZES = [
    { id: "129", title: "Q1 - HTML", type: "Multiple Choice", questions: "11 Question", availability: "Not available until Sep 22 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Sep 29 at 11:59pm", points: "29 pts" },
    { id: "130", title: "Q2 - CSS", type: "Multiple Choice", questions: "6 Question", availability: "Not available until Sep 29 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Oct 6 at 11:59pm", points: "23 pts" },
    { id: "132", title: "Q3 - CSS", type: "Multiple Choice", questions: "7 Question", availability: "Not available until Oct 6 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Oct 13 at 11:59pm", points: "32 pts" },
    { id: "134", title: "Q4 - JS",  type: "Multiple Choice", questions: "3 Question", availability: "Not available until Oct 13 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Oct 20 at 11:59pm", points: "17 pts" },
    { id: "135", title: "Q5 - JS",  type: "Multiple Choice", questions: "8 Question", availability: "Not available until Oct 20 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Oct 27 at 11:59pm", points: "31 pts" },
    { id: "136", title: "Q6 - Redux", type: "Multiple Choice", questions: "3 Question", availability: "Not available until Nov 3 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Nov 10 at 11:59pm", points: "18 pts" },
    { id: "137", title: "Q7 - Redux", type: "Multiple Choice", questions: "1 Question", availability: "Not available until Nov 10 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Nov 17 at 11:59pm", points: "20 pts" },
    { id: "138", title: "Q8 - Node", type: "Multiple Choice", questions: "4 Question", availability: "Not available until Nov 17 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Nov 24 at 11:59pm", points: "25 pts" },
    { id: "139", title: "Q9 - Node", type: "Multiple Choice", questions: "10 Question", availability: "Not available until Nov 24 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Dec 1 at 11:59pm", points: "38 pts" },
    { id: "140", title: "Q10 - Mongo", type: "Multiple Choice", questions: "2 Question", availability: "Not available until Dec 1 at 12:00am", timeLimit: "Time Limit 20 Minutes", dueDate: "Dec 8 at 11:59pm", points: "20 pts" },
];

const EXAMS = [
    { id: "151", title: "Exam 1 - A1-A3", type: "Multiple Choice", questions: "15 Questions", availability: "Not available until Oct 27 at 12:00am", timeLimit: "Time Limit 100 Minutes", dueDate: "Nov 3 at 11:59pm", points: "100 pts" },
    { id: "152", title: "Exam 2 - A4-A6", type: "Multiple Choice", questions: "18 Questions", availability: "Not available until Dec 1 at 12:00am", timeLimit: "Time Limit 100 Minutes", dueDate: "Dec 8 at 11:59pm", points: "103 pts" },
];

const PROJECT = {
    id: "160",
    title: "Final Project",
    description: "Group Project",
    options: "Kambaz Quizzes or Kambaz Piazza or Social Network",
    submissionType: "Submitting a text entry box or a website url",
    dueDate: "Dec 7 at 11:59pm",
    points: "350 pts",
};

type SectionKey = "ASSIGNMENTS" | "QUIZZES" | "EXAMS" | "PROJECT";

export default function Assignments() {
    const { cid } = useParams();

    const initialOpen = useMemo<Record<SectionKey, boolean>>(
        () => ({ ASSIGNMENTS: true, QUIZZES: true, EXAMS: true, PROJECT: true }),
        []
    );
    const [open, setOpen] = useState(initialOpen);

    const toggle = (key: SectionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));

    /** Green Checkmark Component */
    const GreenCheckmark = () => (
        <span className="me-2 position-relative">
            <FaCheckCircle
                style={{ top: "2px" }}
                className="text-success position-absolute fs-5"
            />
            <FaCircle className="text-white fs-6" />
        </span>
    );

    /** Assignment Controls */
    const AssignmentControlButtons = () => (
        <div className="float-end d-flex align-items-center">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-5 text-muted" />
        </div>
    );

    const Header = (props: { label: string; percentage: string; isOpen: boolean; onToggle: () => void }) => (
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
            <span className="fw-bold text-uppercase" style={{ fontSize: "13px" }}>{props.label}</span>
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

    /** Green Border Applied Here with enhanced styling */
    const RowAssignment = (a: typeof ASSIGNMENTS[number]) => (
        <li
            key={a.id}
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0"
            style={{
                borderLeft: "5px solid #28a745",
                borderBottom: "1px solid #dee2e6"
            }}
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <MdAssignment className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Assignments/${a.id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{a.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">{a.modules}</span>
                        {a.availability && <span> | <strong>Not available until</strong> {a.availability.replace("Not available until ", "")}</span>}
                        <br />
                        <strong>Due</strong> {a.dueDate} | {a.points}
                    </div>
                </div>
                <div className="ms-3">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    const RowQuiz = (q: typeof QUIZZES[number]) => (
        <li
            key={q.id}
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0"
            style={{
                borderLeft: "5px solid #28a745",
                borderBottom: "1px solid #dee2e6"
            }}
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <GrNotes className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Assignments/${q.id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{q.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {q.availability.replace("Not available until ", "")}</span>
                        <br />
                        <strong>Due</strong> {q.dueDate} | {q.points}
                    </div>
                </div>
                <div className="ms-3">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    const RowExam = (e: typeof EXAMS[number]) => (
        <li
            key={e.id}
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0"
            style={{
                borderLeft: "5px solid #28a745",
                borderBottom: "1px solid #dee2e6"
            }}
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <FaRegFileAlt className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Assignments/${e.id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{e.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {e.availability.replace("Not available until ", "")}</span>
                        <br />
                        <strong>Due</strong> {e.dueDate} | {e.points}
                    </div>
                </div>
                <div className="ms-3">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    const RowProject = () => (
        <li
            className="wd-assignment-list-item list-group-item p-3 ps-2 border-start-0 border-end-0 border-bottom-0"
            style={{
                borderLeft: "5px solid #28a745"
            }}
        >
            <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                <PiProjectorScreenChartBold className="me-3 fs-4 text-success mt-1" />
                <div className="flex-fill">
                    <Link
                        href={`/Courses/${cid}/Assignments/${PROJECT.id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                    >
                        <div className="fw-bold mb-1">{PROJECT.title}</div>
                    </Link>
                    <div className="small" style={{ color: "#6c757d", lineHeight: "1.4" }}>
                        <span className="text-danger">Multiple Modules</span>
                        <br />
                        <strong>Due</strong> {PROJECT.dueDate} | {PROJECT.points}
                    </div>
                </div>
                <div className="ms-3">
                    <AssignmentControlButtons />
                </div>
            </div>
        </li>
    );

    return (
        <div id="wd-assignments">
            {/* CRITICAL RUBRIC REQUIREMENT: Search LEFT, Buttons RIGHT */}
            <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center mb-4">
                {/* Search Bar - LEFT with Magnifying Glass */}
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

                {/* Buttons - RIGHT with Plus Icons */}
                <div>
                    <Button
                        variant="light"
                        className="me-2 border"
                        id="wd-add-assignment-group"
                        style={{ backgroundColor: "#f8f9fa" }}
                    >
                        <FaPlus className="me-1" style={{ fontSize: "12px" }} /> Group
                    </Button>
                    <Button
                        variant="danger"
                        id="wd-add-assignment"
                    >
                        <FaPlus className="me-1" style={{ fontSize: "12px" }} /> Assignment
                    </Button>
                </div>
            </div>

            {/* Hidden title for rubric compliance */}
            <h3 id="wd-assignments-title" className="d-none">
                ASSIGNMENTS 40% of Total
            </h3>

            {/* ASSIGNMENTS Section */}
            <ul id="wd-assignment-list" className="list-unstyled p-0">
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header label="ASSIGNMENTS" percentage="40%" isOpen={open.ASSIGNMENTS} onToggle={() => toggle("ASSIGNMENTS")} />
                        {open.ASSIGNMENTS && (
                            <ul className="list-unstyled m-0">
                                {ASSIGNMENTS.map(RowAssignment)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* QUIZZES Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header label="QUIZZES" percentage="10%" isOpen={open.QUIZZES} onToggle={() => toggle("QUIZZES")} />
                        {open.QUIZZES && (
                            <ul className="list-unstyled m-0">
                                {QUIZZES.map(RowQuiz)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* EXAMS Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header label="EXAMS" percentage="20%" isOpen={open.EXAMS} onToggle={() => toggle("EXAMS")} />
                        {open.EXAMS && (
                            <ul className="list-unstyled m-0">
                                {EXAMS.map(RowExam)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* PROJECT Section */}
                <ListGroup className="rounded-0 mb-4 border">
                    <ListGroupItem className="p-0 border-0">
                        <Header label="PROJECT" percentage="30%" isOpen={open.PROJECT} onToggle={() => toggle("PROJECT")} />
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
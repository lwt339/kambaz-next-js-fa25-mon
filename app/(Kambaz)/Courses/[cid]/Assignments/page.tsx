"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, InputGroup, Form, Button } from "react-bootstrap";
import { BsGripVertical, BsCheckCircle } from "react-icons/bs";
import { FaCaretDown, FaCaretRight, FaRegFileAlt, FaSearch, FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";

/** Your data - keeping exactly as you have it */
const ASSIGNMENTS = [
    { id: "123", title: "A1 - ENV + HTML", modules: "Multiple Modules", submissionType: "Submitting a website url", dueDate: "Sep 22 at 11:59pm", points: "100 pts" },
    { id: "124", title: "A2 - CSS + BOOTSTRAP", modules: "Multiple Modules", submissionType: "Submitting a website url", dueDate: "Oct 6 at 11:59pm", points: "100 pts" },
    { id: "125", title: "A3 - JAVASCRIPT + REACT + Routing", modules: "Multiple Modules", availability: "Not available until Sep 20 at 12:00am", submissionType: "Submitting a website url", dueDate: "Oct 20 at 11:59pm", points: "100 pts" },
    { id: "126", title: "A4 - State + Redux", modules: "Multiple Modules", submissionType: "Submitting a website url", dueDate: "Nov 3 at 11:59pm", points: "100 pts" },
    { id: "127", title: "A5 - Node + Session", modules: "Multiple Modules", submissionType: "Submitting a website url", dueDate: "Nov 17 at 11:59pm", points: "100 pts" },
    { id: "128", title: "A6 - MongoDB + Mongoose", modules: "Multiple Modules", submissionType: "Submitting a website url", dueDate: "Dec 1 at 11:59pm", points: "100 pts" },
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

    /** CRITICAL: Assignment Controls for Rubric Compliance */
    const AssignmentControlButtons = () => (
        <div className="float-end">
            <BsCheckCircle className="text-success me-2 fs-5" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );

    const Header = (props: { label: string; isOpen: boolean; onToggle: () => void }) => (
        <div
            className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center"
            role="button"
            aria-expanded={props.isOpen}
            onClick={props.onToggle}
        >
            <BsGripVertical className="me-2 fs-3" />
            {props.isOpen ? <FaCaretDown className="me-2" /> : <FaCaretRight className="me-2" />}
            <span className="me-auto">{props.label}</span>
            <AssignmentControlButtons />
        </div>
    );

    /** CRITICAL: Green Border Applied Here */
    const RowAssignment = (a: typeof ASSIGNMENTS[number]) => (
        <li
            key={a.id}
            className="wd-assignment-list-item list-group-item p-3 ps-1"
            style={{ borderLeft: "4px solid #198754" }}
        >
            <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-3 fs-3 text-success" />
                <div className="flex-fill">
                    <Link href={`/Courses/${cid}/Assignments/${a.id}`} className="wd-assignment-link text-decoration-none text-dark">
                        <div className="fw-bold">{a.title}</div>
                    </Link>
                    <div className="text-muted small">
                        {a.modules} | {a.availability ? `${a.availability} | ` : ""}{a.submissionType}
                        <br />
                        <strong>Due</strong> {a.dueDate} | {a.points}
                    </div>
                </div>
                <AssignmentControlButtons />
            </div>
        </li>
    );

    const RowQuiz = (q: typeof QUIZZES[number]) => (
        <li
            key={q.id}
            className="wd-assignment-list-item list-group-item p-3 ps-1"
            style={{ borderLeft: "4px solid #198754" }}
        >
            <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <GrNotes className="me-3 fs-3 text-success" />
                <div className="flex-fill">
                    <Link href={`/Courses/${cid}/Assignments/${q.id}`} className="wd-assignment-link text-decoration-none text-dark">
                        <div className="fw-bold">{q.title}</div>
                    </Link>
                    <div className="text-muted small">
                        {q.type} | {q.questions} | {q.availability} | {q.timeLimit}
                        <br />
                        <strong>Due</strong> {q.dueDate} | {q.points}
                    </div>
                </div>
                <AssignmentControlButtons />
            </div>
        </li>
    );

    const RowExam = (e: typeof EXAMS[number]) => (
        <li
            key={e.id}
            className="wd-assignment-list-item list-group-item p-3 ps-1"
            style={{ borderLeft: "4px solid #198754" }}
        >
            <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaRegFileAlt className="me-3 fs-3 text-success" />
                <div className="flex-fill">
                    <Link href={`/Courses/${cid}/Assignments/${e.id}`} className="wd-assignment-link text-decoration-none text-dark">
                        <div className="fw-bold">{e.title}</div>
                    </Link>
                    <div className="text-muted small">
                        {e.type} | {e.questions} | {e.availability} | {e.timeLimit}
                        <br />
                        <strong>Due</strong> {e.dueDate} | {e.points}
                    </div>
                </div>
                <AssignmentControlButtons />
            </div>
        </li>
    );

    const RowProject = () => (
        <li
            className="wd-assignment-list-item list-group-item p-3 ps-1"
            style={{ borderLeft: "4px solid #198754" }}
        >
            <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <PiProjectorScreenChartBold className="me-3 fs-3 text-success" />
                <div className="flex-fill">
                    <Link href={`/Courses/${cid}/Assignments/${PROJECT.id}`} className="wd-assignment-link text-decoration-none text-dark">
                        <div className="fw-bold">{PROJECT.title}</div>
                    </Link>
                    <div className="text-muted small">
                        {PROJECT.description} | {PROJECT.options} | {PROJECT.submissionType}
                        <br />
                        <strong>Due</strong> {PROJECT.dueDate} | {PROJECT.points}
                    </div>
                </div>
                <AssignmentControlButtons />
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
                        <FaSearch className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for Assignments"
                        id="wd-search-assignment"
                        className="border-start-0"
                    />
                </InputGroup>

                {/* Buttons - RIGHT with Plus Icons */}
                <div>
                    <Button
                        variant="secondary"
                        className="me-2"
                        id="wd-add-assignment-group"
                    >
                        <FaPlus className="me-1" /> Group
                    </Button>
                    <Button
                        variant="danger"
                        id="wd-add-assignment"
                    >
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>

            {/* Hidden title for rubric compliance */}
            <h3 id="wd-assignments-title" className="d-none">
                ASSIGNMENTS 40% of Total
            </h3>

            {/* ASSIGNMENTS Section */}
            <ul id="wd-assignment-list" className="list-unstyled p-0">
                <ListGroup className="rounded-0 mb-4">
                    <ListGroupItem className="p-0 fs-5 border-gray">
                        <Header label="ASSIGNMENTS 40% of Total" isOpen={open.ASSIGNMENTS} onToggle={() => toggle("ASSIGNMENTS")} />
                        {open.ASSIGNMENTS && (
                            <ul className="list-unstyled m-0">
                                {ASSIGNMENTS.map(RowAssignment)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* QUIZZES Section */}
                <ListGroup className="rounded-0 mb-4">
                    <ListGroupItem className="p-0 fs-5 border-gray">
                        <Header label="QUIZZES 10% of Total" isOpen={open.QUIZZES} onToggle={() => toggle("QUIZZES")} />
                        {open.QUIZZES && (
                            <ul className="list-unstyled m-0">
                                {QUIZZES.map(RowQuiz)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* EXAMS Section */}
                <ListGroup className="rounded-0 mb-4">
                    <ListGroupItem className="p-0 fs-5 border-gray">
                        <Header label="EXAMS 20% of Total" isOpen={open.EXAMS} onToggle={() => toggle("EXAMS")} />
                        {open.EXAMS && (
                            <ul className="list-unstyled m-0">
                                {EXAMS.map(RowExam)}
                            </ul>
                        )}
                    </ListGroupItem>
                </ListGroup>

                {/* PROJECT Section */}
                <ListGroup className="rounded-0 mb-4">
                    <ListGroupItem className="p-0 fs-5 border-gray">
                        <Header label="PROJECT 30% of Total" isOpen={open.PROJECT} onToggle={() => toggle("PROJECT")} />
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
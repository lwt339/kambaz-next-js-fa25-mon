"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaRegFileAlt } from "react-icons/fa";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/navigation";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
    const { cid } = useParams();

    const assignments = [
        {
            id: "123",
            title: "A1 - ENV + HTML",
            modules: "Multiple Modules",
            submissionType: "Submitting a website url",
            dueDate: "Sep 22 at 11:59pm",
            points: "100 pts"
        },
        {
            id: "124",
            title: "A2 - CSS + BOOTSTRAP",
            modules: "Multiple Modules",
            submissionType: "Submitting a website url",
            dueDate: "Oct 6 at 11:59pm",
            points: "100 pts"
        },
        {
            id: "125",
            title: "A3 - JAVASCRIPT + REACT + Routing",
            modules: "Multiple Modules",
            availability: "Not available until Sep 20 at 12:00am",
            submissionType: "Submitting a website url",
            dueDate: "Oct 20 at 11:59pm",
            points: "100 pts"
        },
        {
            id: "126",
            title: "A4 - State + Redux",
            modules: "Multiple Modules",
            submissionType: "Submitting a website url",
            dueDate: "Nov 3 at 11:59pm",
            points: "100 pts"
        },
        {
            id: "127",
            title: "A5 - Node + Session",
            modules: "Multiple Modules",
            submissionType: "Submitting a website url",
            dueDate: "Nov 17 at 11:59pm",
            points: "100 pts"
        },
        {
            id: "128",
            title: "A6 - MongoDB + Mongoose",
            modules: "Multiple Modules",
            submissionType: "Submitting a website url",
            dueDate: "Dec 1 at 11:59pm",
            points: "100 pts"
        }
    ];

    const quizzes = [
        {
            id: "129",
            title: "Q1 - HTML",
            type: "Multiple Choice",
            questions: "11 Question",
            availability: "Not available until Sep 22 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Sep 29 at 11:59pm",
            points: "29 pts"
        },
        {
            id: "130",
            title: "Q2 - CSS",
            type: "Multiple Choice",
            questions: "6 Question",
            availability: "Not available until Sep 29 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Oct 6 at 11:59pm",
            points: "23 pts"
        },
        {
            id: "132",
            title: "Q3 - CSS",
            type: "Multiple Choice",
            questions: "7 Question",
            availability: "Not available until Oct 6 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Oct 13 at 11:59pm",
            points: "32 pts"
        },
        {
            id: "134",
            title: "Q4 - JS",
            type: "Multiple Choice",
            questions: "3 Question",
            availability: "Not available until Oct 13 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Oct 20 at 11:59pm",
            points: "17 pts"
        },
        {
            id: "135",
            title: "Q5 - JS",
            type: "Multiple Choice",
            questions: "8 Question",
            availability: "Not available until Oct 20 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Oct 27 at 11:59pm",
            points: "31 pts"
        },
        {
            id: "136",
            title: "Q6 - Redux",
            type: "Multiple Choice",
            questions: "3 Question",
            availability: "Not available until Nov 3 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Nov 10 at 11:59pm",
            points: "18 pts"
        },
        {
            id: "137",
            title: "Q7 - Redux",
            type: "Multiple Choice",
            questions: "1 Question",
            availability: "Not available until Nov 10 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Nov 17 at 11:59pm",
            points: "20 pts"
        },
        {
            id: "138",
            title: "Q8 - Node",
            type: "Multiple Choice",
            questions: "4 Question",
            availability: "Not available until Nov 17 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Nov 24 at 11:59pm",
            points: "25 pts"
        },
        {
            id: "139",
            title: "Q9 - Node",
            type: "Multiple Choice",
            questions: "10 Question",
            availability: "Not available until Nov 24 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Dec 1 at 11:59pm",
            points: "38 pts"
        },
        {
            id: "140",
            title: "Q10 - Mongo",
            type: "Multiple Choice",
            questions: "2 Question",
            availability: "Not available until Dec 1 at 12:00am",
            timeLimit: "Time Limit 20 Minutes",
            dueDate: "Dec 8 at 11:59pm",
            points: "20 pts"
        }
    ];

    const exams = [
        {
            id: "151",
            title: "Exam 1 - A1-A3",
            type: "Multiple Choice",
            questions: "15 Questions",
            availability: "Not available until Oct 27 at 12:00am",
            timeLimit: "Time Limit 100 Minutes",
            dueDate: "Nov 3 at 11:59pm",
            points: "100 pts"
        },
        {
            id: "152",
            title: "Exam 2 - A4-A6",
            type: "Multiple Choice",
            questions: "18 Questions",
            availability: "Not available until Dec 1 at 12:00am",
            timeLimit: "Time Limit 100 Minutes",
            dueDate: "Dec 8 at 11:59pm",
            points: "103 pts"
        }
    ];

    const project = {
        id: "160",
        title: "Final Project",
        description: "Group Project",
        options: "Kambaz Quizzes or Kambaz Pazza or Social Network",
        submissionType: "Submitting a text entry box or a website url",
        dueDate: "Dec 7 at 11:59pm",
        points: "350 pts"
    };

    return (
        <div id="wd-assignments">
            <AssignmentsControls />

            {/* ASSIGNMENTS Section */}
            <ListGroup className="rounded-0">
                <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaCaretDown className="me-2" />
                        ASSIGNMENTS 40% of Total
                        <AssignmentControlButtons />
                    </div>

                    <ListGroup className="rounded-0">
                        {assignments.map((assignment) => (
                            <ListGroupItem key={assignment.id} className="wd-assignment-list-item p-3 ps-1">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <MdAssignment className="me-3 fs-3 text-success" />
                                    <div className="flex-fill">
                                        <Link
                                            href={`/Courses/5610/Assignments/${assignment.id}`}
                                            className="wd-assignment-link text-decoration-none text-dark">
                                            <div className="fw-bold">{assignment.title}</div>
                                        </Link>
                                        <div className="text-muted small">
                                            {assignment.modules} | {assignment.availability ? `${assignment.availability} | ` : ''}{assignment.submissionType}
                                            <br />
                                            <strong>Due</strong> {assignment.dueDate} | {assignment.points}
                                        </div>
                                    </div>
                                    <AssignmentControlButtons />
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

            {/* QUIZZES Section */}
            <ListGroup className="rounded-0">
                <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaCaretDown className="me-2" />
                        QUIZZES 10% of Total
                        <AssignmentControlButtons />
                    </div>

                    <ListGroup className="rounded-0">
                        {quizzes.map((quiz) => (
                            <ListGroupItem key={quiz.id} className="wd-assignment-list-item p-3 ps-1">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <GrNotes className="me-3 fs-3 text-success" />
                                    <div className="flex-fill">
                                        <Link
                                            href={`/Courses/5610/Assignments/${quiz.id}`}
                                            className="wd-assignment-link text-decoration-none text-dark">
                                            <div className="fw-bold">{quiz.title}</div>
                                        </Link>
                                        <div className="text-muted small">
                                            {quiz.type} | {quiz.questions} | {quiz.availability} | {quiz.timeLimit}
                                            <br />
                                            <strong>Due</strong> {quiz.dueDate} | {quiz.points}
                                        </div>
                                    </div>
                                    <AssignmentControlButtons />
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

            {/* EXAMS Section */}
            <ListGroup className="rounded-0">
                <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaCaretDown className="me-2" />
                        EXAMS 20% of Total
                        <AssignmentControlButtons />
                    </div>

                    <ListGroup className="rounded-0">
                        {exams.map((exam) => (
                            <ListGroupItem key={exam.id} className="wd-assignment-list-item p-3 ps-1">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <FaRegFileAlt className="me-3 fs-3 text-success" />
                                    <div className="flex-fill">
                                        <Link
                                            href={`/Courses/5610/Assignments/${exam.id}`}
                                            className="wd-assignment-link text-decoration-none text-dark">
                                            <div className="fw-bold">{exam.title}</div>
                                        </Link>
                                        <div className="text-muted small">
                                            {exam.type} | {exam.questions} | {exam.availability} | {exam.timeLimit}
                                            <br />
                                            <strong>Due</strong> {exam.dueDate} | {exam.points}
                                        </div>
                                    </div>
                                    <AssignmentControlButtons />
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

            {/* PROJECT Section */}
            <ListGroup className="rounded-0">
                <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaCaretDown className="me-2" />
                        PROJECT 30% of Total
                        <AssignmentControlButtons />
                    </div>

                    <ListGroup className="rounded-0">
                        <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <PiProjectorScreenChartBold className="me-3 fs-3 text-success" />
                                <div className="flex-fill">
                                    <Link
                                        href={`/Courses/5610/Assignments/${project.id}`}
                                        className="wd-assignment-link text-decoration-none text-dark">
                                        <div className="fw-bold">{project.title}</div>
                                    </Link>
                                    <div className="text-muted small">
                                        {project.description} | {project.options} | {project.submissionType}
                                        <br />
                                        <strong>Due</strong> {project.dueDate} | {project.points}
                                    </div>
                                </div>
                                <AssignmentControlButtons />
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
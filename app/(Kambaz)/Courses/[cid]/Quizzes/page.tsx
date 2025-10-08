"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, InputGroup, Form, Button } from "react-bootstrap";
import { BsGripVertical, BsSearch, BsPlus, BsCaretDownFill } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
// database
import * as db from "../../../Database";
import type { Quiz } from "../../../Database/type";


export default function QuizzesPage() {

    const { cid } = useParams<{ cid: string }>();

    const typedQuizzes = db.quizzes as Quiz[];

    const courseQuizzes = typedQuizzes.filter((quiz: Quiz) => quiz.course === cid);


    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div id="wd-quizzes" className="p-4">
            {/* Controls Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* Search Bar */}
                <InputGroup style={{ width: "300px" }}>
                    <InputGroup.Text className="bg-white border-end-0">
                        <BsSearch className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for Quiz"
                        className="border-start-0"
                        style={{ boxShadow: "none" }}
                    />
                </InputGroup>

                {/* Add Quiz Button */}
                <Button variant="danger">
                    <BsPlus className="fs-5 me-1" style={{ marginBottom: "2px" }} />
                    Quiz
                </Button>
            </div>

            {/* Quizzes List */}
            <ListGroup className="rounded-0">
                {/* Header */}
                <ListGroupItem className="bg-secondary border-0 p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <BsCaretDownFill className="me-2" />
                            <strong>QUIZZES</strong>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-light text-dark">
                                10% of Total
                            </span>
                            <BsPlus className="fs-5" />
                            <IoEllipsisVertical className="fs-5" />
                        </div>
                    </div>
                </ListGroupItem>


                {courseQuizzes.map((quiz: Quiz) => (
                    <ListGroupItem
                        key={quiz._id}
                        className="border-start-0 border-end-0 p-3"
                    >
                        <div className="d-flex align-items-start justify-content-between">
                            {/* Quiz icon and details */}
                            <div className="d-flex align-items-start flex-grow-1">
                                <BsGripVertical className="me-2 fs-4 text-muted mt-1" />
                                <GrNotes className="me-3 fs-4 text-success mt-1" />

                                <div className="flex-fill">
                                    <Link
                                        href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                                        className="text-decoration-none text-dark fw-bold"
                                    >
                                        {quiz.title}
                                    </Link>

                                    <div className="small text-muted mt-1">
                                        <div>
                                            <span className="text-danger">Multiple Modules</span>
                                            {" | "}
                                            <strong>Not available until</strong>{" "}
                                            {formatDate(quiz.availableDate)} at 12:00am
                                        </div>
                                        <div>
                                            <strong>Due</strong>{" "}
                                            {formatDate(quiz.dueDate)} at 11:59pm
                                            {" | "}
                                            <strong>{quiz.points} pts</strong>
                                            {" | "}
                                            <strong>{quiz.questions} Questions</strong>
                                            {" | "}
                                            <strong>Time Limit {quiz.timeLimit} Minutes</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status icons and menu */}
                            <div className="d-flex align-items-center gap-2">
                                <FaCheckCircle className="text-success" />
                                <IoEllipsisVertical className="fs-5 text-muted" />
                            </div>
                        </div>
                    </ListGroupItem>
                ))}

                {courseQuizzes.length === 0 && (
                    <ListGroupItem className="text-center text-muted py-4">
                        No quizzes available for this course
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    );
}
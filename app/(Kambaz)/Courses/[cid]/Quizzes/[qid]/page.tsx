// File: app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/page.tsx
// Quiz editor for creating and modifying quizzes

"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import AssignToInput from "../../Assignments/[aid]/AssignToInput";
import { addQuiz, updateQuiz } from "../reducer";
import { Quiz } from "../../../../Database/type";
import { RootState, AppDispatch } from "../../../../store";
import "../quizzes.css";

export default function QuizEditor() {
    const params = useParams();
    const cid = params.cid as string;
    const qid = params.qid as string;
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Check if we're editing an existing quiz
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const existingQuiz = quizzes.find((q: Quiz) => q._id === qid);
    const isNew = qid === "new" || !existingQuiz;

    // Track all the form fields
    const [title, setTitle] = useState<string>("");
    const [quizType, setQuizType] = useState<string>("Graded Quiz");
    const [points, setPoints] = useState<number>(100);
    const [questions, setQuestions] = useState<number>(10);
    const [timeLimit, setTimeLimit] = useState<number>(20);
    const [dueDate, setDueDate] = useState<string>("");
    const [availableDate, setAvailableDate] = useState<string>("");
    const [untilDate, setUntilDate] = useState<string>("");
    const [published, setPublished] = useState<boolean>(true);
    const [assignedTo, setAssignedTo] = useState<string[]>(["Everyone"]);

    // Load form data when component mounts
    useEffect(() => {
        if (isNew) {
            // Set up defaults for new quiz
            const now = new Date();
            const defaultDue = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

            setTitle("New Quiz");
            setQuizType("Graded Quiz");
            setPoints(100);
            setQuestions(10);
            setTimeLimit(20);
            setDueDate(defaultDue.toISOString().slice(0, 16));
            setAvailableDate(now.toISOString().slice(0, 16));
            setUntilDate("");
            setPublished(true);
            setAssignedTo(["Everyone"]);
        } else if (existingQuiz) {
            // Fill form with existing quiz data
            setTitle(existingQuiz.title);
            setQuizType(existingQuiz.type);
            setPoints(existingQuiz.points);
            setQuestions(existingQuiz.questions);
            setTimeLimit(existingQuiz.timeLimit);
            setDueDate(formatDateForInput(existingQuiz.dueDate));
            setAvailableDate(formatDateForInput(existingQuiz.availableDate));
            setUntilDate("");
            setPublished(existingQuiz.published);
            setAssignedTo(["Everyone"]);
        }
    }, [qid, isNew, existingQuiz]);

    // Convert date strings to format that datetime-local input needs
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return "";
        try {
            return new Date(dateString).toISOString().slice(0, 16);
        } catch {
            return "";
        }
    };

    // Save the quiz
    const handleSave = () => {
        if (!title.trim()) {
            alert("Quiz title is required");
            return;
        }

        const quizData: Quiz = {
            _id: isNew ? "" : existingQuiz!._id,
            title: title.trim(),
            course: cid,
            type: quizType,
            questions,
            points,
            dueDate,
            availableDate,
            timeLimit,
            published
        };

        if (isNew) {
            dispatch(addQuiz(quizData));
        } else {
            dispatch(updateQuiz(quizData));
        }

        router.push(`/Courses/${cid}/Quizzes`);
    };

    // Save and immediately start creating another one
    const handleSaveAndCreateAnother = () => {
        if (!title.trim()) {
            alert("Quiz title is required");
            return;
        }

        const quizData: Quiz = {
            _id: isNew ? "" : existingQuiz!._id,
            title: title.trim(),
            course: cid,
            type: quizType,
            questions,
            points,
            dueDate,
            availableDate,
            timeLimit,
            published
        };

        if (isNew) {
            dispatch(addQuiz(quizData));
        } else {
            dispatch(updateQuiz(quizData));
        }

        router.push(`/Courses/${cid}/Quizzes/new`);
    };

    const handleCancel = () => router.push(`/Courses/${cid}/Quizzes`);

    return (
        <div id="wd-quiz-editor" className="container-fluid">
            <h3 className="mb-4">
                {isNew ? "Create New Quiz" : `Edit: ${existingQuiz?.title}`}
            </h3>

            <Form>
                {/* Quiz name */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-quiz-name">Quiz Name</Form.Label>
                    <Form.Control
                        id="wd-quiz-name"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter quiz title"
                    />
                </Form.Group>

                {/* Instructions */}
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="wd-quiz-instructions">Quiz Instructions</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="wd-quiz-instructions"
                        rows={10}
                        placeholder="Enter quiz instructions (optional)"
                    />
                </Form.Group>

                {/* Points */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Points</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            id="wd-quiz-points"
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                            min="0"
                        />
                    </Col>
                </Row>

                {/* Quiz type selector */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-quiz-type">
                        Quiz Type
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            id="wd-quiz-type"
                            value={quizType}
                            onChange={(e) => {
                                const newType = e.target.value;
                                if (newType === "Exam") {
                                    if (window.confirm("This will take you to the Exam editor. Any unsaved changes will be lost. Continue?")) {
                                        router.push(`/Courses/${cid}/Exams/new`);
                                    }
                                } else {
                                    setQuizType(newType);
                                }
                            }}
                        >
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                            <option value="Exam">Exam</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Display grade format */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Display Grade as</Form.Label>
                    <Col sm={9}>
                        <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                            <option value="Complete">Complete/Incomplete</option>
                            <option value="Letter">Letter Grade</option>
                            <option value="GPA">GPA Scale</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Quiz settings */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Quiz Settings</Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3 bg-light">
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-quiz-questions">Number of Questions</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="wd-quiz-questions"
                                    value={questions}
                                    onChange={(e) => setQuestions(parseInt(e.target.value) || 0)}
                                    min="1"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-quiz-time-limit">Time Limit (minutes)</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="wd-quiz-time-limit"
                                    value={timeLimit}
                                    onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                                    min="1"
                                />
                            </Form.Group>

                            <Form.Check
                                type="checkbox"
                                id="wd-shuffle-answers"
                                label="Shuffle Answers"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-multiple-attempts"
                                label="Allow Multiple Attempts"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-show-correct"
                                label="Show Correct Answers"
                            />
                        </div>
                    </Col>
                </Row>

                {/* Assignment section */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Assign</Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3 bg-light">
                            <AssignToInput
                                value={assignedTo}
                                onChange={setAssignedTo}
                                label="Assign to"
                                boldLabel={true}
                                hideHelperText={true}
                            />

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold" htmlFor="wd-quiz-due-date">Due Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    id="wd-quiz-due-date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-quiz-available-from">
                                            Available from
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-quiz-available-from"
                                            value={availableDate}
                                            onChange={(e) => setAvailableDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-quiz-available-until">
                                            Until
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-quiz-available-until"
                                            value={untilDate}
                                            onChange={(e) => setUntilDate(e.target.value)}
                                            placeholder="Optional"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                {/* Publish checkbox */}
                <Row className="mb-3">
                    <Col sm={3}></Col>
                    <Col sm={9}>
                        <Form.Check
                            type="checkbox"
                            id="wd-quiz-published"
                            label="Publish Quiz"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                        />
                    </Col>
                </Row>

                <hr className="my-4" />

                {/* Action buttons */}
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleCancel} className="px-4">
                        Cancel
                    </Button>

                    {isNew && (
                        <Button variant="outline-danger" onClick={handleSaveAndCreateAnother} className="px-4">
                            <FaPlus className="me-2 wd-quiz-plus-icon" />
                            Save & Create Another
                        </Button>
                    )}

                    <Button variant="danger" onClick={handleSave} className="px-4">
                        {isNew ? "Create Quiz" : "Save Changes"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
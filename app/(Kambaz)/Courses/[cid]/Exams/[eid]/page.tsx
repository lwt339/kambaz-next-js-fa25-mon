// File: app/(Kambaz)/Courses/[cid]/Exams/[eid]/page.tsx
// Exam editor for creating and modifying exams

"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import AssignToInput from "../../Assignments/[aid]/AssignToInput";
import { addExam, updateExam } from "../reducer";
import { Exam } from "../../../../Database/type";
import { RootState, AppDispatch } from "../../../../store";
import "../../Quizzes/quizzes.css";

export default function ExamEditor() {
    const params = useParams();
    const cid = params.cid as string;
    const eid = params.eid as string;
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Check if we're editing an existing exam
    const { exams } = useSelector((state: RootState) => state.examsReducer);
    const existingExam = exams.find((e: Exam) => e._id === eid);
    const isNew = eid === "new" || !existingExam;

    // Track all form fields
    const [title, setTitle] = useState<string>("");
    const [examType, setExamType] = useState<string>("Comprehensive");
    const [points, setPoints] = useState<number>(100);
    const [questions, setQuestions] = useState<number>(50);
    const [timeLimit, setTimeLimit] = useState<number>(120);
    const [dueDate, setDueDate] = useState<string>("");
    const [availableDate, setAvailableDate] = useState<string>("");
    const [untilDate, setUntilDate] = useState<string>("");
    const [published, setPublished] = useState<boolean>(true);
    const [assignedTo, setAssignedTo] = useState<string[]>(["Everyone"]);

    // Load form data when component mounts
    useEffect(() => {
        if (isNew) {
            // Set up defaults for new exam
            const now = new Date();
            const defaultDue = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

            setTitle("New Exam");
            setExamType("Comprehensive");
            setPoints(100);
            setQuestions(50);
            setTimeLimit(120);
            setDueDate(defaultDue.toISOString().slice(0, 16));
            setAvailableDate(now.toISOString().slice(0, 16));
            setUntilDate("");
            setPublished(true);
            setAssignedTo(["Everyone"]);
        } else if (existingExam) {
            // Fill form with existing exam data
            setTitle(existingExam.title);
            setExamType(existingExam.type);
            setPoints(existingExam.points);
            setQuestions(existingExam.questions);
            setTimeLimit(existingExam.timeLimit);
            setDueDate(formatDateForInput(existingExam.dueDate));
            setAvailableDate(formatDateForInput(existingExam.availableDate));
            setUntilDate("");
            setPublished(existingExam.published);
            setAssignedTo(["Everyone"]);
        }
    }, [eid, isNew, existingExam]);

    // Convert date strings to format that datetime-local input needs
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return "";
        try {
            return new Date(dateString).toISOString().slice(0, 16);
        } catch {
            return "";
        }
    };

    // Save the exam
    const handleSave = () => {
        if (!title.trim()) {
            alert("Exam title is required");
            return;
        }

        const examData: Exam = {
            _id: isNew ? "" : existingExam!._id,
            title: title.trim(),
            course: cid,
            type: examType,
            questions,
            points,
            dueDate,
            availableDate,
            timeLimit,
            published
        };

        if (isNew) {
            dispatch(addExam(examData));
        } else {
            dispatch(updateExam(examData));
        }

        router.push(`/Courses/${cid}/Quizzes`);
    };

    // Save and immediately start creating another one
    const handleSaveAndCreateAnother = () => {
        if (!title.trim()) {
            alert("Exam title is required");
            return;
        }

        const examData: Exam = {
            _id: isNew ? "" : existingExam!._id,
            title: title.trim(),
            course: cid,
            type: examType,
            questions,
            points,
            dueDate,
            availableDate,
            timeLimit,
            published
        };

        if (isNew) {
            dispatch(addExam(examData));
        } else {
            dispatch(updateExam(examData));
        }

        router.push(`/Courses/${cid}/Exams/new`);
    };

    const handleCancel = () => router.push(`/Courses/${cid}/Quizzes`);

    return (
        <div id="wd-quiz-editor" className="container-fluid">
            <h3 className="mb-4">
                {isNew ? "Create New Exam" : `Edit: ${existingExam?.title}`}
            </h3>

            <Form>
                {/* Exam name */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-exam-name">Exam Name</Form.Label>
                    <Form.Control
                        id="wd-exam-name"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter exam title"
                    />
                </Form.Group>

                {/* Instructions */}
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="wd-exam-instructions">Exam Instructions</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="wd-exam-instructions"
                        rows={10}
                        placeholder="Enter exam instructions (optional)"
                    />
                </Form.Group>

                {/* Points */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Points</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            id="wd-exam-points"
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                            min="0"
                        />
                    </Col>
                </Row>

                {/* Exam type selector */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-exam-type">
                        Exam Type
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            id="wd-exam-type"
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                        >
                            <option value="Comprehensive">Comprehensive</option>
                            <option value="Multiple Choice">Multiple Choice</option>
                            <option value="Essay">Essay</option>
                            <option value="Mixed Format">Mixed Format</option>
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

                {/* Exam settings */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Exam Settings</Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3 bg-light">
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-exam-questions">Number of Questions</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="wd-exam-questions"
                                    value={questions}
                                    onChange={(e) => setQuestions(parseInt(e.target.value) || 0)}
                                    min="1"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-exam-time-limit">Time Limit (minutes)</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="wd-exam-time-limit"
                                    value={timeLimit}
                                    onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                                    min="1"
                                />
                            </Form.Group>

                            <Form.Check
                                type="checkbox"
                                id="wd-require-respondus"
                                label="Require LockDown Browser"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-require-webcam"
                                label="Require Webcam"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-one-question"
                                label="Show One Question at a Time"
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
                                <Form.Label className="fw-bold" htmlFor="wd-exam-due-date">Due Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    id="wd-exam-due-date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-exam-available-from">
                                            Available from
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-exam-available-from"
                                            value={availableDate}
                                            onChange={(e) => setAvailableDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-exam-available-until">
                                            Until
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-exam-available-until"
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
                            id="wd-exam-published"
                            label="Publish Exam"
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
                        {isNew ? "Create Exam" : "Save Changes"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
// app/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
// Assignment editor that smartly routes to quiz or exam editors when needed

"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import AssignToInput from "./AssignToInput";
import { addAssignment, updateAssignment } from "../reducer";
import { Assignment } from "../../../../Database/type";
import { RootState } from "../../../../store";
import "../assignments.css";

type AssignmentGroupType = "ASSIGNMENT" | "PROJECTS" | "QUIZZES" | "EXAMS";

export default function AssignmentEditor() {
    const params = useParams();
    const searchParams = useSearchParams();
    const cid = params.cid as string;
    const aid = params.aid as string;
    const router = useRouter();
    const dispatch = useDispatch();

    // Check if we got a type parameter in the URL
    const typeFromUrl = searchParams.get('type') as "ASSIGNMENT" | "PROJECTS" | null;

    // Grab assignments from Redux to see if we're editing an existing one
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const existingAssignment = assignments.find((a: Assignment) => a._id === aid);
    const isNew = aid === "new" || !existingAssignment;

    // Keep track of all the form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(100);
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [untilDate, setUntilDate] = useState("");
    const [assignmentType, setAssignmentType] = useState<AssignmentGroupType>("ASSIGNMENT");
    const [assignedTo, setAssignedTo] = useState<string[]>(["Everyone"]);
    const [submissionType, setSubmissionType] = useState("Online");

    // Load up the form with data when component mounts
    useEffect(() => {
        if (isNew) {
            // Set up defaults for a new assignment
            const now = new Date();
            const defaultDue = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

            const defaultType = typeFromUrl || "ASSIGNMENT";
            const defaultTitle = defaultType === "PROJECTS" ? "New Project" : "New Assignment";

            setTitle(defaultTitle);
            setDescription("");
            setPoints(100);
            setDueDate(defaultDue.toISOString().slice(0, 16));
            setAvailableDate(now.toISOString().slice(0, 16));
            setUntilDate("");
            setAssignmentType(defaultType);
            setAssignedTo(["Everyone"]);
            setSubmissionType("Online");
        } else if (existingAssignment) {
            // Fill in the form with existing assignment data
            setTitle(existingAssignment.title);
            setDescription(existingAssignment.description);
            setPoints(existingAssignment.points);
            setDueDate(formatDateForInput(existingAssignment.dueDate));
            setAvailableDate(formatDateForInput(existingAssignment.availableDate));
            setUntilDate("");
            setAssignmentType(existingAssignment.assignmentType === "PROJECTS" ? "PROJECTS" : "ASSIGNMENT");
            setAssignedTo(["Everyone"]);
            setSubmissionType("Online");
        }
    }, [aid, isNew, existingAssignment, typeFromUrl]);

    // Convert date strings to the format the input expects
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return "";
        try {
            return new Date(dateString).toISOString().slice(0, 16);
        } catch {
            return "";
        }
    };

    // Handle when user clicks Save button
    const handleSave = () => {
        if (!title.trim()) {
            alert("Assignment title is required");
            return;
        }

        const finalType: "ASSIGNMENT" | "PROJECTS" =
            assignmentType === "PROJECTS" ? "PROJECTS" : "ASSIGNMENT";

        const assignmentData: Assignment = {
            _id: isNew ? "" : existingAssignment!._id,
            title: title.trim(),
            course: cid,
            description: description.trim(),
            points,
            dueDate,
            availableDate,
            assignmentType: finalType
        };

        if (isNew) {
            dispatch(addAssignment(assignmentData));
        } else {
            dispatch(updateAssignment(assignmentData));
        }

        router.push(`/Courses/${cid}/Assignments`);
    };

    // Handle Save & Create Another button
    const handleSaveAndCreateAnother = () => {
        if (!title.trim()) {
            alert("Assignment title is required");
            return;
        }

        const finalType: "ASSIGNMENT" | "PROJECTS" =
            assignmentType === "PROJECTS" ? "PROJECTS" : "ASSIGNMENT";

        const assignmentData: Assignment = {
            _id: isNew ? "" : existingAssignment!._id,
            title: title.trim(),
            course: cid,
            description: description.trim(),
            points,
            dueDate,
            availableDate,
            assignmentType: finalType
        };

        if (isNew) {
            dispatch(addAssignment(assignmentData));
        } else {
            dispatch(updateAssignment(assignmentData));
        }

        // Route to the right editor based on type
        if (assignmentType === "PROJECTS") {
            router.push(`/Courses/${cid}/Assignments/new?type=PROJECTS`);
        } else if (assignmentType === "QUIZZES") {
            router.push(`/Courses/${cid}/Quizzes/new`);
        } else if (assignmentType === "EXAMS") {
            router.push(`/Courses/${cid}/Exams/new`);
        } else {
            router.push(`/Courses/${cid}/Assignments/new`);
        }
    };

    // Handle when user changes the Assignment Group dropdown
    const handleAssignmentGroupChange = (newType: AssignmentGroupType) => {
        // If user picks Quiz or Exam, we need to route them to the right editor
        if (newType === "QUIZZES") {
            if (window.confirm("This will take you to the Quiz editor. Any unsaved changes will be lost. Continue?")) {
                router.push(`/Courses/${cid}/Quizzes/new`);
            }
        } else if (newType === "EXAMS") {
            if (window.confirm("This will take you to the Exam editor. Any unsaved changes will be lost. Continue?")) {
                router.push(`/Courses/${cid}/Exams/new`);
            }
        } else {
            // Just update the type for Assignment or Project
            setAssignmentType(newType);
        }
    };

    // User clicked Cancel
    const handleCancel = () => {
        router.push(`/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignment-editor" className="container-fluid">
            <h3 className="mb-4">
                {isNew ? `Create New ${assignmentType === "PROJECTS" ? "Project" : "Assignment"}` : `Edit: ${existingAssignment?.title}`}
            </h3>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">
                        {assignmentType === "PROJECTS" ? "Project" : "Assignment"} Name
                    </Form.Label>
                    <Form.Control
                        id="wd-name"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={`Enter ${assignmentType === "PROJECTS" ? "project" : "assignment"} title`}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label htmlFor="wd-description">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="wd-description"
                        rows={10}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Points</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            id="wd-points"
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                            min="0"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-group">
                        Assignment Group
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            id="wd-group"
                            value={assignmentType}
                            onChange={(e) => {
                                const newType = e.target.value as AssignmentGroupType;
                                handleAssignmentGroupChange(newType);
                            }}
                        >
                            <option value="ASSIGNMENT">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECTS">PROJECTS</option>
                        </Form.Select>
                    </Col>
                </Row>

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

                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">Submission Type</Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3 bg-light">
                            <Form.Select
                                id="wd-submission-type"
                                value={submissionType}
                                onChange={(e) => setSubmissionType(e.target.value)}
                                className="mb-3"
                            >
                                <option value="Online">Online</option>
                                <option value="Paper">On Paper</option>
                                <option value="External">External Tool</option>
                                <option value="None">No Submission</option>
                            </Form.Select>

                            {submissionType === "Online" && (
                                <>
                                    <Form.Label className="fw-bold mb-2">Online Entry Options</Form.Label>
                                    <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
                                </>
                            )}

                            {submissionType === "Paper" && (
                                <>
                                    <Form.Label className="fw-bold mb-2">Paper Entry Options</Form.Label>
                                    <Form.Check type="checkbox" id="wd-handwritten" label="Handwritten Submission" className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-printed" label="Printed Submission" defaultChecked className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-include-cover" label="Include Cover Page" className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-stapled" label="Stapled Pages" />
                                </>
                            )}

                            {submissionType === "External" && (
                                <>
                                    <Form.Label className="fw-bold mb-2">External Tool Options</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="wd-external-tool-url">External Tool URL</Form.Label>
                                        <Form.Control
                                            type="url"
                                            id="wd-external-tool-url"
                                            placeholder="https://example.com/tool"
                                        />
                                    </Form.Group>
                                    <Form.Check type="checkbox" id="wd-new-tab" label="Launch in New Tab" defaultChecked className="mb-2" />
                                    <Form.Check type="checkbox" id="wd-accept-grades" label="Accept Grades from Tool" className="mb-2" />
                                </>
                            )}

                            {submissionType === "None" && (
                                <div className="text-muted small">
                                    No submission required for this assignment.
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>

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
                                <Form.Label className="fw-bold" htmlFor="wd-due-date">Due Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    id="wd-due-date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-available-from">Available from</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-from"
                                            value={availableDate}
                                            onChange={(e) => setAvailableDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-available-until">Until</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-until"
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

                <hr className="my-4" />

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleCancel} className="px-4">
                        Cancel
                    </Button>

                    {isNew && (
                        <Button
                            variant="outline-danger"
                            onClick={handleSaveAndCreateAnother}
                            className="px-4"
                        >
                            <FaPlus className="me-2" style={{ fontSize: '12px' }} />
                            Save & Create Another
                        </Button>
                    )}

                    <Button
                        variant="danger"
                        onClick={handleSave}
                        className="px-4"
                    >
                        {isNew ? `Create ${assignmentType === "PROJECTS" ? "Project" : "Assignment"}` : "Save Changes"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
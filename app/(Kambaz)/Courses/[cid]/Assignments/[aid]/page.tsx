/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ASSIGNMENT EDITOR - DATABASE-DRIVEN
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Location: app/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
 *
 * Edit or create assignments with data from database
 * All styling in assignments.css
 */

"use client";

import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AssignToInput from "./AssignToInput";
import * as db from "../../../../Database";
import "../assignments.css";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const router = useRouter();

    // Find assignment in database
    const assignment = db.assignments.find((a: any) => a._id === aid);

    // Determine if creating new or editing existing
    const isNew = aid === "new" || !assignment;

    // State for assign to field
    const [assignedTo, setAssignedTo] = useState<string[]>(
        isNew ? ['Everyone'] : ['Everyone']
    );

    // Format dates for datetime-local input
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    return (
        <div id="wd-assignment-editor" className="p-4">
            <Form>
                {/* Assignment Name */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">
                        Assignment Name
                    </Form.Label>
                    <Form.Control
                        id="wd-name"
                        type="text"
                        defaultValue={isNew ? "" : assignment?.title}
                    />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-4">
                    <Form.Control
                        as="textarea"
                        id="wd-description"
                        rows={10}
                        defaultValue={isNew ? "" : assignment?.description}
                    />
                </Form.Group>

                {/* Points */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Points
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            id="wd-points"
                            defaultValue={isNew ? 100 : assignment?.points}
                        />
                    </Col>
                </Row>

                {/* Assignment Group */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-group">
                        Assignment Group
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Display Grade As */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-display-grade-as">
                        Display Grade as
                    </Form.Label>
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

                {/* Submission Type */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Submission Type
                    </Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3">
                            <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
                                <option value="Online">Online</option>
                                <option value="Paper">On Paper</option>
                                <option value="External">External Tool</option>
                                <option value="None">No Submission</option>
                            </Form.Select>

                            <Form.Label className="fw-bold mb-2">
                                Online Entry Options
                            </Form.Label>

                            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
                            <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked className="mb-2" />
                            <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" />
                            <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" />
                            <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
                        </div>
                    </Col>
                </Row>

                {/* Submission Attempts */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Submission Attempts
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select id="wd-submission-attempts" defaultValue="Unlimited">
                            <option value="Unlimited">Unlimited</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Group Assignment */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Group Assignment
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Check
                            type="checkbox"
                            id="wd-group-assignment"
                            label="This is a Group Assignment"
                        />
                    </Col>
                </Row>

                {/* Peer Reviews */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Peer Reviews
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Check
                            type="checkbox"
                            id="wd-peer-reviews"
                            label="Require Peer Reviews"
                        />
                    </Col>
                </Row>

                {/* Assign Section */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Assign
                    </Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3">
                            <AssignToInput
                                value={assignedTo}
                                onChange={setAssignedTo}
                                label="Assign to"
                                boldLabel={true}
                                hideHelperText={true}
                            />

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold" htmlFor="wd-due-date">
                                    Due
                                </Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    id="wd-due-date"
                                    defaultValue={isNew ? "" : formatDateForInput(assignment?.dueDate)}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-available-from">
                                            Available from
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-from"
                                            defaultValue={isNew ? "" : formatDateForInput(assignment?.availableDate)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold" htmlFor="wd-available-until">
                                            Until
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-until"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                {/* Action Buttons */}
                <hr className="my-4" />

                <div className="d-flex justify-content-end gap-2">
                    <Link href={`/Courses/${cid}/Assignments`}>
                        <Button variant="secondary">
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        variant="danger"
                        onClick={() => router.push(`/Courses/${cid}/Assignments`)}
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}
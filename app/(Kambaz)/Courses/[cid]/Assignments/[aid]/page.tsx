"use client";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const router = useRouter();

    return (
        <div id="wd-assignments-editor" className="p-3">
            <Form>
                {/* Assignment Name */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control
                        id="wd-name"
                        type="text"
                        defaultValue="A1 - ENV + HTML"
                    />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-4">
                    <Form.Control
                        as="textarea"
                        id="wd-description"
                        rows={10}
                        cols={50}
                        defaultValue={`Submit a link to the landing page of your Web 
application.`}
                    />
                </Form.Group>

                {/* Points */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Points
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="number" id="wd-points" defaultValue={100} />
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
                        <Form.Select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINTS">Points</option>
                            <option value="LETTER">Letter Grade</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Submission Type */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-submission-type">
                        Submission Type
                    </Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3">
                            <Form.Select id="wd-submission-type" defaultValue="ONLINE" className="mb-3">
                                <option value="ONLINE">Online</option>
                                <option value="ON_PAPER">On Paper</option>
                                <option value="EXTERNAL">External Tool</option>
                            </Form.Select>

                            <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="wd-text-entry"
                                label="Text Entry"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-website-url"
                                label="Website URL"
                                defaultChecked
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-media-recordings"
                                label="Media Recordings"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-student-annotation"
                                label="Student Annotation"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-file-upload"
                                label="File Uploads"
                            />
                        </div>
                    </Col>
                </Row>

                {/* Submission Attempts */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-submission-attempts">
                        Submission Attempts
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select id="wd-submission-attempts" defaultValue="Unlimited">
                            <option value="Unlimited">Unlimited</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Group Assignment */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-group-assignment">
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
                    <Form.Label column sm={3} className="text-end" htmlFor="wd-peer-reviews">
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

                {/* Assign */}
                <Row className="mb-3">
                    <Form.Label column sm={3} className="text-end">
                        Assign
                    </Form.Label>
                    <Col sm={9}>
                        <div className="border rounded p-3">
                            <Form.Label className="fw-bold" htmlFor="wd-assign-to">Assign to</Form.Label>
                            <Form.Control
                                type="text"
                                id="wd-assign-to"
                                defaultValue="Everyone"
                                className="mb-3"
                            />

                            <Form.Label className="fw-bold" htmlFor="wd-due-date">Due</Form.Label>
                            <Form.Control
                                type="date"
                                id="wd-due-date"
                                defaultValue="2025-09-22"
                                className="mb-3"
                            />

                            <Row>
                                <Col>
                                    <Form.Label className="fw-bold" htmlFor="wd-available-from">Available from</Form.Label>
                                    <Form.Control
                                        type="date"
                                        id="wd-available-from"
                                        defaultValue="2025-09-08"
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className="fw-bold" htmlFor="wd-available-until">Until</Form.Label>
                                    <Form.Control
                                        type="date"
                                        id="wd-available-until"
                                        defaultValue="2025-09-23"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                {/* Action Buttons */}
                <hr />
                <div className="d-flex justify-content-end">
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => router.push(`/Kambaz/Courses/${cid}/Assignments`)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => router.push(`/Kambaz/Courses/${cid}/Assignments`)}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}
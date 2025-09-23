"use client";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>

            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-username">Username</Form.Label>
                            <Form.Control
                                id="wd-username"
                                type="text"
                                defaultValue="alice"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-password">Password</Form.Label>
                            <Form.Control
                                id="wd-password"
                                type="password"
                                defaultValue="123"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-firstname">First Name</Form.Label>
                            <Form.Control
                                id="wd-firstname"
                                type="text"
                                defaultValue="Alice"
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-lastname">Last Name</Form.Label>
                            <Form.Control
                                id="wd-lastname"
                                type="text"
                                defaultValue="Wonderland"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-dob">Date of Birth</Form.Label>
                            <Form.Control
                                id="wd-dob"
                                type="date"
                                defaultValue="2000-01-01"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-email">Email</Form.Label>
                            <Form.Control
                                id="wd-email"
                                type="email"
                                defaultValue="alice@wonderland.com"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div>
                            <Form.Label htmlFor="wd-role">Role</Form.Label>
                            <Form.Select id="wd-role" defaultValue="FACULTY">
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>

                <Button variant="danger">
                    Sign out
                </Button>
            </Form>
        </div>
    );
}


"use client";
import Link from "next/link";
import { Form, Row, Col } from "react-bootstrap";

export default function Profile() {
    return (
        <div id="wd-profile-screen" className="container-fluid">
            <h1 className="mb-4">Profile</h1>

            <Form>
                {/* Username */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-username">
                        Username:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            id="wd-username"
                            type="text"
                            defaultValue="alice"
                            className="form-control"
                        />
                    </Col>
                </Row>

                {/* Password */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-password">
                        Password:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            id="wd-password"
                            type="password"
                            defaultValue="123"
                            className="form-control"
                        />
                    </Col>
                </Row>

                {/* First Name */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-firstname">
                        First Name:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            id="wd-firstname"
                            type="text"
                            defaultValue="Alice"
                            className="form-control"
                        />
                    </Col>
                </Row>

                {/* Last Name */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-lastname">
                        Last Name:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            id="wd-lastname"
                            type="text"
                            defaultValue="Wonderland"
                            className="form-control"
                        />
                    </Col>
                </Row>

                {/* Date of Birth */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-dob">
                        Date of Birth:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            id="wd-dob"
                            type="date"
                            defaultValue="2000-01-01"
                            className="form-control"
                        />
                    </Col>
                </Row>

                {/* Email */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-email">
                        Email:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            id="wd-email"
                            type="email"
                            defaultValue="alice@wonderland.com"
                            className="form-control"
                        />
                    </Col>
                </Row>

                {/* Role */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-role">
                        Role:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Select
                            id="wd-role"
                            defaultValue="USER"
                            className="form-select"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Sign Out Button */}
                <Row className="mb-3">
                    <Col sm={{ span: 6, offset: 2 }}>
                        <Link
                            id="wd-signout-btn"
                            href="/Account/Signin"
                            className="btn btn-danger w-100"
                        >
                            Sign out
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
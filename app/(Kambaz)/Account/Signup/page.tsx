"use client";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";

export default function Signup() {
    return (
        <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
            <h1>Sign up</h1>

            <Form>
                <div className="mb-3">
                    <Form.Label htmlFor="wd-username">Username</Form.Label>
                    <Form.Control
                        id="wd-username"
                        type="text"
                        placeholder="Enter username"
                    />
                </div>

                <div className="mb-3">
                    <Form.Label htmlFor="wd-password">Password</Form.Label>
                    <Form.Control
                        id="wd-password"
                        type="password"
                        placeholder="Enter password"
                    />
                </div>

                <div className="mb-3">
                    <Form.Label htmlFor="wd-password-verify">Verify Password</Form.Label>
                    <Form.Control
                        id="wd-password-verify"
                        type="password"
                        placeholder="Verify password"
                    />
                </div>

                <Button
                    variant="danger"
                    className="w-100">
                    Sign up
                </Button>
            </Form>

            <div className="mt-3">
                <Link href="/Account/Signin">Sign in</Link>
            </div>
        </div>
    );
}

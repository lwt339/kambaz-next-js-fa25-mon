"use client";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";

export default function Signin() {
    return (
        <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
            <h1>Sign in</h1>

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

                <Button
                    variant="danger"
                    className="w-100">
                    Sign in
                </Button>
            </Form>

            <div className="mt-3">
                <Link href="/Account/Signup">Sign up</Link>
            </div>
        </div>
    );
}
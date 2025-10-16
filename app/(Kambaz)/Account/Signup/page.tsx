// File: app/(Kambaz)/Account/Signup/page.tsx
// Sign up screen where new users create their account

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Form, Button, Alert } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { User } from "../../Database/type";
import { AppDispatch } from "../../store";
import { v4 as uuidv4 } from "uuid";

// What we need to collect from new users
interface SignupCredentials {
    username: string;
    password: string;
    role: User["role"];
}

export default function Signup() {
    // Track what the user is typing
    const [credentials, setSignupCredentials] = useState<SignupCredentials>({
        username: "",
        password: "",
        role: "ADMIN"
    });

    // Keep track of any errors
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Create the new account
    const signup = () => {
        // Clear any old error messages
        setError("");

        // Make sure they filled everything out
        if (!credentials.username || !credentials.password) {
            setError("Please enter both username and password");
            return;
        }

        // Build a complete user object with all the required fields
        const newUser: User = {
            _id: uuidv4(),
            username: credentials.username,
            password: credentials.password,
            firstName: credentials.username,
            lastName: "User",
            email: `${credentials.username}@kambaz.edu`,
            dob: "2000-01-01",
            role: credentials.role,
            loginId: `${uuidv4().substring(0, 8)}`,
            section: "SEC01",
            lastActivity: new Date().toISOString(),
            totalActivity: "0:00:00"
        };

        // Sign them in right away with their new account
        dispatch(setCurrentUser(newUser));

        // Take them to the Dashboard
        router.push("/Dashboard");
    };

    // Let users press Enter to submit
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            signup();
        }
    };

    return (
        <div id="wd-signup-screen" className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <h1 className="mb-4">Sign up</h1>

                    {/* Show any errors */}
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}

                    <Form>
                        {/* Username field */}
                        <div className="mb-3">
                            <Form.Control
                                id="wd-username"
                                type="text"
                                placeholder="username"
                                className="form-control"
                                value={credentials.username}
                                onChange={(e) => {
                                    setError("");
                                    setSignupCredentials({
                                        ...credentials,
                                        username: e.target.value
                                    });
                                }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>

                        {/* Password field */}
                        <div className="mb-3">
                            <Form.Control
                                id="wd-password"
                                type="password"
                                placeholder="password"
                                className="form-control"
                                value={credentials.password}
                                onChange={(e) => {
                                    setError("");
                                    setSignupCredentials({
                                        ...credentials,
                                        password: e.target.value
                                    });
                                }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>

                        {/* Role picker */}
                        <div className="mb-3">
                            <Form.Select
                                id="wd-role"
                                value={credentials.role}
                                onChange={(e) => setSignupCredentials({
                                    ...credentials,
                                    role: e.target.value as User["role"]
                                })}
                                className="form-select"
                            >
                                <option value="ADMIN">Admin</option>
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="TA">TA</option>
                            </Form.Select>
                        </div>

                        <Button
                            id="wd-signup-btn"
                            onClick={signup}
                            className="btn btn-primary w-100 mb-3"
                        >
                            Sign up
                        </Button>

                        <div>
                            <Link
                                id="wd-signin-link"
                                href="/Account/Signin"
                            >
                                Sign in
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>

                <div className="mt-3 p-3 bg-light border rounded shadow-sm" style={{ maxWidth: '400px' }}>
                    <div className="mb-2">
                        <span className="fw-bold" style={{ color: '#3185FC' }}>Users </span>
                    </div>
                    <div className="small">
                        <div className="mb-2 py-2 border-bottom">
                            <span className="fw-bold" style={{ color: '#443850' }}>Admin: Full access to all system features </span>
                        </div>
                        <div className="mb-2 py-2 border-bottom">
                            <span className="fw-bold" style={{ color: '#FF4F79' }}>Student: Read-only access to enrolled courses.</span>
                        </div>
                        <div className="mb-2 py-2 border-bottom">
                            <span className="fw-bold" style={{ color: '#EFAAC4' }}>Faculty: can edit courses, modules, and assignments</span>
                        </div>
                        <div className="py-2">
                            <span className="fw-bold" style={{ color: '#B07BAC' }}>TA (Teaching Assistant): can edit courses, modules, and assignments</span>
                        </div>
                    </div>
                </div>

        </div>
    );
}
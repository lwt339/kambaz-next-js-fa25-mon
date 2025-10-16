// File: app/(Kambaz)/Account/Signin/page.tsx
// Login screen where users enter their username and password

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Form, Button, FormControl, Alert } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { User } from "../../Database/type";
import { RootState } from "../../store";
import * as db from "../../Database";

// What we collect from the login form
interface Credentials {
    username: string;
    password: string;
}

// The actual signin form component
function SigninForm() {
    // Check if we got redirected here from somewhere else
    const searchParams = useSearchParams();
    const redirect = searchParams?.get("redirect");

    // Keep track of what the user types
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: ""
    });

    // Store any error messages to show the user
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();
    const router = useRouter();

    // Check if someone's already logged in
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // If already logged in, just go straight to Dashboard
    useEffect(() => {
        if (currentUser) {
            router.push("/Dashboard");
        }
    }, [currentUser, router]);

    // Try to log the user in
    const signin = () => {
        // Clear any old error messages
        setError("");

        // Make sure they filled in both fields
        if (!credentials.username || !credentials.password) {
            setError("Please enter both username and password");
            return;
        }

        // Look through our database for a matching user
        const typedUsers = db.users as User[];
        const user = typedUsers.find(
            (u: User) => u.username === credentials.username && u.password === credentials.password
        );

        // If we didn't find anyone, show an error
        if (!user) {
            setError("Invalid username or password");
            return;
        }

        // Success! Save this user as logged in
        dispatch(setCurrentUser(user));

        // Send them where they were trying to go, or Dashboard by default
        if (redirect === "dashboard") {
            router.push("/Dashboard");
        } else if (redirect === "course") {
            router.push("/Dashboard");
        } else {
            router.push("/Dashboard");
        }
    };

    // Let users press Enter to submit instead of clicking
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            signin();
        }
    };

    return (
        <div className="col-md-6 col-lg-4">
            <h1 className="mb-4">Sign in</h1>

            {/* Show a warning if they got redirected here */}
            {redirect && (
                <Alert variant="warning" className="mb-3">
                    <Alert.Heading className="h6">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <strong>Authentication Required</strong>
                    </Alert.Heading>
                    <p className="mb-0">
                        {redirect === "dashboard"
                            ? "You must sign in to access your Dashboard and view your courses."
                            : "You must sign in to access this content."}
                    </p>
                </Alert>
            )}

            {/* Show any error messages */}
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <Form>
                {/* Username input */}
                <div className="mb-3">
                    <FormControl
                        id="wd-username"
                        type="text"
                        placeholder="username"
                        className="form-control"
                        value={credentials.username}
                        onChange={(e) => {
                            setError("");
                            setCredentials({
                                ...credentials,
                                username: e.target.value
                            });
                        }}
                        onKeyDown={handleKeyPress}
                    />
                </div>

                {/* Password input */}
                <div className="mb-3">
                    <FormControl
                        id="wd-password"
                        type="password"
                        placeholder="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={(e) => {
                            setError("");
                            setCredentials({
                                ...credentials,
                                password: e.target.value
                            });
                        }}
                        onKeyDown={handleKeyPress}
                    />
                </div>

                {/* Sign in button */}
                <Button id="wd-signin-btn" onClick={signin} className="btn btn-primary w-100 mb-3">
                    Sign in
                </Button>

                {/* Link to create new account */}
                <div>
                    <Link id="wd-signup-link" href="/Account/Signup">
                        Sign up
                    </Link>
                </div>
            </Form>

            {/* Show some test accounts for easy testing */}
            <div className="mt-3 p-3 bg-light border rounded">
                <small className="text-muted">
                    <strong>Test Users:</strong>
                    <br />
                    Admin: admin | admin5610
                    <br />
                    Student: alice_johnson | secure123
                    <br />
                    Faculty: prof_smith | faculty456
                    <br />
                    TA: ta_chen | teaching789
                    <br />
                </small>
            </div>
        </div>
    );
}

// Loading fallback while checking search params
function SigninFallback() {
    return (
        <div className="col-md-6 col-lg-4">
            <h1 className="mb-4">Sign in</h1>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

// Main page component with Suspense wrapper
export default function Signin() {
    return (
        <div id="wd-signin-screen" className="container-fluid">
            <div className="row">
                <Suspense fallback={<SigninFallback />}>
                    <SigninForm />
                </Suspense>
            </div>
        </div>
    );
}
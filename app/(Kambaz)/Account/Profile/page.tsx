// File: app/(Kambaz)/Account/Profile/page.tsx
// Profile screen where users can view and edit their personal information
// File: app/(Kambaz)/Account/Profile/page.tsx
// Profile screen where users can view and edit their personal information

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, FormControl, Row, Col, Alert } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { User } from "../../Database/type";
import { RootState, AppDispatch } from "../../store";

export default function Profile() {
    // Keep a temporary copy of the profile while editing
    const [profile, setProfile] = useState<Partial<User>>({});

    // Track if user made any changes
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // Show a success message after saving
    const [saveMessage, setSaveMessage] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Get the current logged-in user from Redux
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // Load the user's data when the component first shows up
    useEffect(() => {
        // If nobody's signed in, send them to login
        if (!currentUser) {
            router.push("/Account/Signin");
            return;
        }

        // Copy their current info to our editing form
        setProfile({ ...currentUser });
    }, [currentUser, router]);

    // Update one field and mark that we have unsaved changes
    const updateField = (field: keyof User, value: string) => {
        setProfile({ ...profile, [field]: value });
        setHasChanges(true);
        setSaveMessage("");
    };

    // Save all the changes back to Redux
    const saveProfile = () => {
        if (!currentUser) return;

        // Combine original user with our edits
        const updatedUser: User = {
            ...currentUser,
            ...profile
        } as User;

        // Send the update to Redux
        dispatch(setCurrentUser(updatedUser));

        // Show success message
        setSaveMessage("Profile updated successfully!");
        setHasChanges(false);

        // Hide the message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
    };

    // Log out and clear everything
    const signout = () => {
        dispatch(setCurrentUser(null));
        router.push("/Account/Signin");
    };

    // Don't show anything until we have the data loaded
    if (!profile || !currentUser) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div id="wd-profile-screen" className="container-fluid">
            <h1 className="mb-4">Profile</h1>

            {/* Success message after saving */}
            {saveMessage && (
                <Alert variant="success" className="mb-3">
                    {saveMessage}
                </Alert>
            )}

            <Form>
                {/* Username field */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-username">
                        Username:
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            id="wd-username"
                            type="text"
                            value={profile.username || ""}
                            onChange={(e) => updateField("username", e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Password field */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-password">
                        Password:
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            id="wd-password"
                            type="password"
                            value={profile.password || ""}
                            onChange={(e) => updateField("password", e.target.value)}
                        />
                    </Col>
                </Row>

                {/* First Name field */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-firstname">
                        First Name:
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            id="wd-firstname"
                            type="text"
                            value={profile.firstName || ""}
                            onChange={(e) => updateField("firstName", e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Last Name field */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-lastname">
                        Last Name:
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            id="wd-lastname"
                            type="text"
                            value={profile.lastName || ""}
                            onChange={(e) => updateField("lastName", e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Date of Birth field */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-dob">
                        Date of Birth:
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            id="wd-dob"
                            type="date"
                            value={profile.dob || ""}
                            onChange={(e) => updateField("dob", e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Email field */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-email">
                        Email:
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            id="wd-email"
                            type="email"
                            value={profile.email || ""}
                            onChange={(e) => updateField("email", e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Role picker */}
                <Row className="mb-3">
                    <Form.Label column sm={2} htmlFor="wd-role">
                        Role:
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Select
                            id="wd-role"
                            value={profile.role || "STUDENT"}
                            onChange={(e) => updateField("role", e.target.value as User["role"])}
                            className="form-select"
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="TA">TA</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Save button - only show when there are changes */}
                {hasChanges && (
                    <Row className="mb-3">
                        <Col sm={{ span: 6, offset: 2 }}>
                            <Button
                                variant="primary"
                                onClick={saveProfile}
                                className="w-100 mb-2"
                            >
                                Save Changes
                            </Button>
                        </Col>
                    </Row>
                )}

                {/* Sign out button */}
                <Row className="mb-3">
                    <Col sm={{ span: 6, offset: 2 }}>
                        <Button
                            id="wd-signout-btn"
                            onClick={signout}
                            variant="danger"
                            className="w-100"
                        >
                            Sign out
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
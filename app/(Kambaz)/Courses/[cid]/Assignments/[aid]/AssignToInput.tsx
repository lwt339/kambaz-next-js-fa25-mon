// app/(Kambaz)/Courses/[cid]/Assignments/[aid]/AssignToInput.tsx
// Clean assignment input using CSS classes

"use client";

import { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { User, Enrollment } from "../../../../Database/type";
import "../assignments.css";

interface AssignToInputProps {
    value: string[];
    onChange: (newValue: string[]) => void;
    placeholder?: string;
    label?: string;
    boldLabel?: boolean;
    helperText?: string;
    hideHelperText?: boolean;
}

export default function AssignToInput({
                                          value,
                                          onChange,
                                          placeholder = "Type a name or select from dropdown",
                                          label,
                                          boldLabel = true,
                                          helperText = "Select from dropdown or type a name and press Enter to add. Click X to remove.",
                                          hideHelperText = false
                                      }: AssignToInputProps) {
    const params = useParams();
    const cid = params?.cid as string;

    const [inputValue, setInputValue] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const typedUsers = db.users as User[];
    const typedEnrollments = db.enrollments as Enrollment[];

    const enrolledUserIds = typedEnrollments
        .filter((e: Enrollment) => e.course === cid)
        .map((e: Enrollment) => e.user);

    const enrolledUsers = typedUsers.filter((u: User) => enrolledUserIds.includes(u._id));

    const sortedUsers = [...enrolledUsers].sort((a, b) => {
        const roleOrder = { FACULTY: 0, TA: 1, STUDENT: 2 };
        const roleA = roleOrder[a.role as keyof typeof roleOrder] ?? 3;
        const roleB = roleOrder[b.role as keyof typeof roleOrder] ?? 3;

        if (roleA !== roleB) return roleA - roleB;

        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const usersByRole = {
        FACULTY: sortedUsers.filter(u => u.role === "FACULTY"),
        TA: sortedUsers.filter(u => u.role === "TA"),
        STUDENT: sortedUsers.filter(u => u.role === "STUDENT")
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const removeAssignment = (nameToRemove: string) => {
        onChange(value.filter(name => name !== nameToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedValue = inputValue.trim();
            if (trimmedValue && !value.includes(trimmedValue)) {
                onChange([...value, trimmedValue]);
                setInputValue('');
            }
        } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
            removeAssignment(value[value.length - 1]);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const input = e.currentTarget.querySelector('input');
        input?.focus();
    };

    const handleSelectUser = (user: User) => {
        const userName = `${user.firstName} ${user.lastName}`;
        if (!value.includes(userName)) {
            onChange([...value, userName]);
        }
        setShowDropdown(false);
        setInputValue('');
    };

    const handleSelectEveryone = () => {
        if (!value.includes("Everyone")) {
            onChange(["Everyone"]);
        }
        setShowDropdown(false);
        setInputValue('');
    };

    const getRoleLabel = (role: string): string => {
        const labels = {
            FACULTY: "Faculty",
            TA: "Teaching Assistants",
            STUDENT: "Students"
        };
        return labels[role as keyof typeof labels] || role;
    };

    return (
        <Form.Group className="mb-3" ref={dropdownRef}>
            {label && (
                <Form.Label className={boldLabel ? "fw-bold" : ""}>
                    {label}
                </Form.Label>
            )}

            <div className="position-relative">
                <div className="wd-assign-container" onClick={handleContainerClick}>
                    {value.map((name, index) => (
                        <span key={index} className="badge bg-light text-dark border d-flex align-items-center gap-1 wd-assign-badge">
                            {name}
                            <button
                                type="button"
                                className="btn-close"
                                aria-label={`Remove ${name}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeAssignment(name);
                                }}
                            />
                        </span>
                    ))}

                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowDropdown(true)}
                        placeholder={value.length === 0 ? placeholder : ""}
                        className="wd-assign-input"
                    />
                </div>

                {showDropdown && (
                    <div className="wd-assign-dropdown">
                        <div className="wd-assign-dropdown-everyone" onClick={handleSelectEveryone}>
                            <div className="wd-assign-everyone-title">Everyone</div>
                            <div className="wd-assign-everyone-subtitle">
                                All enrolled users ({enrolledUsers.length} people)
                            </div>
                        </div>

                        {usersByRole.FACULTY.length > 0 && (
                            <>
                                <div className="wd-assign-dropdown-role-header">
                                    <strong className="text-muted small">{getRoleLabel("FACULTY")}</strong>
                                </div>
                                {usersByRole.FACULTY.map((user) => (
                                    <div
                                        key={user._id}
                                        className="wd-assign-dropdown-user-item"
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        <div className="wd-assign-user-name">{user.firstName} {user.lastName}</div>
                                        <div className="wd-assign-user-email">{user.email}</div>
                                    </div>
                                ))}
                            </>
                        )}

                        {usersByRole.TA.length > 0 && (
                            <>
                                <div className="wd-assign-dropdown-role-header">
                                    <strong className="text-muted small">{getRoleLabel("TA")}</strong>
                                </div>
                                {usersByRole.TA.map((user) => (
                                    <div
                                        key={user._id}
                                        className="wd-assign-dropdown-user-item"
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        <div className="wd-assign-user-name">{user.firstName} {user.lastName}</div>
                                        <div className="wd-assign-user-email">{user.email}</div>
                                    </div>
                                ))}
                            </>
                        )}

                        {usersByRole.STUDENT.length > 0 && (
                            <>
                                <div className="wd-assign-dropdown-role-header">
                                    <strong className="text-muted small">
                                        {getRoleLabel("STUDENT")} ({usersByRole.STUDENT.length})
                                    </strong>
                                </div>
                                {usersByRole.STUDENT.map((user) => (
                                    <div
                                        key={user._id}
                                        className="wd-assign-dropdown-user-item"
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        <div className="wd-assign-user-name">{user.firstName} {user.lastName}</div>
                                        <div className="wd-assign-user-email">{user.email}</div>
                                    </div>
                                ))}
                            </>
                        )}

                        {enrolledUsers.length === 0 && (
                            <div className="wd-assign-dropdown-empty text-muted">
                                No enrolled users found for this course
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!hideHelperText && (
                <Form.Text className="text-muted">{helperText}</Form.Text>
            )}
        </Form.Group>
    );
}
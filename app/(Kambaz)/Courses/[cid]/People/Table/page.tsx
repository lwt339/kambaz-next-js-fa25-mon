// File: app/(Kambaz)/Courses/[cid]/People/Table/page.tsx
// Shows all users enrolled in this course with their info

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../../../Database";
import { User, Enrollment } from "../../../../Database/type";
import "../people.css";

export default function PeopleTable() {
    // Get which course we're looking at
    const params = useParams();
    const cid = params.cid as string;

    // Pull user and enrollment data from database
    const typedUsers = db.users as User[];
    const typedEnrollments = db.enrollments as Enrollment[];

    // Format dates to look nice like "2024 Oct 15 3:45pm"
    const formatDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return `${year} ${month} ${day} ${time}`;
    };

    // Format activity time like "2h 15m 30s"
    const formatTotalActivity = (activityString: string): string => {
        const parts = activityString.split(':');
        const [hours = "0", minutes = "0", seconds = "0"] = parts;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div id="wd-people-table">
            <table className="table table-striped wd-people-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {/* Show only users enrolled in this course */}
                {typedUsers
                    .filter((usr: User) =>
                        typedEnrollments.some(
                            (enrollment: Enrollment) =>
                                enrollment.user === usr._id &&
                                enrollment.course === cid
                        )
                    )
                    .map((user: User) => (
                        <tr key={user._id} className="wd-user-row">
                            {/* Name with icon */}
                            <td className="wd-full-name text-nowrap wd-name-cell">
                                <FaUserCircle className="me-2 fs-1 text-secondary wd-user-icon" />
                                <div className="wd-user-info">
                                    <div className="wd-user-name">
                                        <span className="wd-first-name">{user.firstName}</span>{" "}
                                        <span className="wd-last-name">{user.lastName}</span>
                                    </div>
                                    <div className="wd-user-email">{user.email}</div>
                                </div>
                            </td>

                            {/* Login ID */}
                            <td className="wd-login-id wd-login-cell">{user.loginId}</td>

                            {/* Section badge */}
                            <td className="wd-section">
                                    <span className="wd-section-badge badge bg-light text-dark">
                                        {user.section}
                                    </span>
                            </td>

                            {/* Role badge with color coding */}
                            <td className="wd-role">
                                    <span className={`wd-role-badge badge ${
                                        user.role === 'FACULTY' ? 'bg-danger' :
                                            user.role === 'TA' ? 'bg-warning text-dark' :
                                                'bg-primary'
                                    }`}>
                                        {user.role}
                                    </span>
                            </td>

                            {/* Last Activity timestamp */}
                            <td className="wd-last-activity">
                                <div className="wd-activity-main">
                                    {formatDateTime(user.lastActivity)}
                                </div>
                            </td>

                            {/* Total Activity time */}
                            <td className="wd-total-activity">
                                {formatTotalActivity(user.totalActivity)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
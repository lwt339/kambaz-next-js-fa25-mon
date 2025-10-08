"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../../../Database";
import type { User, Enrollment } from "../../../../Database/type";
import "../people.css";

export default function PeopleTable() {
    /* Extract course ID */
    const params = useParams();
    const cid = params.cid as string;

    /* Type assertions for database imports  */
    const typedUsers = db.users as User[];
    const typedEnrollments = db.enrollments as Enrollment[];

    /* Format a date-time */
    const formatDateTime = (dateString: string): string => {
        // Create a Date object from the ISO string
        // The Date constructor automatically parses ISO 8601 format
        const date = new Date(dateString);

        // Extract individual components of the date
        // These methods return numbers that we'll format into strings
        const year = date.getFullYear();           // e.g., 2025
        const month = date.toLocaleDateString('en-US', { month: 'short' }); // e.g., "Oct"
        const day = date.getDate();                // e.g., 2 (no leading zero)

        // Format the time portion
        // We use toLocaleTimeString with specific options to get 12-hour format
        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',      // "2" instead of "02"
            minute: '2-digit',    // "32" (always two digits for minutes)
            hour12: true          // Use AM/PM instead of 24-hour format
        });

        // Combine all parts with spaces
        return `${year} ${month} ${day} ${time}`;
    };

    /* Format the total activity  */
    const formatTotalActivity = (activityString: string): string => {

        return activityString;
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
                {/* Filter and display users enrolled */}
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
                            {/* Name */}
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

                            {/* Section */}
                            <td className="wd-section">
                                    <span className="wd-section-badge badge bg-light text-dark">
                                        {user.section}
                                    </span>
                            </td>

                            {/* Role */}
                            <td className="wd-role">
                                    <span className={`wd-role-badge badge ${
                                        user.role === 'FACULTY' ? 'bg-danger' :
                                            user.role === 'TA' ? 'bg-warning text-dark' :
                                                'bg-primary'
                                    }`}>
                                        {user.role}
                                    </span>
                            </td>

                            {/* Last Activity */}
                            <td className="wd-last-activity">
                                <div className="wd-activity-main">
                                    {formatDateTime(user.lastActivity)}
                                </div>
                            </td>

                            {/* Total Activity */}
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
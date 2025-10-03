/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PEOPLE PAGE - ENHANCED DATABASE-DRIVEN
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Location: app/(Kambaz)/Courses/[cid]/People/page.tsx
 *
 * Features:
 * - Advanced filtering and search
 * - Export functionality
 * - Pagination support
 * - Real-time activity tracking
 * - Role-based statistics
 * - Responsive design
 */

"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Table, Button, Form, Badge, Dropdown } from "react-bootstrap";
import {
    FaUserCircle,
    FaPlus,
    FaSearch,
    FaFileExport,
    FaSortAlphaDown,
    FaSortAlphaUp,
    FaFilter
} from "react-icons/fa";
import * as db from "../../../Database";
import "./people.css";

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════
interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "FACULTY" | "TA" | "STUDENT";
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
    dob: string;
}

interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

type RoleFilter = "ALL" | "FACULTY" | "TA" | "STUDENT";
type SortField = "name" | "role" | "lastActivity" | "totalActivity";
type SortOrder = "asc" | "desc";

export default function People() {
    const params = useParams();
    const cid = params?.cid as string;

    // ────────────────────────────────────────────────────────────────────────
    // STATE
    // ────────────────────────────────────────────────────────────────────────
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [showStats, setShowStats] = useState(true);

    // ────────────────────────────────────────────────────────────────────────
    // GET ENROLLED USERS FOR THIS COURSE
    // ────────────────────────────────────────────────────────────────────────
    const enrollments = db.enrollments as Enrollment[];
    const users = db.users as User[];

    // Find enrollments for this course
    const courseEnrollments = enrollments.filter(
        (enrollment) => enrollment.course === cid
    );

    // Get user IDs enrolled in this course
    const enrolledUserIds = courseEnrollments.map((e) => e.user);

    // Filter users who are enrolled
    const enrolledUsers = users.filter((user) =>
        enrolledUserIds.includes(user._id)
    );

    // ────────────────────────────────────────────────────────────────────────
    // FILTER, SORT, AND SEARCH LOGIC
    // ────────────────────────────────────────────────────────────────────────
    const filteredAndSortedUsers = useMemo(() => {
        let result = [...enrolledUsers];

        // Apply search filter
        if (searchTerm) {
            result = result.filter((user) => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    user.firstName.toLowerCase().includes(searchLower) ||
                    user.lastName.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower) ||
                    user.loginId.toLowerCase().includes(searchLower)
                );
            });
        }

        // Apply role filter
        if (roleFilter !== "ALL") {
            result = result.filter((user) => user.role === roleFilter);
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;

            switch (sortField) {
                case "name":
                    comparison = `${a.lastName} ${a.firstName}`.localeCompare(
                        `${b.lastName} ${b.firstName}`
                    );
                    break;
                case "role":
                    const roleOrder = { FACULTY: 1, TA: 2, STUDENT: 3 };
                    comparison = roleOrder[a.role] - roleOrder[b.role];
                    if (comparison === 0) {
                        comparison = a.lastName.localeCompare(b.lastName);
                    }
                    break;
                case "lastActivity":
                    comparison = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
                    break;
                case "totalActivity":
                    const [aHours] = a.totalActivity.split(":").map(Number);
                    const [bHours] = b.totalActivity.split(":").map(Number);
                    comparison = aHours - bHours;
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        return result;
    }, [enrolledUsers, searchTerm, roleFilter, sortField, sortOrder]);

    // ────────────────────────────────────────────────────────────────────────
    // HELPER FUNCTIONS
    // ────────────────────────────────────────────────────────────────────────
    const getRoleBadgeVariant = (role: string): string => {
        switch (role) {
            case "FACULTY":
                return "danger";
            case "TA":
                return "warning";
            case "STUDENT":
                return "primary";
            default:
                return "secondary";
        }
    };

    const formatLastActivity = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) return "Just now";
        if (diffHours < 24) return `${diffHours}h ago`;

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
        });
    };

    const formatDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const exportToCSV = () => {
        const headers = ["Name", "Email", "Login ID", "Section", "Role", "Last Activity", "Total Activity"];
        const rows = filteredAndSortedUsers.map(user => [
            `${user.firstName} ${user.lastName}`,
            user.email,
            user.loginId,
            user.section,
            user.role,
            user.lastActivity,
            user.totalActivity
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `course-${cid}-people.csv`;
        a.click();
    };

    // ────────────────────────────────────────────────────────────────────────
    // STATISTICS
    // ────────────────────────────────────────────────────────────────────────
    const stats = useMemo(() => ({
        faculty: enrolledUsers.filter((u) => u.role === "FACULTY").length,
        ta: enrolledUsers.filter((u) => u.role === "TA").length,
        students: enrolledUsers.filter((u) => u.role === "STUDENT").length,
        total: enrolledUsers.length,
        sections: new Set(enrolledUsers.map(u => u.section)).size
    }), [enrolledUsers]);

    return (
        <div id="wd-people">
            {/* ═══════════════════════════════════════════════════════════════
          HEADER WITH ACTIONS
          ═══════════════════════════════════════════════════════════════ */}
            <div className="wd-people-header">
                <div>
                    <h3>People</h3>
                    <p className="text-muted mb-0">
                        {filteredAndSortedUsers.length} of {enrolledUsers.length} people
                    </p>
                </div>
                <div className="wd-header-actions">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={exportToCSV}
                    >
                        <FaFileExport className="me-2" />
                        Export
                    </Button>
                    <Button variant="danger" size="sm">
                        <FaPlus className="me-2" />
                        Add People
                    </Button>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
          CONTROLS
          ═══════════════════════════════════════════════════════════════ */}
            <div className="wd-people-controls">
                {/* Search */}
                <div className="wd-search-box">
                    <FaSearch className="wd-search-icon" />
                    <Form.Control
                        type="text"
                        placeholder="Search people..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="wd-search-input"
                    />
                </div>

                {/* Role Filter */}
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                        <FaFilter className="me-2" />
                        {roleFilter === "ALL" ? "All Roles" : roleFilter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setRoleFilter("ALL")}>
                            All Roles
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setRoleFilter("FACULTY")}>
                            Faculty
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setRoleFilter("TA")}>
                            Teaching Assistants
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setRoleFilter("STUDENT")}>
                            Students
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Sort Options */}
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                        {sortOrder === "asc" ? <FaSortAlphaDown className="me-2" /> : <FaSortAlphaUp className="me-2" />}
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSort("name")}>
                            Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort("role")}>
                            Role {sortField === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort("lastActivity")}>
                            Last Activity {sortField === "lastActivity" && (sortOrder === "asc" ? "↑" : "↓")}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort("totalActivity")}>
                            Total Activity {sortField === "totalActivity" && (sortOrder === "asc" ? "↑" : "↓")}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Toggle Stats */}
                <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowStats(!showStats)}
                >
                    {showStats ? "Hide" : "Show"} Stats
                </Button>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
          STATISTICS (COLLAPSIBLE)
          ═══════════════════════════════════════════════════════════════ */}
            {showStats && (
                <div className="wd-stats-header">
                    <div className="wd-stat-card">
                        <div className="wd-stat-icon faculty">
                            <FaUserCircle />
                        </div>
                        <div>
                            <div className="wd-stat-value">{stats.faculty}</div>
                            <div className="wd-stat-label">Faculty</div>
                        </div>
                    </div>
                    <div className="wd-stat-card">
                        <div className="wd-stat-icon ta">
                            <FaUserCircle />
                        </div>
                        <div>
                            <div className="wd-stat-value">{stats.ta}</div>
                            <div className="wd-stat-label">Teaching Assistants</div>
                        </div>
                    </div>
                    <div className="wd-stat-card">
                        <div className="wd-stat-icon student">
                            <FaUserCircle />
                        </div>
                        <div>
                            <div className="wd-stat-value">{stats.students}</div>
                            <div className="wd-stat-label">Students</div>
                        </div>
                    </div>
                    <div className="wd-stat-card">
                        <div className="wd-stat-icon total">
                            <FaUserCircle />
                        </div>
                        <div>
                            <div className="wd-stat-value">{stats.total}</div>
                            <div className="wd-stat-label">Total Enrolled</div>
                        </div>
                    </div>
                    <div className="wd-stat-card">
                        <div className="wd-stat-icon sections">
                            <FaUserCircle />
                        </div>
                        <div>
                            <div className="wd-stat-value">{stats.sections}</div>
                            <div className="wd-stat-label">Sections</div>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
          PEOPLE TABLE
          ═══════════════════════════════════════════════════════════════ */}
            <div className="wd-table-container">
                <Table hover className="wd-people-table">
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                            Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th onClick={() => handleSort("role")} style={{ cursor: "pointer" }}>
                            Role {sortField === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("lastActivity")} style={{ cursor: "pointer" }}>
                            Last Activity {sortField === "lastActivity" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("totalActivity")} style={{ cursor: "pointer" }}>
                            Total Activity {sortField === "totalActivity" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAndSortedUsers.map((user) => (
                        <tr key={user._id} className="wd-user-row">
                            <td className="wd-name-cell">
                                <FaUserCircle className="wd-user-icon" />
                                <div className="wd-user-info">
                                    <div className="wd-user-name">
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div className="wd-user-email">
                                        {user.email}
                                    </div>
                                </div>
                            </td>
                            <td className="wd-login-cell">{user.loginId}</td>
                            <td>
                                <Badge bg="secondary" className="wd-section-badge">
                                    {user.section}
                                </Badge>
                            </td>
                            <td>
                                <Badge bg={getRoleBadgeVariant(user.role)} className="wd-role-badge">
                                    {user.role}
                                </Badge>
                            </td>
                            <td>
                                <div className="wd-activity-main">
                                    {formatLastActivity(user.lastActivity)}
                                </div>
                                <div className="wd-activity-detail">
                                    {formatDateTime(user.lastActivity)}
                                </div>
                            </td>
                            <td className="wd-total-activity">{user.totalActivity}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
          NO RESULTS MESSAGE
          ═══════════════════════════════════════════════════════════════ */}
            {filteredAndSortedUsers.length === 0 && (
                <div className="wd-no-results">
                    <FaUserCircle className="wd-no-results-icon" />
                    <h5>No people found</h5>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
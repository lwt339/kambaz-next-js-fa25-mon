/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GRADES PAGE - ENHANCED DATABASE-DRIVEN WITH COURSE COLORS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Location: app/(Kambaz)/Courses/[cid]/Grades/page.tsx
 *
 * Features:
 * - Dynamic course color theming from courses.json
 * - Advanced filtering (by type, status, date range)
 * - Grade analytics and visualization
 * - Export functionality
 * - Sortable columns
 * - Grade statistics
 */

"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Table, Button, Form, Row, Col, Badge, Dropdown } from "react-bootstrap";
import {
    BsFileEarmarkArrowDown,
    BsGear,
    BsFileEarmarkArrowUp,
    BsFilter,
    BsSortDown,
    BsSortUp
} from "react-icons/bs";
import * as db from "../../../Database";
import "./grades.css";

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════
interface Assignment {
    _id: string;
    title: string;
    course: string;
    points: number;
    dueDate: string;
    availableDate?: string;
    assignmentType?: string;
}

interface Quiz {
    _id: string;
    title: string;
    course: string;
    points: number;
    dueDate: string;
    questions?: number;
    timeLimit?: number;
}

interface Grade {
    _id: string;
    student: string;
    assignment: string;
    course: string;
    grade: number | null;
    maxPoints: number;
    submittedDate: string | null;
    status: string;
}

interface GradeItem {
    _id: string;
    title: string;
    course: string;
    points: number;
    dueDate: string;
    itemType: 'assignment' | 'quiz';
}

interface Course {
    _id: string;
    name: string;
    number: string;
    color: string;
}

type StatusFilter = "ALL" | "Submitted" | "Not Submitted" | "Completed" | "Not Available";
type TypeFilter = "ALL" | "assignment" | "quiz";
type SortField = "title" | "dueDate" | "points" | "grade";
type SortOrder = "asc" | "desc";

export default function Grades() {
    const params = useParams();
    const cid = params?.cid as string;

    // ────────────────────────────────────────────────────────────────────────
    // STATE
    // ────────────────────────────────────────────────────────────────────────
    const [searchAssignment, setSearchAssignment] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
    const [sortField, setSortField] = useState<SortField>("dueDate");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [showAnalytics, setShowAnalytics] = useState(true);

    const currentUserId = "U001"; // In real app, from auth

    // ────────────────────────────────────────────────────────────────────────
    // GET DATA FROM DATABASE AND COURSE COLOR
    // ────────────────────────────────────────────────────────────────────────
    const allGrades = db.grades as Grade[];
    const allAssignments = db.assignments as Assignment[];
    const allQuizzes = db.quizzes as Quiz[];
    const allCourses = (db.courses || []) as Course[];

    // Get current course and its color
    const currentCourse = allCourses.find(course => course._id === cid);
    const courseColor = currentCourse?.color || "#667eea";

    // Filter for current course and student
    const courseGrades = allGrades.filter(
        (grade) => grade.course === cid && grade.student === currentUserId
    );

    const courseAssignments = allAssignments.filter(
        (a) => a.course === cid && a.assignmentType !== "PROJECT"
    );
    const courseQuizzes = allQuizzes.filter((q) => q.course === cid);

    // ────────────────────────────────────────────────────────────────────────
    // MERGE AND FILTER ITEMS
    // ────────────────────────────────────────────────────────────────────────
    const allItems: GradeItem[] = useMemo(() => [
        ...courseAssignments.map((a): GradeItem => ({
            _id: a._id,
            title: a.title,
            course: a.course,
            points: a.points,
            dueDate: a.dueDate,
            itemType: 'assignment'
        })),
        ...courseQuizzes.map((q): GradeItem => ({
            _id: q._id,
            title: q.title,
            course: q.course,
            points: q.points,
            dueDate: q.dueDate,
            itemType: 'quiz'
        }))
    ], [courseAssignments, courseQuizzes]);

    // Filter and sort items
    const filteredItems = useMemo(() => {
        let result = allItems.filter((item) =>
            item.title.toLowerCase().includes(searchAssignment.toLowerCase())
        );

        // Filter by type
        if (typeFilter !== "ALL") {
            result = result.filter((item) => item.itemType === typeFilter);
        }

        // Filter by status
        if (statusFilter !== "ALL") {
            result = result.filter((item) => {
                const gradeRecord = getGradeForItem(item._id);
                return gradeRecord?.status === statusFilter;
            });
        }

        // Sort
        result.sort((a, b) => {
            let comparison = 0;

            switch (sortField) {
                case "title":
                    comparison = a.title.localeCompare(b.title);
                    break;
                case "dueDate":
                    comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    break;
                case "points":
                    comparison = a.points - b.points;
                    break;
                case "grade":
                    const gradeA = getGradeForItem(a._id)?.grade ?? -1;
                    const gradeB = getGradeForItem(b._id)?.grade ?? -1;
                    comparison = gradeA - gradeB;
                    break;
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        return result;
    }, [allItems, searchAssignment, typeFilter, statusFilter, sortField, sortOrder]);

    // ────────────────────────────────────────────────────────────────────────
    // HELPER FUNCTIONS
    // ────────────────────────────────────────────────────────────────────────
    const getGradeForItem = (itemId: string): Grade | undefined => {
        return courseGrades.find((g) => g.assignment === itemId);
    };

    const calculatePercentage = (score: number | null, maxPoints: number): string => {
        if (score === null || score === undefined || maxPoints === 0) return "-";
        return `${((score / maxPoints) * 100).toFixed(1)}%`;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusBadge = (status: string): string => {
        switch (status) {
            case "Submitted":
                return "success";
            case "Not Submitted":
                return "danger";
            case "Completed":
                return "info";
            case "Not Available":
                return "secondary";
            default:
                return "secondary";
        }
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
        const headers = ["Assignment", "Type", "Due Date", "Status", "Score", "Max Points", "Percentage"];
        const rows = filteredItems.map(item => {
            const gradeRecord = getGradeForItem(item._id);
            const score = gradeRecord?.grade ?? null;
            const status = gradeRecord?.status || "Not Available";
            return [
                item.title,
                item.itemType.toUpperCase(),
                item.dueDate,
                status,
                score !== null ? score.toString() : "-",
                item.points.toString(),
                calculatePercentage(score, item.points)
            ];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `course-${cid}-grades.csv`;
        a.click();
    };

    // Calculate statistics
    const statistics = useMemo(() => {
        let earned = 0;
        let possible = 0;
        let submitted = 0;
        let notSubmitted = 0;
        const scores: number[] = [];

        courseGrades.forEach((grade) => {
            if (grade.grade !== null && grade.grade !== undefined) {
                earned += grade.grade;
                possible += grade.maxPoints;
                const percentage = (grade.grade / grade.maxPoints) * 100;
                scores.push(percentage);
            }

            if (grade.status === "Submitted" || grade.status === "Completed") {
                submitted++;
            } else if (grade.status === "Not Submitted") {
                notSubmitted++;
            }
        });

        const percentage = possible > 0 ? ((earned / possible) * 100).toFixed(1) : "0.0";

        // Calculate average percentage
        const avgPercentage = scores.length > 0
            ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
            : "0.0";

        // Find highest and lowest grades
        const highest = scores.length > 0 ? Math.max(...scores).toFixed(1) : "0.0";
        const lowest = scores.length > 0 ? Math.min(...scores).toFixed(1) : "0.0";

        return {
            earned,
            possible,
            percentage,
            avgPercentage,
            highest,
            lowest,
            submitted,
            notSubmitted,
            total: filteredItems.length,
            graded: courseGrades.length
        };
    }, [courseGrades, filteredItems]);

    // Helper function to lighten color for gradient
    const lightenColor = (color: string, amount: number = 20): string => {
        const hex = color.replace('#', '');
        const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
        const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
        const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    const darkenColor = (color: string, amount: number = 20): string => {
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount);
        const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount);
        const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    return (
        <div id="wd-grades">
            {/* ═══════════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════════ */}
            <div className="wd-grades-header">
                <div>
                    <h3>Grades</h3>
                    <p className="text-muted mb-0">
                        {filteredItems.length} assignments • {statistics.graded} graded
                    </p>
                </div>
                <div className="wd-header-buttons">
                    <Button
                        variant="outline-secondary"
                        className="wd-icon-btn"
                        onClick={exportToCSV}
                    >
                        <BsFileEarmarkArrowUp className="me-2" />
                        Export
                    </Button>
                    <Button variant="outline-secondary" className="wd-icon-btn">
                        <BsFileEarmarkArrowDown className="me-2" />
                        Import
                    </Button>
                    <Button variant="outline-secondary" className="wd-icon-btn">
                        <BsGear className="me-2" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
          ANALYTICS (COLLAPSIBLE) - WITH DYNAMIC COURSE COLOR
          ═══════════════════════════════════════════════════════════════ */}
            {showAnalytics && (
                <div
                    className="wd-grade-analytics"
                    style={{
                        background: `linear-gradient(135deg, ${courseColor} 0%, ${lightenColor(courseColor, 100)} 100%)`,
                        boxShadow: `0 8px 24px ${courseColor}40`
                    }}
                >
                    <div className="wd-analytics-header">
                        <h5>Performance Analytics</h5>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => setShowAnalytics(false)}
                        >
                            Hide
                        </Button>
                    </div>
                    <div className="wd-analytics-grid">
                        <div className="wd-metric-card current">
                            <div className="wd-metric-label">Current Grade</div>
                            <div className="wd-metric-value">{statistics.percentage}%</div>
                            <div className="wd-metric-detail">
                                {statistics.earned} / {statistics.possible} points
                            </div>
                        </div>
                        <div className="wd-metric-card average">
                            <div className="wd-metric-label">Average Score</div>
                            <div className="wd-metric-value">{statistics.avgPercentage}%</div>
                            <div className="wd-metric-detail">
                                Across {statistics.graded} items
                            </div>
                        </div>
                        <div className="wd-metric-card highest">
                            <div className="wd-metric-label">Highest Grade</div>
                            <div className="wd-metric-value">{statistics.highest}%</div>
                            <div className="wd-metric-detail">Best performance</div>
                        </div>
                        <div className="wd-metric-card lowest">
                            <div className="wd-metric-label">Lowest Grade</div>
                            <div className="wd-metric-value">{statistics.lowest}%</div>
                            <div className="wd-metric-detail">Needs improvement</div>
                        </div>
                        <div className="wd-metric-card submitted">
                            <div className="wd-metric-label">Submitted</div>
                            <div className="wd-metric-value">{statistics.submitted}</div>
                            <div className="wd-metric-detail">Assignments turned in</div>
                        </div>
                        <div className="wd-metric-card missing">
                            <div className="wd-metric-label">Missing</div>
                            <div className="wd-metric-value">{statistics.notSubmitted}</div>
                            <div className="wd-metric-detail">Not yet submitted</div>
                        </div>
                    </div>
                </div>
            )}

            {!showAnalytics && (
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="mb-3"
                    onClick={() => setShowAnalytics(true)}
                >
                    Show Analytics
                </Button>
            )}

            {/* ═══════════════════════════════════════════════════════════════
          FILTERS
          ═══════════════════════════════════════════════════════════════ */}
            <div className="wd-filters-bar">
                <Row className="g-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label className="wd-filter-label">Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search assignments..."
                                value={searchAssignment}
                                onChange={(e) => setSearchAssignment(e.target.value)}
                                className="wd-filter-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="wd-filter-label">Type</Form.Label>
                            <Form.Select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                                className="wd-filter-input"
                            >
                                <option value="ALL">All Types</option>
                                <option value="assignment">Assignments</option>
                                <option value="quiz">Quizzes</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="wd-filter-label">Status</Form.Label>
                            <Form.Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                                className="wd-filter-input"
                            >
                                <option value="ALL">All Status</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Not Submitted">Not Submitted</option>
                                <option value="Completed">Completed</option>
                                <option value="Not Available">Not Available</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label className="wd-filter-label">Sort By</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100">
                                    {sortOrder === "asc" ? <BsSortDown /> : <BsSortUp />}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSort("title")}>
                                        Title {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSort("dueDate")}>
                                        Due Date {sortField === "dueDate" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSort("points")}>
                                        Points {sortField === "points" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSort("grade")}>
                                        Grade {sortField === "grade" && (sortOrder === "asc" ? "↑" : "↓")}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
          GRADES TABLE
          ═══════════════════════════════════════════════════════════════ */}
            <div className="wd-table-container">
                <Table hover className="wd-grades-table">
                    <thead>
                    <tr>
                        <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                            Assignment {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th>Type</th>
                        <th onClick={() => handleSort("dueDate")} style={{ cursor: "pointer" }}>
                            Due Date {sortField === "dueDate" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th>Status</th>
                        <th onClick={() => handleSort("grade")} style={{ cursor: "pointer" }}>
                            Score {sortField === "grade" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("points")} style={{ cursor: "pointer" }}>
                            Max Points {sortField === "points" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th>Percentage</th>
                        <th>Submitted</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredItems.map((item) => {
                        const gradeRecord = getGradeForItem(item._id);
                        const score = gradeRecord?.grade ?? null;
                        const maxPoints = item.points;
                        const status = gradeRecord?.status || "Not Available";
                        const percentage = calculatePercentage(score, maxPoints);

                        return (
                            <tr key={item._id} className="wd-grade-row">
                                <td className="wd-assignment-name">{item.title}</td>
                                <td>
                                    <Badge bg="secondary" className="wd-type-badge">
                                        {item.itemType.toUpperCase()}
                                    </Badge>
                                </td>
                                <td className="wd-due-date">{formatDate(item.dueDate)}</td>
                                <td>
                                    <Badge bg={getStatusBadge(status)} className="wd-status-badge">
                                        {status}
                                    </Badge>
                                </td>
                                <td className="wd-score-cell">
                                    {score !== null ? (
                                        <span className="wd-score">{score}</span>
                                    ) : (
                                        <span className="wd-no-score">—</span>
                                    )}
                                </td>
                                <td className="wd-max-points">{maxPoints}</td>
                                <td className="wd-percentage-cell">
                    <span className={`wd-percentage ${score !== null ? "wd-has-grade" : ""}`}>
                      {percentage}
                    </span>
                                </td>
                                <td className="wd-submitted-date">
                                    {gradeRecord?.submittedDate ? formatDateTime(gradeRecord.submittedDate) : "—"}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                    <tr
                        className="wd-total-row"
                        style={{
                            background: `linear-gradient(135deg, ${courseColor} 0%, ${lightenColor(courseColor, 100)} 100%)`
                        }}
                    >
                        <td colSpan={4}><strong>Course Total</strong></td>
                        <td className="wd-total-earned"><strong>{statistics.earned}</strong></td>
                        <td className="wd-total-possible"><strong>{statistics.possible}</strong></td>
                        <td className="wd-total-percentage"><strong>{statistics.percentage}%</strong></td>
                        <td></td>
                    </tr>
                    </tfoot>
                </Table>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
          NO RESULTS
          ═══════════════════════════════════════════════════════════════ */}
            {filteredItems.length === 0 && (
                <div className="wd-no-grades">
                    <BsFilter className="wd-no-grades-icon" />
                    <h5>No assignments found</h5>
                    <p>Try adjusting your filters or search criteria.</p>
                </div>
            )}
        </div>
    );
}
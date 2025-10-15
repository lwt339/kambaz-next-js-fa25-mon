// app/(Kambaz)/Courses/[cid]/Grades/page.tsx
// Role-based grades page with class overview for faculty

"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Table, Button, Form, Row, Col, Badge, Dropdown } from "react-bootstrap";
import { BsFileEarmarkArrowUp, BsGear, BsFilter, BsSortDown, BsSortUp } from "react-icons/bs";
import * as db from "../../../Database";
import { Assignment, Quiz, Exam, Grade, User, Enrollment, Course } from "../../../Database/type";
import { RootState } from "../../../store";
import "./grades.css";

interface GradeItem {
    _id: string;
    title: string;
    course: string;
    points: number;
    dueDate: string;
    itemType: 'Assignment' | 'Quiz' | 'Exam' | 'Project';
}

type StatusFilter = "ALL" | "Submitted" | "Not Submitted" | "Completed" | "Not Available";
type TypeFilter = "ALL" | "Assignment" | "Quiz" | "Exam" | "Project";
type SortField = "title" | "dueDate" | "points" | "grade";
type SortOrder = "asc" | "desc";

export default function Grades() {
    const params = useParams();
    const cid = params?.cid as string;

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { exams } = useSelector((state: RootState) => state.examsReducer);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
    const [sortField, setSortField] = useState<SortField>("dueDate");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [showAnalytics, setShowAnalytics] = useState(true);
    const [selectedStudentId, setSelectedStudentId] = useState<string>("");

    const allGrades = db.grades as Grade[];
    const allCourses = db.courses as Course[];
    const allUsers = db.users as User[];
    const allEnrollments = db.enrollments as Enrollment[];

    const currentCourse = allCourses.find((c: Course) => c._id === cid);
    const courseColor = currentCourse?.color || "#667eea";

    const canViewAllStudents = currentUser?.role === "FACULTY" ||
        currentUser?.role === "ADMIN" ||
        currentUser?.role === "TA";

    const enrolledStudentIds = allEnrollments
        .filter((e: Enrollment) => e.course === cid)
        .map((e: Enrollment) => e.user);

    const enrolledStudents = allUsers.filter((u: User) =>
        enrolledStudentIds.includes(u._id) && u.role === "STUDENT"
    );

    const viewingStudentId = canViewAllStudents
        ? (selectedStudentId || currentUser?._id)
        : currentUser?._id;

    const relevantGrades = allGrades.filter((grade: Grade) => {
        if (grade.course !== cid) return false;

        if (canViewAllStudents && selectedStudentId) {
            return grade.student === selectedStudentId;
        } else if (canViewAllStudents && !selectedStudentId) {
            return true;
        } else {
            return grade.student === currentUser?._id;
        }
    });

    const courseAssignments = assignments.filter((a: Assignment) => a.course === cid);
    const courseQuizzes = quizzes.filter((q: Quiz) => q.course === cid);
    const courseExams = exams.filter((e: Exam) => e.course === cid);

    const allItems: GradeItem[] = useMemo(() => [
        ...courseAssignments.map((a): GradeItem => ({
            _id: a._id,
            title: a.title,
            course: a.course,
            points: a.points,
            dueDate: a.dueDate,
            itemType: a.assignmentType === "PROJECTS" ? 'Project' : 'Assignment'
        })),
        ...courseQuizzes.map((q): GradeItem => ({
            _id: q._id,
            title: q.title,
            course: q.course,
            points: q.points,
            dueDate: q.dueDate,
            itemType: 'Quiz'
        })),
        ...courseExams.map((e): GradeItem => ({
            _id: e._id,
            title: e.title,
            course: e.course,
            points: e.points,
            dueDate: e.dueDate,
            itemType: 'Exam'
        }))
    ], [courseAssignments, courseQuizzes, courseExams]);

    const filteredItems = useMemo(() => {
        let result = allItems.filter((item: GradeItem) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (typeFilter !== "ALL") {
            result = result.filter((item: GradeItem) => item.itemType === typeFilter);
        }

        if (statusFilter !== "ALL") {
            result = result.filter((item: GradeItem) => {
                const gradeRecord = getGradeForItem(item._id);
                return gradeRecord?.status === statusFilter;
            });
        }

        result.sort((a: GradeItem, b: GradeItem) => {
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
    }, [allItems, searchTerm, typeFilter, statusFilter, sortField, sortOrder]);

    const getGradeForItem = (itemId: string): Grade | undefined => {
        return relevantGrades.find((g: Grade) => g.assignment === itemId);
    };

    const calculatePercentage = (score: number | null, maxPoints: number): string => {
        if (score === null || score === undefined || maxPoints === 0) return "—";
        return `${((score / maxPoints) * 100).toFixed(1)}%`;
    };

    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return "";
        }
    };

    const formatDateTime = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return "";
        }
    };

    const getStatusBadge = (status: string): string => {
        const badges: Record<string, string> = {
            "Submitted": "success",
            "Not Submitted": "danger",
            "Completed": "info",
            "Not Available": "secondary"
        };
        return badges[status] || "secondary";
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const exportStudentGrades = () => {
        const headers = ["Assignment", "Type", "Due Date", "Status", "Score", "Max Points", "Percentage"];
        const rows = filteredItems.map((item: GradeItem) => {
            const gradeRecord = getGradeForItem(item._id);
            const score = gradeRecord?.grade ?? null;
            const status = gradeRecord?.status || "Not Available";
            return [
                item.title,
                item.itemType,
                item.dueDate,
                status,
                score !== null ? score.toString() : "—",
                item.points.toString(),
                calculatePercentage(score, item.points)
            ];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map((row: string[]) => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const viewingStudent = allUsers.find((u: User) => u._id === viewingStudentId);
        const studentName = viewingStudent ? `${viewingStudent.firstName}-${viewingStudent.lastName}` : 'grades';
        link.download = `${currentCourse?.number || 'course'}-${studentName}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const exportClassGrades = () => {
        const headers = ["Student", "Login ID", ...allItems.map((item: GradeItem) => item.title), "Total Points", "Percentage"];
        const rows = enrolledStudents.map((student: User) => {
            const studentGrades = allGrades.filter((g: Grade) => g.course === cid && g.student === student._id);
            let totalEarned = 0;
            let totalPossible = 0;

            const gradeValues = allItems.map((item: GradeItem) => {
                const grade = studentGrades.find((g: Grade) => g.assignment === item._id);
                if (grade?.grade !== null && grade?.grade !== undefined) {
                    totalEarned += grade.grade;
                    totalPossible += item.points;
                    return grade.grade.toString();
                }
                totalPossible += item.points;
                return "—";
            });

            const percentage = totalPossible > 0 ? ((totalEarned / totalPossible) * 100).toFixed(1) : "0.0";

            return [
                `${student.firstName} ${student.lastName}`,
                student.loginId,
                ...gradeValues,
                `${totalEarned}/${totalPossible}`,
                `${percentage}%`
            ];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map((row: string[]) => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${currentCourse?.number || 'course'}-class-grades.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const exportToCSV = () => {
        if (canViewAllStudents && !selectedStudentId) {
            exportClassGrades();
        } else {
            exportStudentGrades();
        }
    };

    const statistics = useMemo(() => {
        let earned = 0;
        let possible = 0;
        let submitted = 0;
        let notSubmitted = 0;
        const scores: number[] = [];

        relevantGrades.forEach((grade: Grade) => {
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
        const avgPercentage = scores.length > 0
            ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
            : "0.0";
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
            graded: relevantGrades.length
        };
    }, [relevantGrades, filteredItems]);

    const lightenColor = (color: string, amount: number = 20): string => {
        const hex = color.replace('#', '');
        const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
        const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
        const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    const viewingStudent = allUsers.find((u: User) => u._id === viewingStudentId);

    return (
        <div id="wd-grades">
            <div className="wd-grades-header">
                <div>
                    <h3>Grades</h3>
                    {canViewAllStudents && viewingStudent && selectedStudentId && (
                        <p className="wd-grades-subtitle">
                            Viewing: {viewingStudent.firstName} {viewingStudent.lastName}
                        </p>
                    )}
                    <p className="wd-grades-subtitle">
                        {filteredItems.length} assignments • {statistics.graded} graded
                    </p>
                </div>
                <div className="wd-header-buttons">
                    <Button variant="outline-secondary" className="wd-icon-btn" onClick={exportToCSV}>
                        <BsFileEarmarkArrowUp className="me-2" />
                        Export
                    </Button>
                    <Button variant="outline-secondary" className="wd-icon-btn">
                        <BsGear className="me-2" />
                        Settings
                    </Button>
                </div>
            </div>

            {canViewAllStudents && (
                <div className="wd-student-selector-bar">
                    <Row className="align-items-end">
                        <Col md={5}>
                            <Form.Group>
                                <Form.Label className="fw-bold d-flex align-items-center gap-2">
                                    <BsFilter />
                                    <span>Select Student to View</span>
                                </Form.Label>
                                <Form.Select
                                    value={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    size="lg"
                                    className="wd-student-selector"
                                >
                                    <option value="">All Students (Class Overview)</option>
                                    {enrolledStudents.map((student: User) => (
                                        <option key={student._id} value={student._id}>
                                            {student.firstName} {student.lastName} - {student.loginId}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {selectedStudentId && (
                            <Col md={7}>
                                <div className="d-flex gap-2 flex-wrap">
                                    <Button variant="outline-primary" size="sm">
                                        Send Email
                                    </Button>
                                    <Button variant="outline-success" size="sm">
                                        View Profile
                                    </Button>
                                    <Button variant="outline-info" size="sm">
                                        Grade History
                                    </Button>
                                    <Button variant="outline-warning" size="sm">
                                        Add Comment
                                    </Button>
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>
            )}

            {showAnalytics && selectedStudentId && (
                <div
                    className="wd-grade-analytics"
                    style={{
                        background: `linear-gradient(135deg, ${courseColor} 0%, ${lightenColor(courseColor, 100)} 100%)`,
                        boxShadow: `0 8px 24px ${courseColor}40`
                    }}
                >
                    <div className="wd-analytics-header">
                        <h5 className="mb-0">Performance Analytics</h5>
                        <Button variant="link" size="sm" onClick={() => setShowAnalytics(false)}>
                            Hide
                        </Button>
                    </div>
                    <div className="wd-analytics-grid">
                        <div className="wd-metric-card current">
                            <div className="wd-metric-label">Current Grade</div>
                            <div className="wd-metric-value">{statistics.percentage}%</div>
                            <div className="wd-metric-detail">{statistics.earned} / {statistics.possible} points</div>
                        </div>
                        <div className="wd-metric-card average">
                            <div className="wd-metric-label">Average Score</div>
                            <div className="wd-metric-value">{statistics.avgPercentage}%</div>
                            <div className="wd-metric-detail">Across {statistics.graded} items</div>
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

            {!showAnalytics && selectedStudentId && (
                <Button variant="outline-primary" size="sm" className="mb-3" onClick={() => setShowAnalytics(true)}>
                    Show Analytics
                </Button>
            )}

            {selectedStudentId && (
                <div className="wd-filters-bar">
                    <Row className="g-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="wd-filter-label">Search</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Search assignments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <option value="Assignment">Assignments</option>
                                    <option value="Quiz">Quizzes</option>
                                    <option value="Exam">Exams</option>
                                    <option value="Project">Projects</option>
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
                                <Form.Label className="wd-filter-label">Sort</Form.Label>
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
            )}

            {canViewAllStudents && !selectedStudentId ? (
                <>
                    <div className="wd-grades-table-container">
                        <div className="wd-class-overview-header">
                            <h5>Class Overview - All Students</h5>
                            <small className="text-muted">
                                {enrolledStudents.length} students enrolled • Select a student above for detailed view
                            </small>
                        </div>
                        <Table hover className="wd-grades-table mb-0">
                            <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Login ID</th>
                                <th>Assignments</th>
                                <th>Quizzes</th>
                                <th>Exams</th>
                                <th>Total Score</th>
                                <th>Percentage</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {enrolledStudents.map((student: User) => {
                                const studentGrades = allGrades.filter(
                                    (g: Grade) => g.course === cid && g.student === student._id
                                );

                                let totalEarned = 0;
                                let totalPossible = 0;

                                studentGrades.forEach((grade: Grade) => {
                                    if (grade.grade !== null && grade.grade !== undefined) {
                                        totalEarned += grade.grade;
                                        totalPossible += grade.maxPoints;
                                    }
                                });

                                const percentage = totalPossible > 0
                                    ? ((totalEarned / totalPossible) * 100).toFixed(1)
                                    : "0.0";

                                const assignmentsCount = studentGrades.filter((g: Grade) => {
                                    const item = allItems.find((i: GradeItem) => i._id === g.assignment);
                                    return item?.itemType === 'Assignment';
                                }).length;

                                const quizzesCount = studentGrades.filter((g: Grade) => {
                                    const item = allItems.find((i: GradeItem) => i._id === g.assignment);
                                    return item?.itemType === 'Quiz';
                                }).length;

                                const examsCount = studentGrades.filter((g: Grade) => {
                                    const item = allItems.find((i: GradeItem) => i._id === g.assignment);
                                    return item?.itemType === 'Exam';
                                }).length;

                                return (
                                    <tr key={student._id} className="wd-grade-row">
                                        <td className="wd-assignment-name">
                                            {student.firstName} {student.lastName}
                                        </td>
                                        <td className="wd-due-date">{student.loginId}</td>
                                        <td className="text-center">
                                            <Badge bg="primary" className="wd-type-badge">
                                                {assignmentsCount}
                                            </Badge>
                                        </td>
                                        <td className="text-center">
                                            <Badge bg="info" className="wd-type-badge">
                                                {quizzesCount}
                                            </Badge>
                                        </td>
                                        <td className="text-center">
                                            <Badge bg="warning" className="wd-type-badge">
                                                {examsCount}
                                            </Badge>
                                        </td>
                                        <td className="wd-score-cell">
                                            <span className="wd-score">{totalEarned} / {totalPossible}</span>
                                        </td>
                                        <td className="wd-percentage-cell">
                                                <span className="wd-percentage wd-has-grade">
                                                    {percentage}%
                                                </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => setSelectedStudentId(student._id)}
                                            >
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                            <tfoot>
                            {(() => {
                                let totalAssignments = 0;
                                let totalQuizzes = 0;
                                let totalExams = 0;
                                let totalEarned = 0;
                                let totalPossible = 0;
                                const percentages: number[] = [];

                                enrolledStudents.forEach((student: User) => {
                                    const studentGrades = allGrades.filter(
                                        (g: Grade) => g.course === cid && g.student === student._id
                                    );

                                    let studentEarned = 0;
                                    let studentPossible = 0;

                                    studentGrades.forEach((grade: Grade) => {
                                        if (grade.grade !== null && grade.grade !== undefined) {
                                            studentEarned += grade.grade;
                                            studentPossible += grade.maxPoints;
                                        }

                                        const item = allItems.find((i: GradeItem) => i._id === grade.assignment);
                                        if (item?.itemType === 'Assignment') totalAssignments++;
                                        if (item?.itemType === 'Quiz') totalQuizzes++;
                                        if (item?.itemType === 'Exam') totalExams++;
                                    });

                                    totalEarned += studentEarned;
                                    totalPossible += studentPossible;

                                    if (studentPossible > 0) {
                                        percentages.push((studentEarned / studentPossible) * 100);
                                    }
                                });

                                const avgAssignments = enrolledStudents.length > 0
                                    ? (totalAssignments / enrolledStudents.length).toFixed(1)
                                    : "0.0";

                                const avgQuizzes = enrolledStudents.length > 0
                                    ? (totalQuizzes / enrolledStudents.length).toFixed(1)
                                    : "0.0";

                                const avgExams = enrolledStudents.length > 0
                                    ? (totalExams / enrolledStudents.length).toFixed(1)
                                    : "0.0";

                                const avgScore = enrolledStudents.length > 0
                                    ? `${(totalEarned / enrolledStudents.length).toFixed(1)} / ${(totalPossible / enrolledStudents.length).toFixed(1)}`
                                    : "0 / 0";

                                const avgPercentage = percentages.length > 0
                                    ? (percentages.reduce((a, b) => a + b, 0) / percentages.length).toFixed(1)
                                    : "0.0";

                                return (
                                    <tr className="wd-class-average-row">
                                        <td colSpan={2}><strong>Class Average</strong></td>
                                        <td className="text-center"><strong>{avgAssignments}</strong></td>
                                        <td className="text-center"><strong>{avgQuizzes}</strong></td>
                                        <td className="text-center"><strong>{avgExams}</strong></td>
                                        <td className="wd-score-cell"><strong>{avgScore}</strong></td>
                                        <td className="wd-percentage-cell"><strong>{avgPercentage}%</strong></td>
                                        <td></td>
                                    </tr>
                                );
                            })()}
                            </tfoot>
                        </Table>
                    </div>
                </>
            ) : (
                <>
                    <div className="wd-grades-table-container">
                        <Table hover className="wd-grades-table mb-0">
                            <thead>
                            <tr>
                                <th onClick={() => handleSort("title")}>
                                    Assignment {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                                <th>Type</th>
                                <th onClick={() => handleSort("dueDate")}>
                                    Due Date {sortField === "dueDate" && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                                <th>Status</th>
                                <th onClick={() => handleSort("grade")}>
                                    Score {sortField === "grade" && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                                <th onClick={() => handleSort("points")}>
                                    Max Points {sortField === "points" && (sortOrder === "asc" ? "↑" : "↓")}
                                </th>
                                <th>Percentage</th>
                                <th>Submitted</th>
                                {canViewAllStudents && <th>Edit</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {filteredItems.map((item: GradeItem) => {
                                const gradeRecord = getGradeForItem(item._id);
                                const score = gradeRecord?.grade ?? null;
                                const status = gradeRecord?.status || "Not Available";
                                const percentage = calculatePercentage(score, item.points);

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
                                        <td className="wd-max-points">{item.points}</td>
                                        <td className="wd-percentage-cell">
                                                <span className={`wd-percentage ${score !== null ? "wd-has-grade" : ""}`}>
                                                    {percentage}
                                                </span>
                                        </td>
                                        <td className="wd-submitted-date">
                                            {gradeRecord?.submittedDate ? formatDateTime(gradeRecord.submittedDate) : "—"}
                                        </td>
                                        {canViewAllStudents && (
                                            <td>
                                                <Button variant="outline-primary" size="sm">
                                                    Edit Grade
                                                </Button>
                                            </td>
                                        )}
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
                                <td className="wd-total-percentage">
                                    <strong style={{ color: courseColor }}>{statistics.percentage}%</strong>
                                </td>
                                <td colSpan={canViewAllStudents ? 2 : 1}></td>
                            </tr>
                            </tfoot>
                        </Table>
                    </div>
                </>
            )}

            {filteredItems.length === 0 && selectedStudentId && (
                <div className="wd-no-grades">
                    <BsFilter className="wd-no-grades-icon" />
                    <h5>No assignments found</h5>
                    <p>Try adjusting your filters or search criteria.</p>
                </div>
            )}
        </div>
    );
}
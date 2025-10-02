/**
 * Grades Page - TypeScript Fixed Version
 * Location: app/(Kambaz)/Courses/[cid]/Grades/page.tsx
 *
 * Displays grades for the current course with proper TypeScript types.
 * No more ESLint "unexpected any" errors!
 */

"use client";

import { useParams } from "next/navigation";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { BsFileEarmarkArrowDown, BsGear } from "react-icons/bs";
import * as db from "../../../Database";

/**
 * TypeScript Interfaces
 * Define the shape of our data to avoid "any" type errors
 */
interface Assignment {
    _id: string;
    title: string;
    course: string;
    points: number;
    dueDate: string;
    availableDate?: string;
}

interface Quiz {
    _id: string;
    title: string;
    course: string;
    points: number;
    dueDate: string;
    availableDate: string;
    questions: number;
    timeLimit: number;
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

interface GradeItem extends Assignment {
    type: 'assignment' | 'quiz';
}

export default function GradesPage() {
    const params = useParams();
    const cid = params?.cid as string;

    /**
     * Current user ID (in real app, this would come from auth)
     */
    const currentUserId = "U001";

    /**
     * Type the database imports properly
     */
    const allGrades = db.grades as Grade[];
    const allAssignments = db.assignments as Assignment[];
    const allQuizzes = db.quizzes as Quiz[];

    /**
     * Filter grades for current course and student
     */
    const courseGrades = allGrades.filter(
        (grade) => grade.course === cid && grade.student === currentUserId
    );

    /**
     * Get assignments and quizzes for the course
     */
    const courseAssignments = allAssignments.filter((a) => a.course === cid);
    const courseQuizzes = allQuizzes.filter((q) => q.course === cid);

    /**
     * Merge assignments and quizzes, then sort by due date
     */
    const allItems: GradeItem[] = [
        ...courseAssignments.map((a) => ({ ...a, type: 'assignment' as const })),
        ...courseQuizzes.map((q) => ({ ...q, type: 'quiz' as const }))
    ].sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    /**
     * Calculate percentage with proper null handling
     */
    const calculatePercentage = (score: number | null, maxPoints: number): string => {
        if (score === null || score === undefined) return "-";
        if (maxPoints === 0) return "-";
        return `${((score / maxPoints) * 100).toFixed(1)}%`;
    };

    /**
     * Calculate total grade across all graded items
     */
    const calculateTotalGrade = () => {
        let totalEarned = 0;
        let totalPossible = 0;

        courseGrades.forEach((grade) => {
            if (grade.grade !== null && grade.grade !== undefined) {
                totalEarned += grade.grade;
                totalPossible += grade.maxPoints;
            }
        });

        if (totalPossible === 0) {
            return { earned: 0, possible: 0, percentage: "0.0" };
        }

        const percentage = ((totalEarned / totalPossible) * 100).toFixed(1);
        return { earned: totalEarned, possible: totalPossible, percentage };
    };

    const totalGrade = calculateTotalGrade();

    /**
     * Find grade record for a specific assignment or quiz
     */
    const getGradeForItem = (itemId: string): Grade | undefined => {
        return courseGrades.find((g) => g.assignment === itemId);
    };

    /**
     * Format date for table display
     */
    const formatDueDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div id="wd-grades" className="p-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Grades</h3>
                <div>
                    <Button variant="secondary" className="me-2">
                        <BsFileEarmarkArrowDown className="me-1" />
                        Import
                    </Button>
                    <Button variant="secondary">
                        <BsGear className="me-1" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* Filter Section */}
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Student Names</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search Students"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Assignment Names</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search Assignments"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Grades Table */}
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Assignment Name</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Out of</th>
                        <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allItems.map((item) => {
                        const gradeRecord = getGradeForItem(item._id);
                        const score = gradeRecord?.grade ?? null;
                        const maxPoints = item.points;
                        const status = gradeRecord?.status || "Not Available";

                        return (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{formatDueDate(item.dueDate)}</td>
                                <td>
                                        <span className={`badge ${
                                            status === "Submitted" ? "bg-success" :
                                                status === "Not Submitted" ? "bg-danger" :
                                                    status === "Completed" ? "bg-info" :
                                                        "bg-secondary"
                                        }`}>
                                            {status}
                                        </span>
                                </td>
                                <td>{score !== null ? score : "-"}</td>
                                <td>{maxPoints}</td>
                                <td>{calculatePercentage(score, maxPoints)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                    <tr className="fw-bold table-active">
                        <td colSpan={3}>Current Grade</td>
                        <td colSpan={3}>
                            {totalGrade.earned}/{totalGrade.possible} ({totalGrade.percentage}%)
                        </td>
                    </tr>
                    </tfoot>
                </Table>
            </div>

            {/* Summary Section */}
            <div className="mt-4 p-3 bg-light rounded">
                <h5>Grade Summary</h5>
                <p className="mb-1">
                    <strong>Total Points Earned:</strong> {totalGrade.earned}
                </p>
                <p className="mb-1">
                    <strong>Total Points Possible:</strong> {totalGrade.possible}
                </p>
                <p className="mb-0">
                    <strong>Current Percentage:</strong> {totalGrade.percentage}%
                </p>
            </div>
        </div>
    );
}


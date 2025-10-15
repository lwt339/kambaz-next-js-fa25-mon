// File: app/(Kambaz)/Courses/[cid]/Home/FacultyPanels.tsx
// Shows instructors what needs attention and recent course activity

"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import * as db from "../../../Database";
import { Assignment, Quiz, Exam, Grade, Course, Enrollment } from "../../../Database/type";
import { RootState } from "../../../store";

// What each task in the To Do list looks like
interface TaskItem {
    _id: string;
    title: string;
    description: string;
    count: number;
    type: "grading" | "announcement" | "management";
}

// What each activity in Recent Activity looks like
interface ActivityItem {
    _id: string;
    title: string;
    detail: string;
    type: "submission" | "enrollment" | "completion";
}

export default function FacultyPanels() {
    const params = useParams();
    const cid = params?.cid as string;

    // Track which items have been dismissed
    const [removedTaskIds, setRemovedTaskIds] = useState<Set<string>>(new Set());
    const [removedActivityIds, setRemovedActivityIds] = useState<Set<string>>(new Set());

    // Get the current logged-in user
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // Pull all data from the database
    const allAssignments = db.assignments as Assignment[];
    const allQuizzes = db.quizzes as Quiz[];
    const allExams = db.exams as Exam[];
    const allGrades = db.grades as Grade[];
    const allEnrollments = db.enrollments as Enrollment[];
    const courses = db.courses as Course[];

    // Find current course info
    const currentCourse = courses.find((c: Course) => c._id === cid);

    // Remove a task when X is clicked
    const removeTaskItem = (taskId: string) => {
        setRemovedTaskIds(new Set(removedTaskIds).add(taskId));
    };

    // Remove an activity when X is clicked
    const removeActivityItem = (activityId: string) => {
        setRemovedActivityIds(new Set(removedActivityIds).add(activityId));
    };

    // Build list of things instructor needs to handle
    const taskItems = useMemo(() => {
        if (!currentUser) return [];

        const tasks: TaskItem[] = [];

        // Count submissions waiting for grades
        const submissionsToGrade = allGrades.filter(
            (g: Grade) => g.course === cid &&
                g.status === "Submitted" &&
                g.grade === null
        ).length;

        if (submissionsToGrade > 0) {
            tasks.push({
                _id: "task-grading",
                title: "Grade Submissions",
                description: `${submissionsToGrade} submission${submissionsToGrade !== 1 ? 's' : ''} waiting`,
                count: submissionsToGrade,
                type: "grading"
            });
        }

        // Check for upcoming assignments
        const now = new Date();
        const upcomingAssignments = allAssignments.filter(
            (a: Assignment) => a.course === cid && new Date(a.dueDate) > now
        );

        if (upcomingAssignments.length > 0) {
            tasks.push({
                _id: "task-upcoming",
                title: "Upcoming Assignments",
                description: `${upcomingAssignments.length} assignment${upcomingAssignments.length !== 1 ? 's' : ''} due soon`,
                count: upcomingAssignments.length,
                type: "management"
            });
        }

        // Count enrolled students
        const enrolledStudents = allEnrollments.filter((e: Enrollment) => e.course === cid).length;

        tasks.push({
            _id: "task-students",
            title: "Manage Students",
            description: `${enrolledStudents} student${enrolledStudents !== 1 ? 's' : ''} enrolled`,
            count: enrolledStudents,
            type: "management"
        });

        // Filter out dismissed tasks
        return tasks.filter((task: TaskItem) => !removedTaskIds.has(task._id));
    }, [currentUser, cid, allGrades, allAssignments, allEnrollments, removedTaskIds]);

    // Build list of recent course activity
    const activityItems = useMemo(() => {
        if (!currentUser) return [];

        const activities: ActivityItem[] = [];

        // Get recent submissions
        const recentSubmissions = allGrades
            .filter((g: Grade) => g.course === cid && g.status === "Submitted")
            .sort((a: Grade, b: Grade) => {
                const dateA = a.submittedDate ? new Date(a.submittedDate).getTime() : 0;
                const dateB = b.submittedDate ? new Date(b.submittedDate).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, 3);

        // For each submission, find what it was for
        recentSubmissions.forEach((grade: Grade) => {
            const assignment = allAssignments.find((a: Assignment) => a._id === grade.assignment);
            const quiz = allQuizzes.find((q: Quiz) => q._id === grade.assignment);
            const exam = allExams.find((e: Exam) => e._id === grade.assignment);

            const title = assignment?.title || quiz?.title || exam?.title || "Unknown";

            activities.push({
                _id: grade._id,
                title: "New Submission",
                detail: title,
                type: "submission"
            });
        });

        // Show grading progress stats
        const totalItems = allAssignments.filter((a: Assignment) => a.course === cid).length +
            allQuizzes.filter((q: Quiz) => q.course === cid).length;
        const gradedItems = allGrades.filter((g: Grade) => g.course === cid && g.grade !== null).length;

        if (gradedItems > 0) {
            activities.push({
                _id: "activity-completion",
                title: "Grading Progress",
                detail: `${gradedItems} of ${totalItems} items graded`,
                type: "completion"
            });
        }

        // Filter out dismissed activities
        return activities.filter((activity: ActivityItem) => !removedActivityIds.has(activity._id));
    }, [currentUser, cid, allGrades, allAssignments, allQuizzes, allExams, removedActivityIds]);

    return (
        <>
            {/* To Do panel showing tasks */}
            <div className="wd-panel mt-4">
                <h3>To Do</h3>
                <div className="wd-panel-content">
                    {taskItems.length === 0 ? (
                        <div className="wd-empty-state">
                            <p>All caught up!</p>
                        </div>
                    ) : (
                        <>
                            {taskItems.slice(0, 7).map((task: TaskItem) => (
                                <div key={task._id} className="wd-todo-item">
                                    <FaRegFileAlt className="wd-todo-icon" />
                                    <div className="wd-todo-content">
                                        <a href="#" className="wd-todo-link">{task.title}</a>
                                        <div className="wd-todo-info">
                                            {currentCourse?.number} {currentCourse?.name}
                                        </div>
                                        <div className="wd-todo-info">{task.description}</div>
                                    </div>
                                    <button
                                        className="wd-todo-remove"
                                        aria-label="Remove"
                                        onClick={() => removeTaskItem(task._id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {taskItems.length > 7 && (
                                <div className="wd-panel-more">
                                    {taskItems.length - 7} more ...
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Recent Activity panel */}
            <div className="wd-panel mt-4">
                <h3>Recent Activity</h3>
                <div className="wd-panel-content">
                    {activityItems.length === 0 ? (
                        <div className="wd-empty-state">
                            <p>No recent activity</p>
                        </div>
                    ) : (
                        <>
                            {activityItems.slice(0, 3).map((activity: ActivityItem) => (
                                <div key={activity._id} className="wd-feedback-item">
                                    <div className="wd-feedback-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FaCheckCircle className="wd-feedback-check" />
                                            <div className="wd-feedback-content">
                                                <div className="wd-feedback-title">{activity.title}</div>
                                                <div className="wd-feedback-info">
                                                    {currentCourse?.number}
                                                </div>
                                                <div className="wd-feedback-info">{activity.detail}</div>
                                            </div>
                                        </div>
                                        <button
                                            className="wd-todo-remove"
                                            aria-label="Remove"
                                            onClick={() => removeActivityItem(activity._id)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {activityItems.length > 3 && (
                                <div className="wd-panel-more">
                                    {activityItems.length - 3} more ...
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
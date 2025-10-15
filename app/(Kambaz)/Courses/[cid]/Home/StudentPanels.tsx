// File: app/(Kambaz)/Courses/[cid]/Home/StudentPanels.tsx
// Shows what students need to do and recent feedback on their work
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FaRegFileAlt, FaCheckCircle } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import * as db from "../../../Database";
import { User, Assignment, Quiz, Exam, Grade, Course } from "../../../Database/type";

// How we grab the current user from Redux
interface RootState {
    accountReducer: {
        currentUser: User | null;
    };
}

// What each thing in the To Do list looks like
interface TodoItem {
    _id: string;
    title: string;
    course: string;
    dueDate: string;
    points: number;
    type: "assignment" | "quiz" | "exam";
}

// What each thing in Recent Feedback looks like
interface FeedbackItem {
    _id: string;
    title: string;
    course: string;
    grade: number;
    maxPoints: number;
    percentage: number;
    comment: string;
}

export default function StudentPanels() {
    const params = useParams();
    const cid = params?.cid as string;

    // Keep track of which items have been removed by the user
    const [removedTodoIds, setRemovedTodoIds] = useState<Set<string>>(new Set());
    const [removedFeedbackIds, setRemovedFeedbackIds] = useState<Set<string>>(new Set());

    // Get who's logged in right now
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // Pull all the data we'll need from the database
    const allAssignments = db.assignments as Assignment[];
    const allQuizzes = db.quizzes as Quiz[];
    const allExams = db.exams as Exam[];
    const allGrades = db.grades as Grade[];
    const courses = db.courses as Course[];

    // Find the course we're looking at right now
    const currentCourse = courses.find((c: Course) => c._id === cid);

    // Function to remove a todo item when the X button is clicked
    const removeTodoItem = (itemId: string) => {
        setRemovedTodoIds(new Set(removedTodoIds).add(itemId));
    };

    // Function to remove a feedback item when the X button is clicked
    const removeFeedbackItem = (itemId: string) => {
        setRemovedFeedbackIds(new Set(removedFeedbackIds).add(itemId));
    };

    // Build up the list of stuff that's still due
    const todoItems = useMemo(() => {
        if (!currentUser) return [];

        const items: TodoItem[] = [];
        const now = new Date();

        // Check all assignments in this course
        allAssignments
            .filter((a: Assignment) => a.course === cid)
            .forEach((assignment: Assignment) => {
                // See if this student has turned it in yet
                const gradeRecord = allGrades.find(
                    (g: Grade) => g.student === currentUser._id && g.assignment === assignment._id
                );

                // If it's not submitted and there's still time, add it to the list
                const isNotSubmitted = !gradeRecord || gradeRecord.status === "Not Submitted";
                const notYetDue = new Date(assignment.dueDate) >= now;

                if (isNotSubmitted && notYetDue) {
                    items.push({
                        _id: assignment._id,
                        title: assignment.title,
                        course: assignment.course,
                        dueDate: assignment.dueDate,
                        points: assignment.points,
                        type: "assignment"
                    });
                }
            });

        // Do the same thing for quizzes
        allQuizzes
            .filter((q: Quiz) => q.course === cid)
            .forEach((quiz: Quiz) => {
                const gradeRecord = allGrades.find(
                    (g: Grade) => g.student === currentUser._id && g.assignment === quiz._id
                );

                const isNotSubmitted = !gradeRecord || gradeRecord.status === "Not Submitted";
                const notYetDue = new Date(quiz.dueDate) >= now;

                if (isNotSubmitted && notYetDue) {
                    items.push({
                        _id: quiz._id,
                        title: quiz.title,
                        course: quiz.course,
                        dueDate: quiz.dueDate,
                        points: quiz.points,
                        type: "quiz"
                    });
                }
            });

        // And check exams too
        allExams
            .filter((e: Exam) => e.course === cid)
            .forEach((exam: Exam) => {
                const gradeRecord = allGrades.find(
                    (g: Grade) => g.student === currentUser._id && g.assignment === exam._id
                );

                const isNotSubmitted = !gradeRecord || gradeRecord.status === "Not Submitted";
                const notYetDue = new Date(exam.dueDate) >= now;

                if (isNotSubmitted && notYetDue) {
                    items.push({
                        _id: exam._id,
                        title: exam.title,
                        course: exam.course,
                        dueDate: exam.dueDate,
                        points: exam.points,
                        type: "exam"
                    });
                }
            });

        // Put the most urgent stuff at the top and filter out removed items
        return items
            .sort((a: TodoItem, b: TodoItem) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            )
            .filter((item: TodoItem) => !removedTodoIds.has(item._id));
    }, [currentUser, cid, allAssignments, allQuizzes, allExams, allGrades, removedTodoIds]);

    // Build the list of recent grades
    const feedbackItems = useMemo(() => {
        if (!currentUser) return [];

        const items: FeedbackItem[] = [];

        // Find all the grades this student got in this course
        const studentGrades = allGrades.filter(
            (g: Grade) => g.student === currentUser._id &&
                g.course === cid &&
                g.grade !== null &&
                g.status === "Submitted"
        );

        // For each grade, figure out what assignment it was for
        studentGrades.forEach((grade: Grade) => {
            let title = "Unknown";

            // Try to find it in assignments first
            const assignment = allAssignments.find((a: Assignment) => a._id === grade.assignment);
            if (assignment) {
                title = assignment.title;
            } else {
                // Maybe it's a quiz?
                const quiz = allQuizzes.find((q: Quiz) => q._id === grade.assignment);
                if (quiz) {
                    title = quiz.title;
                } else {
                    // Or an exam?
                    const exam = allExams.find((e: Exam) => e._id === grade.assignment);
                    if (exam) {
                        title = exam.title;
                    }
                }
            }

            // Calculate the percentage and pick an encouraging message
            const percentage = (grade.grade! / grade.maxPoints) * 100;
            let comment = "Good Work!";

            if (percentage === 100) {
                comment = "Perfect Score!";
            } else if (percentage >= 90) {
                comment = "Excellent Work!";
            } else if (percentage >= 80) {
                comment = "Good Job!";
            } else if (percentage >= 70) {
                comment = "Keep Improving!";
            }

            items.push({
                _id: grade._id,
                title,
                course: grade.course,
                grade: grade.grade!,
                maxPoints: grade.maxPoints,
                percentage,
                comment
            });
        });

        // Show just the 5 most recent grades and filter out removed items
        return items
            .slice(-5)
            .reverse()
            .filter((item: FeedbackItem) => !removedFeedbackIds.has(item._id));
    }, [currentUser, cid, allGrades, allAssignments, allQuizzes, allExams, removedFeedbackIds]);

    // Pick the right icon based on what kind of thing it is
    const getItemIcon = (type: string) => {
        if (type === "assignment") return <MdAssignment className="me-2" />;
        if (type === "quiz") return <GrNotes className="me-2" />;
        return <FaRegFileAlt className="me-2" />;
    };

    // Make dates look nicer like "Oct 15 at 11:59pm"
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return `${month} ${day} at ${time}`;
    };

    return (
        <>
            {/* Shows what's coming up that needs to be done */}
            <div className="wd-panel mt-4">
                <h3>To Do</h3>
                <div className="wd-panel-content">
                    {todoItems.length === 0 ? (
                        <div className="wd-empty-state">
                            <FaCheckCircle className="wd-empty-icon" />
                            <p>Nothing for now!</p>
                        </div>
                    ) : (
                        todoItems.map((item: TodoItem) => (
                            <div key={item._id} className="wd-todo-item">
                                <div className="wd-todo-header" style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                        <div style={{ alignSelf: 'flex-start', marginTop: '0.125rem' }}>
                                            {getItemIcon(item.type)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className="wd-todo-title" style={{ marginBottom: '0.25rem' }}>{item.title}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', color: '#6c757d', lineHeight: '1.5' }}>
                                                <span className="wd-course-code" style={{ marginBottom: '0.125rem' }}>
                                                    {currentCourse?.number || cid}
                                                </span>
                                                <span className="wd-due-date">{formatDate(item.dueDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="wd-todo-remove"
                                        aria-label="Remove"
                                        onClick={() => removeTodoItem(item._id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Shows grades that just came back */}
            <div className="wd-panel mt-4">
                <h3>Recent Feedback</h3>
                <div className="wd-panel-content">
                    {feedbackItems.length === 0 ? (
                        <div className="wd-empty-state">
                            <p>No feedback yet</p>
                        </div>
                    ) : (
                        feedbackItems.map((item: FeedbackItem) => (
                            <div key={item._id} className="wd-feedback-item">
                                <div className="wd-feedback-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaCheckCircle className="wd-feedback-check" />
                                        <span className="wd-feedback-title">{item.title}</span>
                                    </div>
                                    <button
                                        className="wd-todo-remove"
                                        aria-label="Remove"
                                        onClick={() => removeFeedbackItem(item._id)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="wd-feedback-details">
                                    <span className="wd-course-code">
                                        {currentCourse?.number || cid}
                                    </span>
                                </div>
                                <div className="wd-feedback-score">
                                    {item.percentage.toFixed(2)}%
                                </div>
                                <div className="wd-feedback-comment">
                                    &quot;{item.comment}&quot;
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
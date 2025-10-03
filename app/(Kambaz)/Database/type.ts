/**
 * Kambaz Database TypeScript Type Definitions
 * Define all interfaces for type-safe database access
 *
 * File: app/(Kambaz)/Database/types.ts
 */

/**
 * Course Interface
 * Represents a course in the system
 */
export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    instructor: string;
    description: string;
    image: string;
    color: string;
}

/**
 * Module Interface
 * Represents a course module with lessons
 */
export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: Lesson[];
}

/**
 * Lesson Interface
 * Represents a lesson within a module
 */
export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
}

/**
 * Assignment Interface
 * Represents a course assignment
 */
export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    assignmentType: "ASSIGNMENT" | "PROJECT";
}

/**
 * Quiz Interface
 * Represents a course quiz
 */
export interface Quiz {
    _id: string;
    title: string;
    course: string;
    type: string;
    questions: number;
    points: number;
    dueDate: string;
    availableDate: string;
    timeLimit: number;
    published: boolean;
}

/**
 * Exam Interface
 * Represents a course exam
 */
export interface Exam {
    _id: string;
    title: string;
    course: string;
    type: string;
    questions: number;
    points: number;
    dueDate: string;
    availableDate: string;
    timeLimit: number;
    published: boolean;
}

/**
 * Project Interface
 * Represents a course project
 */
export interface Project {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    availableUntilDate: string;
    group: boolean;
    maxGroupSize: number;
}

/**
 * User Interface
 * Represents a user in the system
 */
export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: "STUDENT" | "FACULTY" | "TA";
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

/**
 * Enrollment Interface
 * Represents a user's enrollment in a course
 */
export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

/**
 * Grade Interface
 * Represents a student's grade for an assignment
 */
export interface Grade {
    _id: string;
    student: string;
    assignment: string;
    course: string;
    grade: number | null;
    maxPoints: number;
    submittedDate: string | null;
    status: "Submitted" | "Not Submitted" | "Completed";
}

/**
 * Calendar Item Union Type
 * Represents any item that can appear on the calendar
 */
export type CalendarItem = {
    _id: string;
    title: string;
    course: string;
    dueDate: string;
    availableDate?: string;
    points: number;
    type: "Assignment" | "Quiz" | "Exam" | "Project";
    questions?: number;
    timeLimit?: number;
};

/**
 * View Mode Type
 * Represents the different calendar view modes
 */
export type ViewMode = "month" | "week" | "list";

/**
 * Filter State Interface
 * Represents the state of calendar filters
 */
export interface FilterState {
    searchTerm: string;
    selectedCourses: string[];
    selectedTypes: string[];
}

/**
 * Type Guards
 * Functions to check if an object is of a specific type
 */
export function isAssignment(item: any): item is Assignment {
    return item.assignmentType !== undefined;
}

export function isQuiz(item: any): item is Quiz {
    return item.timeLimit !== undefined && item.questions !== undefined && !item.group;
}

export function isExam(item: any): item is Exam {
    return item.type === "Comprehensive" || item.type === "Multiple Choice";
}

export function isProject(item: any): item is Project {
    return item.group !== undefined && item.maxGroupSize !== undefined;
}

/**
 * Utility Functions
 * Helper functions for working with database types
 */

/**
 * Format date to ISO string with time
 */
export function formatDateWithTime(date: Date): string {
    return date.toISOString();
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string): Date {
    return new Date(dateString);
}

/**
 * Get user's full name
 */
export function getUserFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
}

/**
 * Check if user is a student
 */
export function isStudent(user: User): boolean {
    return user.role === "STUDENT";
}

/**
 * Check if user is faculty
 */
export function isFaculty(user: User): boolean {
    return user.role === "FACULTY";
}

/**
 * Check if user is a TA
 */
export function isTA(user: User): boolean {
    return user.role === "TA";
}

/**
 * Calculate grade percentage
 */
export function calculateGradePercentage(grade: Grade): number {
    if (grade.grade === null || grade.maxPoints === 0) {
        return 0;
    }
    return (grade.grade / grade.maxPoints) * 100;
}

/**
 * Get letter grade from percentage
 */
export function getLetterGrade(percentage: number): string {
    if (percentage >= 93) return "A";
    if (percentage >= 90) return "A-";
    if (percentage >= 87) return "B+";
    if (percentage >= 83) return "B";
    if (percentage >= 80) return "B-";
    if (percentage >= 77) return "C+";
    if (percentage >= 73) return "C";
    if (percentage >= 70) return "C-";
    if (percentage >= 67) return "D+";
    if (percentage >= 63) return "D";
    if (percentage >= 60) return "D-";
    return "F";
}

/**
 * Sort calendar items by due date
 */
export function sortByDueDate(items: CalendarItem[]): CalendarItem[] {
    return [...items].sort((a, b) =>
        parseDate(a.dueDate).getTime() - parseDate(b.dueDate).getTime()
    );
}

/**
 * Group items by date
 */
export function groupByDate(items: CalendarItem[]): Map<string, CalendarItem[]> {
    const grouped = new Map<string, CalendarItem[]>();

    items.forEach(item => {
        const dateKey = parseDate(item.dueDate).toDateString();
        const existing = grouped.get(dateKey) || [];
        grouped.set(dateKey, [...existing, item]);
    });

    return grouped;
}

/**
 * Filter items by course
 */
export function filterByCourse(items: CalendarItem[], courseIds: string[]): CalendarItem[] {
    if (courseIds.length === 0) return items;
    return items.filter(item => courseIds.includes(item.course));
}

/**
 * Filter items by type
 */
export function filterByType(items: CalendarItem[], types: string[]): CalendarItem[] {
    if (types.length === 0) return items;
    return items.filter(item => types.includes(item.type));
}

/**
 * Search items by title
 */
export function searchItems(items: CalendarItem[], searchTerm: string): CalendarItem[] {
    if (!searchTerm) return items;
    const lowerSearch = searchTerm.toLowerCase();
    return items.filter(item =>
        item.title.toLowerCase().includes(lowerSearch)
    );
}
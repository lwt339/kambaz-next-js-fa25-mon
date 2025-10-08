/* Course Interface */
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

/* Module Interface */
export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: Lesson[];
}

/* Lesson Interface */
export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
}

/* Assignment Interface */
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

/* Quiz Interface */
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

/* Exam Interface */
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

/* Project */
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

/* User Interface */
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

/* Enrollment Interface */
export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

/* Grade Interface */
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

/* Calendar Item */
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

/* Date object */
export function parseDate(dateString: string): Date {
    return new Date(dateString);
}
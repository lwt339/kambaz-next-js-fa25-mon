// File: app/(Kambaz)/Database/type.ts
// All TypeScript interfaces for our database objects

// Represents a single course
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

// Represents a module containing lessons
export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: Lesson[];
}

// Represents a lesson inside a module
export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
}

// Represents an assignment or project
export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    assignmentType: "ASSIGNMENT" | "PROJECTS";
    editing?: boolean;
}

// Represents a quiz
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

// Represents an exam
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

// Represents a user in the system
export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: "STUDENT" | "FACULTY" | "TA" | "ADMIN";
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

// Represents a user enrolled in a course
export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

// Represents a grade on an assignment, quiz, or exam
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

// Represents how much each category is worth
export interface GradingWeights {
    course: string;
    weights: {
        ASSIGNMENTS: number;
        QUIZZES: number;
        EXAMS: number;
        PROJECTS: number;
    };
}

// Unified type for calendar display
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
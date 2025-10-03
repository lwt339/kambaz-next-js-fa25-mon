import React from 'react';
import {
    CalendarItem,
    DbAssignment,
    DbQuiz,
    DbExam,
    DbProject,
    Course
} from '../types/calendar.types';
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaRegFileAlt, FaProjectDiagram } from "react-icons/fa";

/**
 * Combine all calendar items with their types
 * Transforms database items into a unified CalendarItem format
 * Maps each database type to the common CalendarItem interface
 * @param assignments - Array of assignment records from database
 * @param quizzes - Array of quiz records from database
 * @param exams - Array of exam records from database
 * @param projects - Array of project records from database
 * @returns Combined array of all calendar items in unified format
 */
export function combineAllItems(
    assignments: DbAssignment[],
    quizzes: DbQuiz[],
    exams: DbExam[],
    projects: DbProject[]
): CalendarItem[] {
    const items: CalendarItem[] = [];

    // Map assignments to calendar items
    // Convert assignment database structure to unified calendar format
    assignments.forEach(assignment => {
        items.push({
            _id: assignment._id,
            title: assignment.title,
            course: assignment.course,
            dueDate: assignment.dueDate,
            availableDate: assignment.availableDate,
            points: assignment.points,
            type: "Assignment"
        });
    });

    // Map quizzes to calendar items
    // Include quiz-specific fields like questions and timeLimit
    quizzes.forEach(quiz => {
        items.push({
            _id: quiz._id,
            title: quiz.title,
            course: quiz.course,
            dueDate: quiz.dueDate,
            availableDate: quiz.availableDate,
            points: quiz.points,
            type: "Quiz",
            questions: quiz.questions,
            timeLimit: quiz.timeLimit
        });
    });

    // Map exams to calendar items
    // Similar to quizzes but identified as separate type
    exams.forEach(exam => {
        items.push({
            _id: exam._id,
            title: exam.title,
            course: exam.course,
            dueDate: exam.dueDate,
            availableDate: exam.availableDate,
            points: exam.points,
            type: "Exam",
            questions: exam.questions,
            timeLimit: exam.timeLimit
        });
    });

    // Map projects to calendar items
    // Projects have group settings but we only need basic info for calendar
    projects.forEach(project => {
        items.push({
            _id: project._id,
            title: project.title,
            course: project.course,
            dueDate: project.dueDate,
            availableDate: project.availableDate,
            points: project.points,
            type: "Project"
        });
    });

    return items;
}

/**
 * Filter items based on search, selected courses, and types
 * Applies all active filters to the item list
 * @param items - Array of all calendar items
 * @param searchTerm - Text to search for in item titles
 * @param selectedCourses - Array of selected course IDs to filter by
 * @param selectedTypes - Array of selected item types to filter by
 * @returns Filtered array of calendar items matching all criteria
 */
export function filterItems(
    items: CalendarItem[],
    searchTerm: string,
    selectedCourses: string[],
    selectedTypes: string[]
): CalendarItem[] {
    return items.filter(item => {
        // Search filter - check if title contains search term (case-insensitive)
        const matchesSearch = searchTerm === '' ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Course filter - include if no courses selected or item's course is selected
        const matchesCourse = selectedCourses.length === 0 ||
            selectedCourses.includes(item.course);

        // Type filter - include if no types selected or item's type is selected
        const matchesType = selectedTypes.length === 0 ||
            selectedTypes.includes(item.type);

        // Item must match all active filters
        return matchesSearch && matchesCourse && matchesType;
    });
}

/**
 * Get items for a specific date
 * Returns all calendar items that are due on the given date
 * @param items - Array of calendar items to search
 * @param date - Target date to find items for
 * @returns Array of items due on the specified date
 */
export function getItemsForDate(items: CalendarItem[], date: Date): CalendarItem[] {
    return items.filter(item => {
        const itemDate = new Date(item.dueDate);
        // Compare dates ignoring time component
        return itemDate.toDateString() === date.toDateString();
    });
}

/**
 * Get course color
 * Retrieves the assigned color for a course
 * @param courseId - ID of the course
 * @param courses - Array of course records
 * @returns Hex color code for the course or default gray
 */
export function getCourseColor(courseId: string, courses: Course[]): string {
    const course = courses.find(c => c._id === courseId);
    return course?.color || "#6c757d"; // Default to gray if course not found
}

/**
 * Get course name
 * Retrieves the course number/name for display
 * @param courseId - ID of the course
 * @param courses - Array of course records
 * @returns Course number (e.g., "CS5610") or ID if not found
 */
export function getCourseName(courseId: string, courses: Course[]): string {
    const course = courses.find(c => c._id === courseId);
    return course?.number || courseId; // Fallback to ID if course not found
}

/**
 * Get icon for item type
 * Returns the appropriate React icon component for each item type
 * @param type - Type of calendar item
 * @returns React element with the appropriate icon
 */
export function getTypeIcon(type: string): React.ReactElement | null {
    switch(type) {
        case "Assignment":
            return React.createElement(MdAssignment, { className: "me-1" });
        case "Quiz":
            return React.createElement(GrNotes, { className: "me-1" });
        case "Exam":
            return React.createElement(FaRegFileAlt, { className: "me-1" });
        case "Project":
            return React.createElement(FaProjectDiagram, { className: "me-1" });
        default:
            return null;
    }
}

/**
 * Sort items by due date
 * Sorts calendar items in chronological order
 * @param items - Array of calendar items to sort
 * @returns New sorted array (does not mutate original)
 */
export function sortItemsByDueDate(items: CalendarItem[]): CalendarItem[] {
    return [...items].sort((a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
}

/**
 * Group items by date
 * Organizes items into a map grouped by their due date
 * @param items - Array of calendar items to group
 * @returns Map with date strings as keys and item arrays as values
 */
export function groupItemsByDate(items: CalendarItem[]): Map<string, CalendarItem[]> {
    const grouped = new Map<string, CalendarItem[]>();

    items.forEach(item => {
        const dateKey = new Date(item.dueDate).toDateString();
        const existing = grouped.get(dateKey) || [];
        grouped.set(dateKey, [...existing, item]);
    });

    return grouped;
}

/**
 * Get upcoming items
 * Returns items due within the specified number of days
 * @param items - Array of all calendar items
 * @param daysAhead - Number of days to look ahead (default 7)
 * @returns Array of items due within the specified timeframe
 */
export function getUpcomingItems(items: CalendarItem[], daysAhead: number = 7): CalendarItem[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + daysAhead);
    futureDate.setHours(23, 59, 59, 999); // End of future date

    return items.filter(item => {
        const itemDate = new Date(item.dueDate);
        return itemDate >= today && itemDate <= futureDate;
    });
}

/**
 * Get overdue items
 * Returns items that are past their due date
 * @param items - Array of all calendar items
 * @returns Array of overdue items
 */
export function getOverdueItems(items: CalendarItem[]): CalendarItem[] {
    const now = new Date();

    return items.filter(item => {
        const dueDate = new Date(item.dueDate);
        return dueDate < now;
    });
}

/**
 * Calculate total points for items
 * Sums up the points for a collection of items
 * @param items - Array of calendar items
 * @returns Total points value
 */
export function calculateTotalPoints(items: CalendarItem[]): number {
    return items.reduce((total, item) => total + item.points, 0);
}

/**
 * Get items by type
 * Filters items to only include specified type
 * @param items - Array of all calendar items
 * @param type - Type to filter for
 * @returns Array of items matching the specified type
 */
export function getItemsByType(
    items: CalendarItem[],
    type: "Assignment" | "Quiz" | "Exam" | "Project"
): CalendarItem[] {
    return items.filter(item => item.type === type);
}

/**
 * Get items for course
 * Filters items to only include those from a specific course
 * @param items - Array of all calendar items
 * @param courseId - Course ID to filter for
 * @returns Array of items for the specified course
 */
export function getItemsForCourse(items: CalendarItem[], courseId: string): CalendarItem[] {
    return items.filter(item => item.course === courseId);
}
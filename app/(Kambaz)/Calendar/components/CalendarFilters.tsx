"use client";

import React from 'react';
import { Badge } from "react-bootstrap";
import { IoFilter } from "react-icons/io5";
import { CalendarFiltersProps } from '../types/calendar.types';

/**
 * CalendarFilters Component
 * Renders interactive filter badges for courses and item types
 * Each badge can be clicked to toggle its selection state
 *
 * @component
 * @param props - Component properties
 * @param props.courses - Array of available courses with colors
 * @param props.selectedCourses - Array of currently selected course IDs
 * @param props.selectedTypes - Array of currently selected item types
 * @param props.onToggleCourse - Handler for toggling course selection
 * @param props.onToggleType - Handler for toggling type selection
 * @returns Filter section with course and type badges
 */
export default function CalendarFilters({
                                            courses,
                                            selectedCourses,
                                            selectedTypes,
                                            onToggleCourse,
                                            onToggleType
                                        }: CalendarFiltersProps) {
    /**
     * Available item types that can be filtered
     * These correspond to the different calendar item categories
     */
    const itemTypes = ["Assignment", "Quiz", "Exam", "Project"];

    /**
     * Check if a course is currently selected
     * Used to determine the visual state of course badges
     */
    const isCourseSelected = (courseId: string): boolean => {
        return selectedCourses.includes(courseId);
    };

    /**
     * Check if an item type is currently selected
     * Used to determine the visual state of type badges
     */
    const isTypeSelected = (type: string): boolean => {
        return selectedTypes.includes(type);
    };

    return (
        <div className="calendar-filters">
            {/* Course Filters Section */}
            <div className="filter-section">
                <div className="filter-label">
                    <IoFilter className="me-1" />
                    Courses:
                </div>
                <div className="filter-options">
                    {courses.map(course => {
                        const isSelected = isCourseSelected(course._id);
                        return (
                            <Badge
                                key={course._id}
                                bg={isSelected ? "" : "light"}
                                text={isSelected ? "white" : "dark"}
                                className="filter-badge"
                                style={{
                                    // Use course color when selected, default style when not
                                    backgroundColor: isSelected ? course.color : undefined,
                                    cursor: 'pointer'
                                }}
                                onClick={() => onToggleCourse(course._id)}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                                aria-label={`Filter by ${course.number} course`}
                            >
                                {course.number}
                            </Badge>
                        );
                    })}
                </div>
            </div>

            {/* Item Type Filters Section */}
            <div className="filter-section">
                <div className="filter-label">Type:</div>
                <div className="filter-options">
                    {itemTypes.map(type => {
                        const isSelected = isTypeSelected(type);
                        return (
                            <Badge
                                key={type}
                                bg={isSelected ? "danger" : "light"}
                                text={isSelected ? "white" : "dark"}
                                className="filter-badge"
                                style={{ cursor: 'pointer' }}
                                onClick={() => onToggleType(type)}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                                aria-label={`Filter by ${type} items`}
                            >
                                {type}
                            </Badge>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
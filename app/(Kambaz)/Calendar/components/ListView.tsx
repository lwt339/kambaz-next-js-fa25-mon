"use client";

import React from 'react';
import { Card, Badge } from "react-bootstrap";
import { ListViewProps } from '../types/calendar.types';
import {
    formatDate,
    formatTime
} from '../utils/calendarHelpers';
import {
    sortItemsByDueDate,
    getCourseColor,
    getCourseName,
    getTypeIcon
} from '../utils/dataProcessing';

/**
 * ListView Component
 * Renders calendar items as a scrollable list grouped by date
 * Each item displays as a detailed card with all relevant information
 *
 * @component
 * @param props - Component properties
 * @param props.filteredItems - Array of calendar items to display
 * @param props.courses - Array of courses for color/name lookup
 * @returns Chronologically sorted list of calendar items grouped by date
 */
export default function ListView({
                                     filteredItems,
                                     courses
                                 }: ListViewProps) {
    /**
     * Sort items chronologically by due date
     * Ensures consistent ordering with earliest items first
     */
    const sortedItems = sortItemsByDueDate(filteredItems);

    /**
     * Group items by date for organized display
     * Creates sections with date headers and related items
     */
    const groupItemsByDate = () => {
        const grouped: { [key: string]: typeof sortedItems } = {};

        sortedItems.forEach(item => {
            // Format date as the group key (e.g., "Oct 15, 2025")
            const dateKey = formatDate(item.dueDate);

            // Initialize array if this is the first item for this date
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }

            // Add item to the appropriate date group
            grouped[dateKey].push(item);
        });

        return grouped;
    };

    /**
     * Get the grouped items organized by date
     */
    const groupedItems = groupItemsByDate();

    /**
     * Handle empty state when no items match filters
     */
    if (sortedItems.length === 0) {
        return (
            <div className="calendar-list-view">
                <div className="text-center py-5 text-muted">
                    <p className="mb-0">No calendar items found.</p>
                    <small>Try adjusting your filters or search criteria.</small>
                </div>
            </div>
        );
    }

    return (
        <div className="calendar-list-view">
            {/* Iterate through each date group */}
            {Object.entries(groupedItems).map(([date, items]) => (
                <div key={date} className="calendar-list-group">
                    {/* Date header for the group - sticky positioned for scrolling */}
                    <h5 className="calendar-list-date">{date}</h5>

                    {/* Render each item in this date group */}
                    {items.map(item => {
                        // Get course-specific information for styling
                        const courseColor = getCourseColor(item.course, courses);
                        const courseName = getCourseName(item.course, courses);

                        return (
                            <Card key={item._id} className="calendar-list-item mb-2">
                                <Card.Body className="d-flex align-items-start">
                                    {/* Colored indicator bar for quick course identification */}
                                    <div
                                        className="calendar-list-indicator"
                                        style={{ backgroundColor: courseColor }}
                                        aria-hidden="true"
                                    />

                                    {/* Main content area with item details */}
                                    <div className="flex-grow-1">
                                        {/* Title row with type icon and badge */}
                                        <div className="d-flex align-items-center mb-2">
                                            {/* Icon indicating the type of item */}
                                            {getTypeIcon(item.type)}

                                            {/* Item title with bold formatting */}
                                            <span className="fw-bold">{item.title}</span>

                                            {/* Type badge for additional clarity */}
                                            <Badge
                                                bg="light"
                                                text="dark"
                                                className="ms-2"
                                            >
                                                {item.type}
                                            </Badge>
                                        </div>

                                        {/* Detailed information section */}
                                        <div className="text-muted small">
                                            {/* Course information */}
                                            <div>
                                                <strong>Course:</strong> {courseName}
                                            </div>

                                            {/* Due date and time */}
                                            <div>
                                                <strong>Due:</strong> {formatDate(item.dueDate)} at {formatTime(item.dueDate)}
                                            </div>

                                            {/* Point value */}
                                            <div>
                                                <strong>Points:</strong> {item.points}
                                            </div>

                                            {/* Conditional: Show questions count for quizzes/exams */}
                                            {item.questions && (
                                                <div>
                                                    <strong>Questions:</strong> {item.questions}
                                                </div>
                                            )}

                                            {/* Conditional: Show time limit for timed assessments */}
                                            {item.timeLimit && (
                                                <div>
                                                    <strong>Time Limit:</strong> {item.timeLimit} minutes
                                                </div>
                                            )}

                                            {/* Available date if different from due date */}
                                            {item.availableDate && (
                                                <div>
                                                    <strong>Available:</strong> {formatDate(item.availableDate)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
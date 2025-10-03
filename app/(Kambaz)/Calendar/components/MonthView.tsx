"use client";

import React from 'react';
import { MonthViewProps, CalendarItem } from '../types/calendar.types';
import {
    generateMonthDays,
    isSameDay,
    isInCurrentMonth
} from '../utils/calendarHelpers';
import {
    getItemsForDate,
    getCourseColor,
    getCourseName,
    getTypeIcon
} from '../utils/dataProcessing';

/**
 * MonthView Component
 * Renders a traditional calendar grid showing one month with items
 * Each day cell displays up to 3 items with an overflow indicator
 *
 * @component
 * @param props - Component properties
 * @param props.selectedDate - Date determining which month to display
 * @param props.currentDate - Today's date for highlighting
 * @param props.filteredItems - Array of calendar items to display
 * @param props.courses - Array of courses for color/name lookup
 * @returns Month calendar grid with items displayed on their due dates
 */
export default function MonthView({
                                      selectedDate,
                                      currentDate,
                                      filteredItems,
                                      courses
                                  }: MonthViewProps) {
    /**
     * Week day headers for the calendar grid
     * Standard Sunday-Saturday week format
     */
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    /**
     * Generate the 42-day grid for the month view
     * Includes days from previous/next months for complete weeks
     */
    const monthDays = generateMonthDays(selectedDate);

    /**
     * Render a single calendar day cell
     * Displays the day number and up to 3 items with styling
     *
     * @param day - Date object for this cell
     * @param index - Unique key for React rendering
     * @returns JSX for a single day cell
     */
    const renderDayCell = (day: Date, index: number) => {
        // Get all items due on this day
        const items = getItemsForDate(filteredItems, day);

        // Check if this day is today for special highlighting
        const isToday = isSameDay(day, currentDate);

        // Check if this day belongs to the currently displayed month
        const isCurrentMonth = isInCurrentMonth(day, selectedDate);

        /**
         * Determine CSS classes for the day cell
         * Apply different styles for:
         * - Days outside the current month (grayed out)
         * - Today's date (highlighted with yellow background)
         */
        const dayClasses = [
            'calendar-day',
            !isCurrentMonth ? 'other-month' : '',
            isToday ? 'today' : ''
        ].filter(Boolean).join(' ');

        return (
            <div key={index} className={dayClasses}>
                {/* Day number display */}
                <div className="calendar-day-number">
                    {day.getDate()}
                </div>

                {/* Container for calendar items */}
                <div className="calendar-day-items">
                    {/* Show up to 3 items to prevent overflow */}
                    {items.slice(0, 3).map(item => (
                        <div
                            key={item._id}
                            className="calendar-day-item"
                            style={{
                                // Use course color for item background
                                backgroundColor: getCourseColor(item.course, courses),
                                // Add colored left border for visual emphasis
                                borderLeft: `3px solid ${getCourseColor(item.course, courses)}`
                            }}
                            title={`${item.title} - ${getCourseName(item.course, courses)}`}
                        >
                            {/* Type icon for quick identification */}
                            {getTypeIcon(item.type)}
                            {/* Item title with ellipsis for overflow */}
                            <span className="calendar-item-title">
                                {item.title}
                            </span>
                        </div>
                    ))}

                    {/* Show count of additional items if more than 3 */}
                    {items.length > 3 && (
                        <div className="calendar-day-more">
                            +{items.length - 3} more
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="calendar-month-view">
            {/* Week day headers */}
            <div className="calendar-weekdays">
                {weekDays.map(day => (
                    <div key={day} className="calendar-weekday">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid with 42 day cells (6 weeks) */}
            <div className="calendar-days">
                {monthDays.map((day, index) => renderDayCell(day, index))}
            </div>
        </div>
    );
}
"use client";

import React from 'react';
import { Button } from "react-bootstrap";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CalendarNavigationProps } from '../types/calendar.types';
import { getViewTitle } from '../utils/calendarHelpers';

/**
 * CalendarNavigation Component
 * Renders navigation controls for moving through calendar dates
 * Only displayed in month and week views, not in list view
 *
 * @component
 * @param props - Component properties
 * @param props.selectedDate - Currently selected date for the calendar
 * @param props.viewMode - Current calendar view mode
 * @param props.onNavigatePrevious - Handler for navigating to previous period
 * @param props.onNavigateNext - Handler for navigating to next period
 * @param props.onGoToToday - Handler for jumping to today's date
 * @returns Navigation controls with previous/next buttons and current period display
 */
export default function CalendarNavigation({
                                               selectedDate,
                                               viewMode,
                                               onNavigatePrevious,
                                               onNavigateNext,
                                               onGoToToday
                                           }: CalendarNavigationProps) {
    /**
     * Get the title for the current view period
     * This shows "November 2025" for month view or "Week of Oct 15" for week view
     */
    const currentTitle = getViewTitle(viewMode, selectedDate);

    /**
     * Don't render navigation for list view
     * List view shows all items and doesn't need date navigation
     */
    if (viewMode === "list") {
        return null;
    }

    return (
        <div className="calendar-navigation">
            {/* Previous Period Button */}
            <Button
                variant="outline-secondary"
                size="sm"
                onClick={onNavigatePrevious}
                aria-label={viewMode === "month" ? "Previous month" : "Previous week"}
            >
                <IoChevronBack />
            </Button>

            {/* Current Period Display */}
            <h4 className="calendar-title mb-0" aria-live="polite">
                {currentTitle}
            </h4>

            {/* Next Period Button */}
            <Button
                variant="outline-secondary"
                size="sm"
                onClick={onNavigateNext}
                aria-label={viewMode === "month" ? "Next month" : "Next week"}
            >
                <IoChevronForward />
            </Button>

            {/* Today Button - Jump to current date */}
            <Button
                variant="danger"
                size="sm"
                onClick={onGoToToday}
                aria-label="Go to today"
            >
                Today
            </Button>
        </div>
    );
}
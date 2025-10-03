"use client";

import React from 'react';
import { IoCalendarOutline } from "react-icons/io5";
import { CalendarHeaderProps } from '../types/calendar.types';

/**
 * CalendarHeader Component
 * Renders the calendar title section with consistent styling
 * Uses Bootstrap classes for responsive design
 *
 * @component
 * @returns Calendar header with icon and title
 */
export default function CalendarHeader(props: CalendarHeaderProps) {
    return (
        <div className="calendar-header">
            <div className="d-flex align-items-center">
                {/* Calendar icon with Kambaz brand color (danger/red) */}
                <IoCalendarOutline className="fs-3 me-3 text-danger" />
                {/* Main title for the calendar section */}
                <h2 className="mb-0">Calendar</h2>
            </div>
        </div>
    );
}
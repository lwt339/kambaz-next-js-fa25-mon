"use client";

import React from 'react';
import { Form, InputGroup, Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { CalendarControlsProps, ViewMode } from '../types/calendar.types';

/**
 * CalendarControls Component
 * Renders search functionality and view mode switching controls
 *
 * @component
 * @param props - Component properties
 * @param props.searchTerm - Current search filter text
 * @param props.viewMode - Currently active view mode
 * @param props.onSearchChange - Handler for search input changes
 * @param props.onViewModeChange - Handler for view mode changes
 * @returns Search bar and view mode toggle buttons
 */
export default function CalendarControls({
                                             searchTerm,
                                             viewMode,
                                             onSearchChange,
                                             onViewModeChange
                                         }: CalendarControlsProps) {
    /**
     * Handle search input changes
     * Updates the parent component's search state in real-time
     * This provides immediate filtering feedback as the user types
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    /**
     * Handle view mode button clicks
     * Changes the calendar display between month and list views
     */
    const handleViewModeClick = (mode: ViewMode) => {
        onViewModeChange(mode);
    };

    return (
        <div className="calendar-controls">
            {/* Search Input Section */}
            <InputGroup className="calendar-search">
                <InputGroup.Text>
                    <IoSearch />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Search calendar items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search calendar items"
                />
            </InputGroup>

            {/* View Mode Toggle Buttons */}
            <div className="calendar-view-buttons">
                <Button
                    variant={viewMode === "month" ? "danger" : "outline-secondary"}
                    onClick={() => handleViewModeClick("month")}
                    size="sm"
                    aria-pressed={viewMode === "month"}
                >
                    Month
                </Button>
                <Button
                    variant={viewMode === "list" ? "danger" : "outline-secondary"}
                    onClick={() => handleViewModeClick("list")}
                    size="sm"
                    aria-pressed={viewMode === "list"}
                >
                    List
                </Button>
            </div>
        </div>
    );
}
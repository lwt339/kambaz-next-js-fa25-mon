"use client";

import React, { useState, useMemo } from "react";

// Import all separated components
import CalendarHeader from "./components/CalendarHeader";
import CalendarControls from "./components/CalendarControls";
import CalendarFilters from "./components/CalendarFilters";
import CalendarNavigation from "./components/CalendarNavigation";
import MonthView from "./components/MonthView";
import ListView from "./components/ListView";

// Import types
import {
    ViewMode,
    Course,
    DbAssignment,
    DbQuiz,
    DbExam,
    DbProject,
    CalendarItem
} from "./types/calendar.types";

// Import utility functions
import {
    navigateToPrevious,
    navigateToNext
} from "./utils/calendarHelpers";
import {
    combineAllItems,
    filterItems
} from "./utils/dataProcessing";

// Import database
import * as db from "../Database";

// Import existing styles - no changes needed
import "./calendar.css";

/**
 * Calendar Component
 * Main component that manages state and coordinates all calendar functionality
 * This component serves as the central hub for:
 * - Managing calendar state (date, view mode, filters)
 * - Loading and processing data from the database
 * - Coordinating child components
 * - Handling user interactions
 *
 * @component
 * @returns Complete calendar application with all views and controls
 */
export default function Calendar() {
    // ==================== State Management ====================
    /**
     * Current date reference
     * Used for highlighting today and as default selected date
     */
    const currentDate = new Date();

    /**
     * Selected date state
     * Determines which month to display in month view
     * Used for navigation between periods
     */
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

    /**
     * View mode state
     * Controls whether calendar shows month grid or list view
     * Default to month view for traditional calendar experience
     */
    const [viewMode, setViewMode] = useState<ViewMode>("month");

    /**
     * Search filter state
     * Text input for filtering calendar items by title
     * Updates in real-time as user types
     */
    const [searchTerm, setSearchTerm] = useState<string>("");

    /**
     * Selected courses filter state
     * Array of course IDs to show in calendar
     * Empty array means show all courses
     */
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    /**
     * Selected types filter state
     * Array of item types (Assignment, Quiz, Exam, Project) to show
     * Empty array means show all types
     */
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // ==================== Data Processing ====================
    /**
     * Type cast database imports to proper interfaces
     * This ensures TypeScript knows the structure of our data
     */
    const courses = db.courses as Course[];
    const assignments = db.assignments as DbAssignment[];
    const quizzes = db.quizzes as DbQuiz[];
    const exams = db.exams as DbExam[];
    const projects = db.projects as DbProject[];

    /**
     * Combine all calendar items into unified format
     * Memoized to prevent recalculation on every render
     * Only recalculates when source data changes
     */
    const allItems: CalendarItem[] = useMemo(() => {
        return combineAllItems(assignments, quizzes, exams, projects);
    }, [assignments, quizzes, exams, projects]);

    /**
     * Apply filters to calendar items
     * Memoized to prevent refiltering on every render
     * Recalculates when items or filters change
     */
    const filteredItems = useMemo(() => {
        return filterItems(allItems, searchTerm, selectedCourses, selectedTypes);
    }, [allItems, searchTerm, selectedCourses, selectedTypes]);

    // ==================== Event Handlers ====================
    /**
     * Handle navigation to previous period
     * Updates selected date based on current view mode
     */
    const handleNavigatePrevious = () => {
        const newDate = navigateToPrevious(selectedDate, viewMode);
        setSelectedDate(newDate);
    };

    /**
     * Handle navigation to next period
     * Updates selected date based on current view mode
     */
    const handleNavigateNext = () => {
        const newDate = navigateToNext(selectedDate, viewMode);
        setSelectedDate(newDate);
    };

    /**
     * Handle "Today" button click
     * Resets selected date to current date
     */
    const handleGoToToday = () => {
        setSelectedDate(new Date());
    };

    /**
     * Handle search input changes
     * Updates search filter in real-time
     */
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    /**
     * Handle view mode changes
     * Switches between month and list views
     */
    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
    };

    /**
     * Toggle course selection
     * Adds or removes course from filter
     */
    const handleToggleCourse = (courseId: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    /**
     * Toggle type selection
     * Adds or removes item type from filter
     */
    const handleToggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    // ==================== Render ====================
    /**
     * Render the appropriate view based on current view mode
     * This function determines which view component to display
     */
    const renderCalendarView = () => {
        switch (viewMode) {
            case "month":
                return (
                    <MonthView
                        selectedDate={selectedDate}
                        currentDate={currentDate}
                        filteredItems={filteredItems}
                        courses={courses}
                    />
                );
            case "list":
                return (
                    <ListView
                        filteredItems={filteredItems}
                        courses={courses}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div id="wd-calendar" className="calendar-container">
            {/* Calendar Header Section */}
            <CalendarHeader />

            {/* Search and View Controls Section */}
            <CalendarControls
                searchTerm={searchTerm}
                viewMode={viewMode}
                onSearchChange={handleSearchChange}
                onViewModeChange={handleViewModeChange}
            />

            {/* Filter Options Section */}
            <CalendarFilters
                courses={courses}
                selectedCourses={selectedCourses}
                selectedTypes={selectedTypes}
                onToggleCourse={handleToggleCourse}
                onToggleType={handleToggleType}
            />

            {/* Navigation Controls Section */}
            {/* Only shown for month/week views, hidden for list view */}
            {viewMode !== "list" && (
                <CalendarNavigation
                    selectedDate={selectedDate}
                    viewMode={viewMode}
                    onNavigatePrevious={handleNavigatePrevious}
                    onNavigateNext={handleNavigateNext}
                    onGoToToday={handleGoToToday}
                />
            )}

            {/* Main Calendar Content Area */}
            <div className="calendar-content">
                {renderCalendarView()}
            </div>
        </div>
    );
}
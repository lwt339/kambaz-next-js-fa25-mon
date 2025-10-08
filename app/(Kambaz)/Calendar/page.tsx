/**
 * Calendar Component
 * Advanced calendar system that displays all assignments, quizzes, exams, and projects
 * Provides multiple views: Month, Week, and List
 * Includes filtering, searching, and color-coded course items
 *
 * File: app/(Kambaz)/Calendar/page.tsx
 */

"use client";

import { useState, useMemo } from "react";
import { Form, InputGroup, Button, Badge, Card } from "react-bootstrap";
import {
    IoCalendarOutline,
    IoSearch,
    IoFilter,
    IoChevronBack,
    IoChevronForward
} from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaRegFileAlt, FaProjectDiagram } from "react-icons/fa";
import * as db from "../Database";
import "./calendar.css";

/**
 * Course Interface
 * Represents a course in the system
 */
interface Course {
    _id: string;
    name: string;
    number: string;
    color: string;
}

/**
 * Database Assignment Interface
 * Matches the structure in assignments.json
 */
interface DbAssignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
    assignmentType: "ASSIGNMENT" | "PROJECT";
}

/**
 * Database Quiz Interface
 * Matches the structure in quizzes.json
 */
interface DbQuiz {
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

/**
 * Database Exam Interface
 * Matches the structure in exams.json
 */
interface DbExam {
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

/**
 * Database Project Interface
 * Matches the structure in projects.json
 */
interface DbProject {
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

/**
 * Calendar Item Interface
 * Unified format for displaying items in the calendar
 */
interface CalendarItem {
    _id: string;
    title: string;
    course: string;
    dueDate: string;
    availableDate?: string;
    points: number;
    type: "Assignment" | "Quiz" | "Exam" | "Project";
    questions?: number;
    timeLimit?: number;
}

/**
 * View Mode Type
 * Defines the available calendar view modes
 */
type ViewMode = "month" | "week" | "list";

/**
 * Calendar Component
 * Main component function - all interfaces above are now accessible here
 */
export default function Calendar() {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
    const [viewMode, setViewMode] = useState<ViewMode>("month");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    /**
     * Type the database imports with the correct database interfaces
     * Cast the imported JSON data to our defined interfaces
     */
    const courses = db.courses as Course[];
    const assignments = db.assignments as DbAssignment[];
    const quizzes = db.quizzes as DbQuiz[];
    const exams = db.exams as DbExam[];
    const projects = db.projects as DbProject[];

    /**
     * Combine all calendar items with their types
     * Map each database type to the unified CalendarItem format
     */
    const allItems: CalendarItem[] = useMemo(() => {
        return [
            ...assignments.map((a): CalendarItem => ({
                _id: a._id,
                title: a.title,
                course: a.course,
                dueDate: a.dueDate,
                availableDate: a.availableDate,
                points: a.points,
                type: "Assignment"
            })),
            ...quizzes.map((q): CalendarItem => ({
                _id: q._id,
                title: q.title,
                course: q.course,
                dueDate: q.dueDate,
                availableDate: q.availableDate,
                points: q.points,
                type: "Quiz",
                questions: q.questions,
                timeLimit: q.timeLimit
            })),
            ...exams.map((e): CalendarItem => ({
                _id: e._id,
                title: e.title,
                course: e.course,
                dueDate: e.dueDate,
                availableDate: e.availableDate,
                points: e.points,
                type: "Exam",
                questions: e.questions,
                timeLimit: e.timeLimit
            })),
            ...projects.map((p): CalendarItem => ({
                _id: p._id,
                title: p.title,
                course: p.course,
                dueDate: p.dueDate,
                availableDate: p.availableDate,
                points: p.points,
                type: "Project"
            }))
        ];
    }, [assignments, quizzes, exams, projects]);

    /**
     * Filter items based on search, selected courses, and types
     */
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCourse = selectedCourses.length === 0 || selectedCourses.includes(item.course);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
            return matchesSearch && matchesCourse && matchesType;
        });
    }, [allItems, searchTerm, selectedCourses, selectedTypes]);

    /**
     * Get items for a specific date
     */
    const getItemsForDate = (date: Date): CalendarItem[] => {
        return filteredItems.filter(item => {
            const itemDate = new Date(item.dueDate);
            return itemDate.toDateString() === date.toDateString();
        });
    };

    /**
     * Get course color
     */
    const getCourseColor = (courseId: string): string => {
        const course = courses.find(c => c._id === courseId);
        return course?.color || "#6c757d";
    };

    /**
     * Get course name
     */
    const getCourseName = (courseId: string): string => {
        const course = courses.find(c => c._id === courseId);
        return course?.number || courseId;
    };

    /**
     * Get icon for item type
     */
    const getTypeIcon = (type: string) => {
        switch(type) {
            case "Assignment": return <MdAssignment className="me-1" />;
            case "Quiz": return <GrNotes className="me-1" />;
            case "Exam": return <FaRegFileAlt className="me-1" />;
            case "Project": return <FaProjectDiagram className="me-1" />;
            default: return null;
        }
    };

    /**
     * Format date for display
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    /**
     * Format time for display
     */
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    /**
     * Generate calendar days for month view
     * Creates a 6-week grid (42 days) starting from the first Sunday before the month begins
     */
    const generateMonthDays = (): Date[] => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1);

        // Start from the Sunday before the first day of the month
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Generate 42 days (6 weeks) for consistent calendar grid
        const days: Date[] = [];
        const current = new Date(startDate);

        while (days.length < 42) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    /**
     * Navigate to previous period
     */
    const navigatePrevious = () => {
        const newDate = new Date(selectedDate);
        if (viewMode === "month") {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (viewMode === "week") {
            newDate.setDate(newDate.getDate() - 7);
        }
        setSelectedDate(newDate);
    };

    /**
     * Navigate to next period
     */
    const navigateNext = () => {
        const newDate = new Date(selectedDate);
        if (viewMode === "month") {
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (viewMode === "week") {
            newDate.setDate(newDate.getDate() + 7);
        }
        setSelectedDate(newDate);
    };

    /**
     * Go to today
     */
    const goToToday = () => {
        setSelectedDate(new Date());
    };

    /**
     * Toggle course selection
     */
    const toggleCourse = (courseId: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    /**
     * Toggle type selection
     */
    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    /**
     * Render Month View
     */
    const renderMonthView = () => {
        const days = generateMonthDays();
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div className="calendar-month-view">
                <div className="calendar-weekdays">
                    {weekDays.map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                </div>
                <div className="calendar-days">
                    {days.map((day, index) => {
                        const items = getItemsForDate(day);
                        const isToday = day.toDateString() === currentDate.toDateString();
                        const isCurrentMonth = day.getMonth() === selectedDate.getMonth();

                        return (
                            <div
                                key={index}
                                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                            >
                                <div className="calendar-day-number">{day.getDate()}</div>
                                <div className="calendar-day-items">
                                    {items.slice(0, 3).map(item => (
                                        <div
                                            key={item._id}
                                            className="calendar-day-item"
                                            style={{
                                                backgroundColor: getCourseColor(item.course),
                                                borderLeft: `3px solid ${getCourseColor(item.course)}`
                                            }}
                                            title={`${item.title} - ${getCourseName(item.course)}`}
                                        >
                                            {getTypeIcon(item.type)}
                                            <span className="calendar-item-title">{item.title}</span>
                                        </div>
                                    ))}
                                    {items.length > 3 && (
                                        <div className="calendar-day-more">
                                            +{items.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    /**
     * Render List View
     */
    const renderListView = () => {
        const sortedItems = [...filteredItems].sort((a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

        const groupedByDate: { [key: string]: CalendarItem[] } = {};
        sortedItems.forEach(item => {
            const dateKey = formatDate(item.dueDate);
            if (!groupedByDate[dateKey]) {
                groupedByDate[dateKey] = [];
            }
            groupedByDate[dateKey].push(item);
        });

        return (
            <div className="calendar-list-view">
                {Object.entries(groupedByDate).map(([date, items]) => (
                    <div key={date} className="calendar-list-group">
                        <h5 className="calendar-list-date">{date}</h5>
                        {items.map(item => (
                            <Card key={item._id} className="calendar-list-item mb-2">
                                <Card.Body className="d-flex align-items-start">
                                    <div
                                        className="calendar-list-indicator"
                                        style={{ backgroundColor: getCourseColor(item.course) }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            {getTypeIcon(item.type)}
                                            <span className="fw-bold">{item.title}</span>
                                            <Badge
                                                bg="light"
                                                text="dark"
                                                className="ms-2"
                                            >
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <div className="text-muted small">
                                            <div>
                                                <strong>Course:</strong> {getCourseName(item.course)}
                                            </div>
                                            <div>
                                                <strong>Due:</strong> {formatDate(item.dueDate)} at {formatTime(item.dueDate)}
                                            </div>
                                            <div>
                                                <strong>Points:</strong> {item.points}
                                            </div>
                                            {item.questions && (
                                                <div>
                                                    <strong>Questions:</strong> {item.questions}
                                                </div>
                                            )}
                                            {item.timeLimit && (
                                                <div>
                                                    <strong>Time Limit:</strong> {item.timeLimit} minutes
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    /**
     * Get current view title
     */
    const getViewTitle = (): string => {
        if (viewMode === "month") {
            return selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });
        } else if (viewMode === "week") {
            return `Week of ${selectedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })}`;
        }
        return "All Items";
    };

    return (
        <div id="wd-calendar" className="calendar-container">
            {/* Header */}
            <div className="calendar-header">
                <div className="d-flex align-items-center">
                    <IoCalendarOutline className="fs-3 me-3 text-danger" />
                    <h2 className="mb-0">Calendar</h2>
                </div>
            </div>

            {/* Controls */}
            <div className="calendar-controls">
                {/* Search Bar */}
                <InputGroup className="calendar-search">
                    <InputGroup.Text>
                        <IoSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search calendar items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                {/* View Mode Buttons */}
                <div className="calendar-view-buttons">
                    <Button
                        variant={viewMode === "month" ? "danger" : "outline-secondary"}
                        onClick={() => setViewMode("month")}
                        size="sm"
                    >
                        Month
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "danger" : "outline-secondary"}
                        onClick={() => setViewMode("list")}
                        size="sm"
                    >
                        List
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="calendar-filters">
                <div className="filter-section">
                    <div className="filter-label">
                        <IoFilter className="me-1" />
                        Courses:
                    </div>
                    <div className="filter-options">
                        {courses.map(course => (
                            <Badge
                                key={course._id}
                                bg={selectedCourses.includes(course._id) ? "" : "light"}
                                text={selectedCourses.includes(course._id) ? "white" : "dark"}
                                className="filter-badge"
                                style={{
                                    backgroundColor: selectedCourses.includes(course._id) ? course.color : undefined,
                                    cursor: 'pointer'
                                }}
                                onClick={() => toggleCourse(course._id)}
                            >
                                {course.number}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="filter-section">
                    <div className="filter-label">Type:</div>
                    <div className="filter-options">
                        {["Assignment", "Quiz", "Exam", "Project"].map(type => (
                            <Badge
                                key={type}
                                bg={selectedTypes.includes(type) ? "danger" : "light"}
                                text={selectedTypes.includes(type) ? "white" : "dark"}
                                className="filter-badge"
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleType(type)}
                            >
                                {type}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            {viewMode !== "list" && (
                <div className="calendar-navigation">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={navigatePrevious}
                    >
                        <IoChevronBack />
                    </Button>
                    <h4 className="calendar-title mb-0">{getViewTitle()}</h4>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={navigateNext}
                    >
                        <IoChevronForward />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={goToToday}
                    >
                        Today
                    </Button>
                </div>
            )}

            {/* Calendar View */}
            <div className="calendar-content">
                {viewMode === "month" && renderMonthView()}
                {viewMode === "list" && renderListView()}
            </div>
        </div>
    );
}
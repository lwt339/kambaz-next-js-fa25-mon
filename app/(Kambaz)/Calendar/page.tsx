// File: app/(Kambaz)/Calendar/page.tsx
// Calendar showing all assignments, quizzes, and exams based on user enrollments

"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Form, InputGroup, Button, Badge, Card } from "react-bootstrap";
import { IoCalendarOutline, IoSearch, IoFilter, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaRegFileAlt, FaProjectDiagram } from "react-icons/fa";
import * as db from "../Database";
import { Assignment, Quiz, Exam, Course, Enrollment } from "../Database/type";
import { RootState } from "../store";
import "./calendar.css";

// Unified type for showing any kind of due item
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

type ViewMode = "month" | "list";

export default function Calendar() {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
    const [viewMode, setViewMode] = useState<ViewMode>("month");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // Get data from Redux
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { exams } = useSelector((state: RootState) => state.examsReducer);

    const courses = db.courses as Course[];
    const allEnrollments = db.enrollments as Enrollment[];

    // Admins see everything, others see only enrolled courses
    const isAdmin = currentUser?.role === "ADMIN";

    const enrolledCourseIds = isAdmin
        ? courses.map((c: Course) => c._id)
        : allEnrollments
            .filter((e: Enrollment) => e.user === currentUser?._id)
            .map((e: Enrollment) => e.course);

    const userCourses = courses.filter((c: Course) => enrolledCourseIds.includes(c._id));

    // Combine all items from assignments, quizzes, and exams
    const allItems: CalendarItem[] = useMemo(() => {
        const items: CalendarItem[] = [];

        assignments.forEach((a: Assignment) => {
            if (enrolledCourseIds.includes(a.course)) {
                items.push({
                    _id: a._id,
                    title: a.title,
                    course: a.course,
                    dueDate: a.dueDate,
                    availableDate: a.availableDate,
                    points: a.points,
                    type: a.assignmentType === "PROJECTS" ? "Project" : "Assignment"
                });
            }
        });

        quizzes.forEach((q: Quiz) => {
            if (enrolledCourseIds.includes(q.course)) {
                items.push({
                    _id: q._id,
                    title: q.title,
                    course: q.course,
                    dueDate: q.dueDate,
                    availableDate: q.availableDate,
                    points: q.points,
                    type: "Quiz",
                    questions: q.questions,
                    timeLimit: q.timeLimit
                });
            }
        });

        exams.forEach((e: Exam) => {
            if (enrolledCourseIds.includes(e.course)) {
                items.push({
                    _id: e._id,
                    title: e.title,
                    course: e.course,
                    dueDate: e.dueDate,
                    availableDate: e.availableDate,
                    points: e.points,
                    type: "Exam",
                    questions: e.questions,
                    timeLimit: e.timeLimit
                });
            }
        });

        return items;
    }, [assignments, quizzes, exams, enrolledCourseIds]);

    // Apply search and filter criteria
    const filteredItems = useMemo(() => {
        return allItems.filter((item: CalendarItem) => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCourse = selectedCourses.length === 0 || selectedCourses.includes(item.course);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
            return matchesSearch && matchesCourse && matchesType;
        });
    }, [allItems, searchTerm, selectedCourses, selectedTypes]);

    // Get all items due on a specific date
    const getItemsForDate = (date: Date): CalendarItem[] => {
        return filteredItems.filter((item: CalendarItem) => {
            const itemDate = new Date(item.dueDate);
            return itemDate.toDateString() === date.toDateString();
        });
    };

    // Look up course color
    const getCourseColor = (courseId: string): string => {
        const course = courses.find((c: Course) => c._id === courseId);
        return course?.color || "#6c757d";
    };

    // Look up course name
    const getCourseName = (courseId: string): string => {
        const course = courses.find((c: Course) => c._id === courseId);
        return course?.number || courseId;
    };

    // Pick icon based on item type
    const getTypeIcon = (type: string) => {
        const icons = {
            "Assignment": <MdAssignment className="me-1" />,
            "Quiz": <GrNotes className="me-1" />,
            "Exam": <FaRegFileAlt className="me-1" />,
            "Project": <FaProjectDiagram className="me-1" />
        };
        return icons[type as keyof typeof icons] || null;
    };

    // Format dates nicely
    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return "";
        }
    };

    const formatTime = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return "";
        }
    };

    // Generate all days for the month view
    const generateMonthDays = (): Date[] => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days: Date[] = [];
        const current = new Date(startDate);

        while (days.length < 42) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    // Navigation helpers
    const navigatePrevious = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate);
    };

    const navigateNext = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    const goToToday = () => setSelectedDate(new Date());

    // Toggle course filter
    const toggleCourse = (courseId: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
        );
    };

    // Toggle type filter
    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    // Render month grid view
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
                    {days.map((day: Date, index: number) => {
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
                                    {items.slice(0, 3).map((item: CalendarItem) => (
                                        <div
                                            key={item._id}
                                            className="calendar-day-item"
                                            style={{ backgroundColor: getCourseColor(item.course) }}
                                            title={`${item.title} - ${getCourseName(item.course)}`}
                                        >
                                            {getTypeIcon(item.type)}
                                            <span className="calendar-item-title">{item.title}</span>
                                        </div>
                                    ))}
                                    {items.length > 3 && (
                                        <div className="calendar-day-more">+{items.length - 3} more</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Render list view
    const renderListView = () => {
        const sortedItems = [...filteredItems].sort((a: CalendarItem, b: CalendarItem) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

        const groupedByDate: Record<string, CalendarItem[]> = {};
        sortedItems.forEach((item: CalendarItem) => {
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
                        {items.map((item: CalendarItem) => (
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
                                            <Badge bg="light" text="dark" className="ms-2">
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <div className="text-muted small">
                                            <div><strong>Course:</strong> {getCourseName(item.course)}</div>
                                            <div><strong>Due:</strong> {formatDate(item.dueDate)} at {formatTime(item.dueDate)}</div>
                                            <div><strong>Points:</strong> {item.points}</div>
                                            {item.questions && <div><strong>Questions:</strong> {item.questions}</div>}
                                            {item.timeLimit && <div><strong>Time Limit:</strong> {item.timeLimit} minutes</div>}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ))}
                {Object.keys(groupedByDate).length === 0 && (
                    <div className="text-center text-muted py-5">
                        <IoCalendarOutline className="fs-1 mb-3" />
                        <p>No items found matching your filters</p>
                    </div>
                )}
            </div>
        );
    };

    const getViewTitle = (): string => {
        return selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div id="wd-calendar" className="calendar-container">
            {/* Header */}
            <div className="calendar-header">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <IoCalendarOutline className="fs-3 me-3 text-danger" />
                        <h2 className="mb-0">Calendar</h2>
                    </div>
                    <div className="text-muted">
                        {filteredItems.length} items • {userCourses.length} courses
                    </div>
                </div>
            </div>

            {/* Search and view controls */}
            <div className="calendar-controls">
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

            {/* Filter badges */}
            <div className="calendar-filters">
                <div className="filter-section">
                    <div className="filter-label">
                        <IoFilter className="me-1" />
                        Courses:
                    </div>
                    <div className="filter-options">
                        {userCourses.map((course: Course) => (
                            <span
                                key={course._id}
                                className={`filter-badge ${selectedCourses.includes(course._id) ? 'filter-badge-active' : 'filter-badge-inactive'}`}
                                style={selectedCourses.includes(course._id) ? { backgroundColor: course.color, borderColor: course.color } : undefined}
                                onClick={() => toggleCourse(course._id)}
                            >
                                {course.number}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="filter-section">
                    <div className="filter-label">Type:</div>
                    <div className="filter-options">
                        {["Assignment", "Quiz", "Exam", "Project"].map((type: string) => {
                            const typeClass = selectedTypes.includes(type)
                                ? `filter-type-active filter-type-${type.toLowerCase()}`
                                : 'filter-type-inactive';

                            return (
                                <span
                                    key={type}
                                    className={`filter-badge ${typeClass}`}
                                    onClick={() => toggleType(type)}
                                >
                                    {type}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Month navigation */}
            {viewMode !== "list" && (
                <div className="calendar-navigation">
                    <Button variant="outline-secondary" size="sm" onClick={navigatePrevious}>
                        <IoChevronBack />
                    </Button>
                    <h4 className="calendar-title mb-0">{getViewTitle()}</h4>
                    <Button variant="outline-secondary" size="sm" onClick={navigateNext}>
                        <IoChevronForward />
                    </Button>
                    <Button variant="danger" size="sm" onClick={goToToday}>
                        Today
                    </Button>
                </div>
            )}

            {/* Calendar content */}
            <div className="calendar-content">
                {viewMode === "month" && renderMonthView()}
                {viewMode === "list" && renderListView()}
            </div>
        </div>
    );
}
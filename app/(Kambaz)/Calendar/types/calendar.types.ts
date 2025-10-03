/**
 * Course Interface
 * Represents a course with display properties for calendar
 */
export interface Course {
    _id: string;
    name: string;
    number: string;
    color: string;
}

/**
 * Database Assignment Interface
 * Matches the structure in assignments.json
 */
export interface DbAssignment {
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
export interface DbQuiz {
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
export interface DbExam {
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
export interface DbProject {
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
 * All calendar items are normalized to this structure
 */
export interface CalendarItem {
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
export type ViewMode = "month" | "week" | "list";

/**
 * Filter State Interface
 * Represents the state of calendar filters
 */
export interface FilterState {
    searchTerm: string;
    selectedCourses: string[];
    selectedTypes: string[];
}

/**
 * Calendar Header Props
 * Props for the CalendarHeader component
 */
export interface CalendarHeaderProps {
    // No props needed for this static component
}

/**
 * Calendar Controls Props
 * Props for the CalendarControls component
 */
export interface CalendarControlsProps {
    searchTerm: string;
    viewMode: ViewMode;
    onSearchChange: (value: string) => void;
    onViewModeChange: (mode: ViewMode) => void;
}

/**
 * Calendar Filters Props
 * Props for the CalendarFilters component
 */
export interface CalendarFiltersProps {
    courses: Course[];
    selectedCourses: string[];
    selectedTypes: string[];
    onToggleCourse: (courseId: string) => void;
    onToggleType: (type: string) => void;
}

/**
 * Calendar Navigation Props
 * Props for the CalendarNavigation component
 */
export interface CalendarNavigationProps {
    selectedDate: Date;
    viewMode: ViewMode;
    onNavigatePrevious: () => void;
    onNavigateNext: () => void;
    onGoToToday: () => void;
}

/**
 * Month View Props
 * Props for the MonthView component
 */
export interface MonthViewProps {
    selectedDate: Date;
    currentDate: Date;
    filteredItems: CalendarItem[];
    courses: Course[];
}

/**
 * List View Props
 * Props for the ListView component
 */
export interface ListViewProps {
    filteredItems: CalendarItem[];
    courses: Course[];
}

/**
 * Day Cell Props
 * Props for individual day cells in month view
 */
export interface DayCellProps {
    day: Date;
    items: CalendarItem[];
    isToday: boolean;
    isCurrentMonth: boolean;
    courses: Course[];
}

/**
 * List Item Props
 * Props for individual items in list view
 */
export interface ListItemProps {
    item: CalendarItem;
    courseColor: string;
    courseName: string;
}
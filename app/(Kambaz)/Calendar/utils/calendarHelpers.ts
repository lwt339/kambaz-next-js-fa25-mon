import { ViewMode } from '../types/calendar.types';

/**
 * Format date for display
 * Converts a date string to a readable format
 * @param dateString - ISO date string to format
 * @returns Formatted date string (e.g., "Oct 15, 2025")
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

/**
 * Format time for display
 * Converts a date string to a time format
 * @param dateString - ISO date string to format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Generate calendar days for month view
 * Creates a 6-week grid (42 days) starting from the first Sunday before the month begins
 * This ensures a consistent calendar layout regardless of month start day
 * @param selectedDate - The currently selected date for the calendar view
 * @returns Array of 42 Date objects representing the calendar grid
 */
export function generateMonthDays(selectedDate: Date): Date[] {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);

    // Start from the Sunday before the first day of the month
    // This creates the traditional calendar layout with weeks starting on Sunday
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // Generate 42 days (6 weeks) for consistent calendar grid
    // This covers all possible month layouts (max 31 days + padding)
    const days: Date[] = [];
    const current = new Date(startDate);

    while (days.length < 42) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return days;
}

/**
 * Get current view title
 * Generates the appropriate title based on the current view mode and selected date
 * @param viewMode - Current calendar view mode
 * @param selectedDate - Currently selected date
 * @returns Title string for the current view
 */
export function getViewTitle(viewMode: ViewMode, selectedDate: Date): string {
    if (viewMode === "month") {
        // Format: "November 2025"
        return selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    } else if (viewMode === "week") {
        // Format: "Week of Oct 15"
        return `Week of ${selectedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })}`;
    }
    // List view shows all items
    return "All Items";
}

/**
 * Navigate to previous period
 * Calculates the previous date based on the current view mode
 * @param currentDate - Current selected date
 * @param viewMode - Current view mode
 * @returns New date for the previous period
 */
export function navigateToPrevious(currentDate: Date, viewMode: ViewMode): Date {
    const newDate = new Date(currentDate);

    if (viewMode === "month") {
        // Move to previous month
        newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === "week") {
        // Move to previous week
        newDate.setDate(newDate.getDate() - 7);
    }

    return newDate;
}

/**
 * Navigate to next period
 * Calculates the next date based on the current view mode
 * @param currentDate - Current selected date
 * @param viewMode - Current view mode
 * @returns New date for the next period
 */
export function navigateToNext(currentDate: Date, viewMode: ViewMode): Date {
    const newDate = new Date(currentDate);

    if (viewMode === "month") {
        // Move to next month
        newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === "week") {
        // Move to next week
        newDate.setDate(newDate.getDate() + 7);
    }

    return newDate;
}

/**
 * Check if two dates are the same day
 * Compares dates ignoring time components
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
}

/**
 * Check if a date is in the current month
 * @param date - Date to check
 * @param currentMonth - Month to compare against
 * @returns True if date is in the current month
 */
export function isInCurrentMonth(date: Date, currentMonth: Date): boolean {
    return date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear();
}

/**
 * Get week days array
 * Returns an array of weekday abbreviations for calendar header
 * @returns Array of weekday names
 */
export function getWeekDays(): string[] {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

/**
 * Parse date string safely
 * Handles various date formats and returns a valid Date object
 * @param dateString - Date string to parse
 * @returns Valid Date object or current date if parsing fails
 */
export function parseDate(dateString: string | undefined): Date {
    if (!dateString) {
        return new Date();
    }

    const parsed = new Date(dateString);

    // Check if date is valid
    if (isNaN(parsed.getTime())) {
        console.warn(`Invalid date string: ${dateString}`);
        return new Date();
    }

    return parsed;
}

/**
 * Get month and year string
 * Formats a date to show just month and year
 * @param date - Date to format
 * @returns Formatted string (e.g., "November 2025")
 */
export function getMonthYearString(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Get relative date description
 * Returns a human-readable description of when something is due
 * @param dateString - ISO date string
 * @returns Relative date description (e.g., "Today", "Tomorrow", "Oct 15")
 */
export function getRelativeDateDescription(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isSameDay(date, today)) {
        return "Today";
    } else if (isSameDay(date, tomorrow)) {
        return "Tomorrow";
    } else {
        return formatDate(dateString);
    }
}
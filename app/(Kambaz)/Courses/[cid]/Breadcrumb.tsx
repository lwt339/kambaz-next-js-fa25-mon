/**
 * Breadcrumb Component - Database-Aware Version
 * Location: app/(Kambaz)/Courses/[cid]/Breadcrumb.tsx
 *
 * Now looks up assignment titles from the database instead of using hardcoded mappings.
 * Shows current location within the course structure.
 */

"use client";
import React from "react";
import { usePathname } from "next/navigation";
// Import assignments from database
import { assignments } from "../../Database";

interface BreadcrumbProps {
    course: {
        name: string;
        _id?: string;
    } | undefined;
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
    const pathname = usePathname();

    if (!pathname) return null;

    /**
     * Split the pathname into segments
     * Example: /Courses/RS101/Assignments/A101
     * Becomes: ["Courses", "RS101", "Assignments", "A101"]
     */
    const pathSegments = pathname.split("/").filter(segment => segment !== "");

    /**
     * Find where "Courses" appears in the path
     */
    const coursesIndex = pathSegments.findIndex(segment =>
        segment === "Courses" || segment === "courses" || segment === "Kambaz"
    );

    /**
     * Build the breadcrumb trail
     * Shows: Course Name > Section > Item (if applicable)
     */
    const buildBreadcrumbTrail = () => {
        if (coursesIndex === -1) return null;

        // Get the section name (Home, Modules, Assignments, etc.)
        const sectionIndex = coursesIndex + 2;
        const section = pathSegments[sectionIndex];

        // Don't show breadcrumb for Home page
        if (!section || section === "Home") {
            return null;
        }

        let breadcrumbText = ` > ${section}`;

        // Get the item ID (assignment ID, module ID, etc.)
        const itemIndex = coursesIndex + 3;
        const itemId = pathSegments[itemIndex];

        if (itemId) {
            /**
             * For Assignments section, look up the assignment title from database
             * instead of using hardcoded mappings
             */
            if (section === "Assignments") {
                // Find the assignment in the database
                const assignment = assignments.find((a: any) => a._id === itemId);

                if (assignment) {
                    // Use the actual assignment title from database
                    breadcrumbText += ` > ${assignment.title}`;
                } else {
                    // Fallback if assignment not found
                    breadcrumbText += ` > Assignment ${itemId}`;
                }
            }
            else if (section === "Modules") {
                breadcrumbText += ` > Module ${itemId}`;
            }
            else {
                // For other sections, just show the ID
                breadcrumbText += ` > ${itemId}`;
            }
        }

        return breadcrumbText;
    };

    const breadcrumbTrail = buildBreadcrumbTrail();

    // Only render if there's a breadcrumb to show
    if (breadcrumbTrail) {
        return <span>{breadcrumbTrail}</span>;
    }

    return null;
}

/**
 * KEY CHANGES:
 *
 * 1. Imports assignments from database: import { assignments } from "../../Database"
 * 2. Looks up assignment by ID: assignments.find((a: any) => a._id === itemId)
 * 3. Uses real assignment title: assignment.title
 * 4. Removed hardcoded assignmentMap and quizMap
 * 5. Works dynamically with any assignment in the database
 *
 * HOW THIS WORKS:
 *
 * Example URLs and resulting breadcrumbs:
 *
 * 1. /Courses/RS101/Home
 *    → No breadcrumb (Home page doesn't show one)
 *
 * 2. /Courses/RS101/Modules
 *    → " > Modules"
 *
 * 3. /Courses/RS101/Assignments
 *    → " > Assignments"
 *
 * 4. /Courses/RS101/Assignments/A101
 *    → Looks up A101 in database
 *    → Finds: { _id: "A101", title: "Propulsion Assignment", ... }
 *    → Shows: " > Assignments > Propulsion Assignment"
 *
 * 5. /Courses/CS5610/Assignments/A401
 *    → Looks up A401 in database
 *    → Finds: { _id: "A401", title: "A1 - ENV + HTML", ... }
 *    → Shows: " > Assignments > A1 - ENV + HTML"
 *
 * ADVANTAGES:
 * ✓ No hardcoded mappings to maintain
 * ✓ Works with any assignment in the database
 * ✓ Shows real assignment titles
 * ✓ Easy to extend for other types (quizzes, exams, etc.)
 * ✓ Automatically updates when database changes
 *
 * TO EXTEND FOR QUIZZES OR EXAMS:
 * Just add similar logic:
 *
 * import { assignments, quizzes, exams } from "../../Database";
 *
 * if (section === "Quizzes") {
 *   const quiz = quizzes.find((q: any) => q._id === itemId);
 *   if (quiz) breadcrumbText += ` > ${quiz.title}`;
 * }
 */
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { assignments, modules, quizzes, exams } from "../../Database";
import type { Assignment, Module, Quiz, Exam } from "../../Database/type";

// JSON data
const typedAssignments = assignments as Assignment[];
const typedModules = modules as Module[];
const typedQuizzes = quizzes as Quiz[];
const typedExams = exams as Exam[];


interface BreadcrumbProps {
    course: {
        _id?: string;
        name: string;
        number?: string;
        department?: string;
    } | undefined;
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
    const pathname = usePathname();

    // Early return
    if (!pathname) return null;

    // Parse path segments
    const pathSegments = pathname.split("/").filter(segment => segment !== "");

    // Find the courses section in the path
    const coursesIndex = pathSegments.findIndex(segment =>
        segment === "Courses" || segment === "courses" || segment === "Kambaz"
    );

    // Not in a courses context
    if (coursesIndex === -1) return null;

    // Extract path components
    const courseId = course?._id || pathSegments[coursesIndex + 1];
    const section = pathSegments[coursesIndex + 2];
    const itemId = pathSegments[coursesIndex + 3];

    // Don't show breadcrumb on Home page
    if (!section || section === "Home") {
        return null;
    }

    /**
     * Get the title of database collection
     */
    const getItemTitle = (): string | null => {
        if (!itemId) return null;

        switch (section) {
            case "Assignments": {
                const assignment = typedAssignments.find(a => a._id === itemId);
                return assignment?.title || null;
            }
            case "Modules": {
                // avoid conflict with global module object
                const foundModule = typedModules.find(m => m._id === itemId);
                return foundModule?.name || null;
            }
            case "Quizzes": {
                const quiz = typedQuizzes.find(q => q._id === itemId);
                return quiz?.title || null;
            }
            case "Exams": {
                const exam = typedExams.find(e => e._id === itemId);
                return exam?.title || null;
            }
            default:
                return itemId;
        }
    };

    const itemTitle = getItemTitle();

    return (
        <>
            {/* Separator before section */}
            <span className="text-danger mx-2" aria-hidden="true">
        &gt;
      </span>

            {/* Section Link */}
            <Link
                href={`/Courses/${courseId}/${section}`}
                className="text-danger text-decoration-none breadcrumb-link"
            >
                {section}
            </Link>

            {/* Item Link */}
            {itemId && itemTitle && (
                <>
          <span className="text-danger mx-2" aria-hidden="true">
            &gt;
          </span>
                    <Link
                        href={`/Courses/${courseId}/${section}/${itemId}`}
                        className="text-danger text-decoration-none breadcrumb-link"
                    >
                        {/* long titles */}
                        {itemTitle.length > 30
                            ? `${itemTitle.substring(0, 30)}...`
                            : itemTitle}
                    </Link>
                </>
            )}
        </>
    );
}
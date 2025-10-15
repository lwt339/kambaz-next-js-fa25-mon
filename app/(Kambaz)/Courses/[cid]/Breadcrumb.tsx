// File: app/(Kambaz)/Courses/[cid]/Breadcrumb.tsx
// Shows where you are in the course like "Assignments > Homework 1"

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { assignments, modules, quizzes, exams } from "../../Database";
import { Assignment, Module, Quiz, Exam, Course } from "../../Database/type";

// Type the database imports properly
const typedAssignments = assignments as Assignment[];
const typedModules = modules as Module[];
const typedQuizzes = quizzes as Quiz[];
const typedExams = exams as Exam[];

interface BreadcrumbProps {
    course: Course | undefined;
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
    const pathname = usePathname();

    if (!pathname) return null;

    // Break URL into pieces
    const pathSegments = pathname.split("/").filter((segment: string) => segment !== "");

    // Find where "Courses" is in the URL
    const coursesIndex = pathSegments.findIndex((segment: string) =>
        segment === "Courses" || segment === "courses" || segment === "Kambaz"
    );

    // Not in a course, don't show breadcrumb
    if (coursesIndex === -1) return null;

    // Pull out the important parts
    const courseId = course?._id || pathSegments[coursesIndex + 1];
    const section = pathSegments[coursesIndex + 2];
    const itemId = pathSegments[coursesIndex + 3];

    // Don't show on Home page
    if (!section || section === "Home") {
        return null;
    }

    // Look up what item we're viewing
    const getItemTitle = (): string | null => {
        if (!itemId) return null;

        switch (section) {
            case "Assignments": {
                const assignment = typedAssignments.find((a: Assignment) => a._id === itemId);
                return assignment?.title || null;
            }
            case "Modules": {
                const foundModule = typedModules.find((m: Module) => m._id === itemId);
                return foundModule?.name || null;
            }
            case "Quizzes": {
                const quiz = typedQuizzes.find((q: Quiz) => q._id === itemId);
                return quiz?.title || null;
            }
            case "Exams": {
                const exam = typedExams.find((e: Exam) => e._id === itemId);
                return exam?.title || null;
            }
            default:
                return itemId;
        }
    };

    const itemTitle = getItemTitle();

    return (
        <>
            {/* Arrow separator */}
            <span className="text-danger mx-2" aria-hidden="true">
                &gt;
            </span>

            {/* Section link like "Assignments" */}
            <Link
                href={`/Courses/${courseId}/${section}`}
                className="text-danger text-decoration-none breadcrumb-link"
            >
                {section}
            </Link>

            {/* Specific item like "Homework 1" */}
            {itemId && itemTitle && (
                <>
                    <span className="text-danger mx-2" aria-hidden="true">
                        &gt;
                    </span>
                    <Link
                        href={`/Courses/${courseId}/${section}/${itemId}`}
                        className="text-danger text-decoration-none breadcrumb-link"
                    >
                        {/* Cut off long titles */}
                        {itemTitle.length > 30
                            ? `${itemTitle.substring(0, 30)}...`
                            : itemTitle}
                    </Link>
                </>
            )}
        </>
    );
}
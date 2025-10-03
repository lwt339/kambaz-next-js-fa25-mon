/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLICKABLE BREADCRUMB COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Location: app/(Kambaz)/Courses/[cid]/Breadcrumb.tsx
 *
 * Shows section navigation path (NOT course name - that's in the heading)
 * All segments are clickable links
 *
 * FEATURES:
 * ✅ Shows only section path (e.g., "Assignments > A1")
 * ✅ Every segment is clickable
 * ✅ Database-driven item titles
 * ✅ Same font as course heading
 * ✅ Clean, professional look
 *
 * @author Kambaz Development Team
 * @version 4.0 - Fully Clickable Edition
 */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { assignments, modules, quizzes, exams } from "../../Database";

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════
interface BreadcrumbProps {
    course: {
        _id?: string;      // Course ID (e.g., "CS5610")
        name: string;      // Course name
    } | undefined;
}

// ═══════════════════════════════════════════════════════════════════════════
// BREADCRUMB COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function Breadcrumb({ course }: BreadcrumbProps) {
    // ────────────────────────────────────────────────────────────────────────
    // GET CURRENT PATH
    // ────────────────────────────────────────────────────────────────────────
    const pathname = usePathname();

    if (!pathname) return null;

    // ────────────────────────────────────────────────────────────────────────
    // PARSE PATH SEGMENTS
    // ────────────────────────────────────────────────────────────────────────
    const pathSegments = pathname.split("/").filter(segment => segment !== "");

    const coursesIndex = pathSegments.findIndex(segment =>
        segment === "Courses" || segment === "courses" || segment === "Kambaz"
    );

    if (coursesIndex === -1) return null;

    // ────────────────────────────────────────────────────────────────────────
    // EXTRACT PATH COMPONENTS
    // ────────────────────────────────────────────────────────────────────────
    const courseId = course?._id || pathSegments[coursesIndex + 1];
    const sectionIndex = coursesIndex + 2;
    const section = pathSegments[sectionIndex];
    const itemIndex = coursesIndex + 3;
    const itemId = pathSegments[itemIndex];

    // Don't show breadcrumb for Home page
    if (!section || section === "Home") {
        return null;
    }

    // ────────────────────────────────────────────────────────────────────────
    // FIND ITEM TITLE FROM DATABASE
    // ────────────────────────────────────────────────────────────────────────
    let itemTitle: string | null = null;

    if (itemId) {
        switch (section) {
            case "Assignments":
                const assignment = assignments.find((a: any) => a._id === itemId);
                itemTitle = assignment?.title || null;
                break;

            case "Modules":
                const module = modules.find((m: any) => m._id === itemId);
                itemTitle = module?.name || null;
                break;

            case "Quizzes":
                const quiz = quizzes.find((q: any) => q._id === itemId);
                itemTitle = quiz?.title || null;
                break;

            case "Exams":
                const exam = exams.find((e: any) => e._id === itemId);
                itemTitle = exam?.title || null;
                break;

            default:
                itemTitle = itemId;
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDER BREADCRUMB
    // ────────────────────────────────────────────────────────────────────────
    return (
        <>
            {/* Separator before section */}
            <span className="text-danger mx-2">&gt;</span>

            {/* Section Link (e.g., "Assignments", "Modules") */}
            <Link
                href={`/Courses/${courseId}/${section}`}
                className="text-danger text-decoration-none hover-underline"
            >
                {section}
            </Link>

            {/* Item Link (e.g., "A1 - ENV + HTML") */}
            {itemId && itemTitle && (
                <>
                    <span className="text-danger mx-2">&gt;</span>
                    <Link
                        href={`/Courses/${courseId}/${section}/${itemId}`}
                        className="text-danger text-decoration-none hover-underline"
                    >
                        {itemTitle}
                    </Link>
                </>
            )}
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// VISUAL EXAMPLES
// ═══════════════════════════════════════════════════════════════════════════
/**
 * HOW IT LOOKS ON SCREEN:
 *
 * ┌────────────────────────────────────────────────────────────────────┐
 * │ 📚 CS5610 Web Development > Assignments > A1 - ENV + HTML         │
 * │    └─ clickable ─────┘   └─ clickable ┘   └─── clickable ──────┘  │
 * └────────────────────────────────────────────────────────────────────┘
 *
 * URL EXAMPLES:
 *
 * 1. /Courses/CS5610/Home
 *    Display: CS5610 Web Development
 *    (no breadcrumb)
 *
 * 2. /Courses/CS5610/Modules
 *    Display: CS5610 Web Development > Modules
 *    Click "Modules" → /Courses/CS5610/Modules
 *
 * 3. /Courses/CS5610/Assignments
 *    Display: CS5610 Web Development > Assignments
 *    Click "Assignments" → /Courses/CS5610/Assignments
 *
 * 4. /Courses/CS5610/Assignments/A5610-1
 *    Display: CS5610 Web Development > Assignments > A1 - ENV + HTML
 *    Click "CS5610 Web Development" → /Courses/CS5610/Home
 *    Click "Assignments" → /Courses/CS5610/Assignments
 *    Click "A1 - ENV + HTML" → /Courses/CS5610/Assignments/A5610-1
 *
 * 5. /Courses/RS101/Modules/M101-2
 *    Display: RS101 Rocket Propulsion > Modules > Week 2 - Fundamentals
 *    (all clickable)
 */

// ═══════════════════════════════════════════════════════════════════════════
// KEY FEATURES
// ═══════════════════════════════════════════════════════════════════════════
/**
 * ✅ CLICKABLE NAVIGATION:
 *    - Course name in heading → goes to Home
 *    - Section name → goes to section list
 *    - Item name → goes to item detail
 *
 * ✅ DATABASE-DRIVEN:
 *    - Assignment titles from assignments.json
 *    - Module names from modules.json
 *    - Quiz titles from quizzes.json
 *    - Exam titles from exams.json
 *
 * ✅ SAME FONT:
 *    - Matches heading font size (1.5rem)
 *    - Consistent styling throughout
 *
 * ✅ NO DUPLICATION:
 *    - Course name ONLY in heading
 *    - Breadcrumb shows ONLY section path
 *
 * ✅ PROFESSIONAL:
 *    - Clean separators (>)
 *    - Hover effects
 *    - Red danger color
 *    - Proper spacing
 */

// ═══════════════════════════════════════════════════════════════════════════
// CSS FOR HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════════════════
/**
 * Add to your kambaz.css or global CSS:
 *
 * .hover-underline {
 *   transition: text-decoration 0.2s ease;
 * }
 *
 * .hover-underline:hover {
 *   text-decoration: underline !important;
 * }
 *
 * OPTIONAL - Make separators slightly lighter:
 * .breadcrumb-separator {
 *   color: #dc3545;
 *   opacity: 0.7;
 * }
 */

// ═══════════════════════════════════════════════════════════════════════════
// USAGE IN LAYOUT
// ═══════════════════════════════════════════════════════════════════════════
/**
 * In your course layout.tsx:
 *
 * <div className="d-flex align-items-center text-danger">
 *   <FaAlignJustify className="me-3 fs-4 d-none d-md-inline" />
 *
 *   <!-- Clickable course title -->
 *   <Link
 *     href={`/Courses/${cid}/Home`}
 *     className="text-danger text-decoration-none"
 *     style={{ fontSize: '1.5rem', fontWeight: 500 }}
 *   >
 *     {course?._id} {course?.name}
 *   </Link>
 *
 *   <!-- Breadcrumb shows section path only -->
 *   <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>
 *     <Breadcrumb course={course} />
 *   </span>
 * </div>
 */
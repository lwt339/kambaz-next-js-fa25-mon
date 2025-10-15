// File: app/(Kambaz)/Courses/[cid]/Navigation.tsx
// Sidebar navigation showing all course sections

"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
    const { cid } = useParams<{ cid: string }>();
    const pathname = usePathname();

    // All the sections students can navigate to in a course
    const links: string[] = [
        "Home",
        "Modules",
        "Piazza",
        "Zoom",
        "Assignments",
        "Quizzes",
        "Grades",
        "People"
    ];

    // Check if this link is the current page
    const isActive = (linkName: string): boolean => {
        return pathname?.includes(`/Courses/${cid}/${linkName}`) || false;
    };

    return (
        <div
            id="wd-courses-navigation"
            className="wd list-group fs-5 rounded-0 bg-white"
            style={{ width: "150px" }}
        >
            {links.map((link: string) => {
                const active = isActive(link);

                return (
                    <Link
                        key={link}
                        href={`/Courses/${cid}/${link}`}
                        className={`list-group-item border-0 wd-nav-link ${
                            active
                                ? "active text-black border-start border-4 border-black"
                                : "text-danger"
                        }`}
                        style={{
                            backgroundColor: active ? "white" : "transparent",
                            paddingLeft: active ? "12px" : "16px"
                        }}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}
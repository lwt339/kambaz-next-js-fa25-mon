"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();

    // Helper function for checking active state
    const isActive = (path: string) => {
        return pathname.includes(path);
    };

    // REQUIRED: All these navigation links for Assignment 2
    const links = [
        { name: "Home", path: `/Courses/${cid}/Home` },
        { name: "Modules", path: `/Courses/${cid}/Modules` },
        { name: "Piazza", path: `/Courses/${cid}/Piazza` },
        { name: "Zoom", path: `/Courses/${cid}/Zoom` },
        { name: "Assignments", path: `/Courses/${cid}/Assignments` },
        { name: "Quizzes", path: `/Courses/${cid}/Quizzes` },
        { name: "Grades", path: `/Courses/${cid}/Grades` },
        { name: "People", path: `/Courses/${cid}/People` },
    ];

    return (
        <div
            id="wd-courses-navigation"
            className="wd list-group fs-5 rounded-0"
            style={{ width: "150px" }}
        >
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`list-group-item border-0 ${
                        isActive(link.path)
                            ? 'active text-black border-start border-4 border-black'
                            : 'text-danger'
                    }`}
                    style={{
                        backgroundColor: isActive(link.path) ? 'white' : 'transparent',
                        paddingLeft: isActive(link.path) ? '12px' : '16px'
                    }}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
}

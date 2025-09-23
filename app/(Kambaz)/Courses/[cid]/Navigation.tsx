"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();

    // REQUIRED: All these navigation links
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
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`list-group-item border-0 ${
                        pathname === link.path ? 'active' : 'text-danger'
                    }`}>
                    {link.name}
                </Link>
            ))}
        </div>
    );
}
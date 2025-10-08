"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();

    // Data structure for navigation links
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    // Helper function
    const isActive = (linkName: string) => {
        return pathname.includes(`/Courses/${cid}/${linkName}`);
    };

    return (
        <div
            id="wd-courses-navigation"
            className="wd list-group fs-5 rounded-0 bg-white"
            style={{ width: "150px" }}
        >
            {links.map((link) => (
                <Link
                    key={link}
                    href={`/Courses/${cid}/${link}`}
                    className={`list-group-item border-0 ${
                        isActive(link)
                            ? "active text-black border-start border-4 border-black"
                            : "text-danger"
                    }`}
                    style={{
                        backgroundColor: isActive(link) ? "white" : "transparent",
                        paddingLeft: isActive(link) ? "12px" : "16px"
                    }}
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}
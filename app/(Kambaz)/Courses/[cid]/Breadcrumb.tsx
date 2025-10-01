"use client";
import React from "react";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
    course: {
        name: string;
        _id?: string;
    } | undefined;
}

export default function Breadcrumb({ course }: BreadcrumbProps) {
    const pathname = usePathname();

    if (!pathname) return null;

    // Split the path
    const pathSegments = pathname.split("/").filter(segment => segment !== "");

    // Courses
    const coursesIndex = pathSegments.findIndex(segment =>
        segment === "Courses" || segment === "courses" || segment === "Kambaz"
    );

    // course ID
    const buildBreadcrumbTrail = () => {
        if (coursesIndex === -1) return null;

        // section
        const sectionIndex = coursesIndex + 2;
        const itemIndex = coursesIndex + 3;  // assignment ID, module ID,

        //  section name
        const section = pathSegments[sectionIndex];

        // don't show breadcrumb
        if (!section || section === "Home") {
            return null;
        }

        let breadcrumbText = ` > ${section}`;

        const itemId = pathSegments[itemIndex];

        if (itemId) {
            // For assignments format the ID


            if (section === "Assignments") {

                if (/^\d+$/.test(itemId)) {

                    const assignmentMap: { [key: string]: string } = {
                        "123": "A1",
                        "124": "A2",
                        "125": "A3",
                        "126": "A4",
                        "127": "A5",
                        "128": "A6",

                    };

                    const displayName = assignmentMap[itemId] || `Assignment ${itemId}`;
                    breadcrumbText += ` > ${displayName}`;
                } else {

                    breadcrumbText += ` > ${itemId}`;
                }
            } else if (section === "Quizzes") {

                if (/^\d+$/.test(itemId)) {
                    const quizMap: { [key: string]: string } = {
                        "129": "Q1",
                        "130": "Q2",
                        "132": "Q3",

                    };
                    const displayName = quizMap[itemId] || `Quiz ${itemId}`;
                    breadcrumbText += ` > ${displayName}`;
                } else {
                    breadcrumbText += ` > ${itemId}`;
                }
            } else if (section === "Modules") {

                breadcrumbText += ` > Module ${itemId}`;
            } else {

                breadcrumbText += ` > ${itemId}`;
            }
        }

        return breadcrumbText;
    };

    const breadcrumbTrail = buildBreadcrumbTrail();


    if (breadcrumbTrail) {
        return <span>{breadcrumbTrail}</span>;
    }

    return null;
}
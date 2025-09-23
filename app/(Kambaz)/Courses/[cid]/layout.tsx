"use client";
import { ReactNode, use } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";

export default function CourseLayout({
                                         children,
                                         params
                                     }: {
    children: ReactNode,
    params: Promise<{ cid: string }>
}) {
    // Unwrap the params Promise using React.use()
    const { cid } = use(params);

    return (
        <div id="wd-courses">
            {/* Red course title with hamburger icon - REQUIRED */}
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                Course {cid}
            </h2>
            <hr />
            <div className="d-flex">
                {/* Course Navigation - Hide on small screens */}
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}
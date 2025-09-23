"use client";
import { use } from "react";
import Modules from "../Modules/page";
import CourseStatus from "./Status";

// Solution 1: Using React.use() hook (recommended for client components)
export default function Home({ params }: { params: Promise<{ cid: string }> }) {
    // Unwrap the params Promise using React.use()
    const { cid } = use(params);

    console.log("Course ID:", cid);

    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill me-3">
                <Modules/>
            </div>
            <div className="d-none d-xl-block">
                <CourseStatus />
            </div>
        </div>
    );
}
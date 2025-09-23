"use client";
import Modules from "../Modules/page";
import CourseStatus from "./Status";

// For dynamic routes, you can access params
export default function Home({ params }: { params: { cid: string } }) {
    console.log("Course ID:", params.cid);

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
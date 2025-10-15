// File: app/(Kambaz)/Courses/[cid]/Home/page.tsx
// Main course home page showing modules on the left and info panels on the right

"use client";

import { useSelector } from "react-redux";
import Modules from "../Modules/page";
import CourseStatus from "./Status";
import StudentPanels from "./StudentPanels";
import FacultyPanels from "./FacultyPanels";
import { RootState } from "../../../store";
import "./home.css";

export default function Home() {
    // Check who's viewing the page so we show them the right stuff
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    return (
        <div id="wd-home" className="d-flex">
            {/* Left side - course modules take up most of the screen */}
            <div className="flex-fill">
                <Modules />
            </div>

            {/* Right side - info panels only visible on large screens */}
            <div className="d-none d-xl-block ms-4" style={{ width: "350px" }}>
                {/* Course status buttons - everyone sees these */}
                <CourseStatus />

                {/* Students see their personal todo list and grades */}
                {currentUser?.role === "STUDENT" && <StudentPanels />}

                {/* Faculty, TAs, and Admins see course management tools */}
                {currentUser?.role && currentUser.role !== "STUDENT" && <FacultyPanels />}
            </div>
        </div>
    );
}
// File: app/(Kambaz)/Courses/[cid]/Home/Status.tsx
// Course management buttons that change based on who's logged in

"use client";

import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport, BiTargetLock } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { GrHomeRounded } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { IoCalendarOutline } from "react-icons/io5";
import { TbBellRinging } from "react-icons/tb";
import { RootState } from "../../../store";

export default function CourseStatus() {
    // Check who's logged in to decide what buttons to show
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // Students see fewer management options
    const isStudent = currentUser?.role === "STUDENT";

    return (
        <div id="wd-course-status">
            <h2>Course Status</h2>

            {/* Publishing controls - only instructors can use these */}
            {!isStudent && (
                <>
                    <div className="d-flex">
                        <div className="w-50 pe-1">
                            <Button variant="secondary" size="lg" className="w-100 text-nowrap">
                                <MdDoNotDisturbAlt className="me-2 fs-5" />
                                Unpublish
                            </Button>
                        </div>
                        <div className="w-50">
                            <Button variant="success" size="lg" className="w-100">
                                <FaCheckCircle className="me-2 fs-5" />
                                Publish
                            </Button>
                        </div>
                    </div>

                    {/* Course management tools for instructors */}
                    <Button variant="secondary" size="lg" className="w-100 mt-3 text-start">
                        <BiImport className="me-2 fs-5" />
                        Import Existing Content
                    </Button>

                    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                        <LiaFileImportSolid className="me-2 fs-5" />
                        Import from Commons
                    </Button>

                    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                        <GrHomeRounded className="me-2 fs-5" />
                        Choose Home Page
                    </Button>
                </>
            )}

            {/* Viewing tools - everyone gets these */}
            <Button variant="secondary" size="lg" className={`w-100 ${isStudent ? 'mt-0' : 'mt-1'} text-start`}>
                <BiTargetLock className="me-2 fs-5" />
                View Course Stream
            </Button>

            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <SiGoogleanalytics className="me-2 fs-5" />
                Course Analytics
            </Button>

            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <IoCalendarOutline className="me-2 fs-5" />
                View Course Calendar
            </Button>

            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <TbBellRinging className="me-2 fs-5" />
                View Course Notifications
            </Button>

            {/* Announcement tool for instructors */}
            {!isStudent && (
                <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                    <TbBellRinging className="me-2 fs-5" />
                    New Announcement
                </Button>
            )}
        </div>
    );
}
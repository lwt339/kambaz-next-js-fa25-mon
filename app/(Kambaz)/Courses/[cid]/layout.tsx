// File: app/(Kambaz)/Courses/[cid]/layout.tsx
// Course layout with enrollment protection - only enrolled users can access

"use client";

import { ReactNode, use, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CourseNavigation from "./Navigation";
import { FaAlignJustify, FaBars } from "react-icons/fa";
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid } from "react-icons/lia";
import { IoCalendarOutline, IoChevronForward } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiHistory, BiHelpCircle } from "react-icons/bi";
import { Offcanvas, ListGroup } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import { Course, Enrollment } from "../../Database/type";
import { RootState } from "../../store";
import { IconType } from "react-icons";

interface CourseLayoutProps {
    children: ReactNode;
    params: Promise<{ cid: string }>;
}

// What each nav item in the mobile drawer looks like
interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: IconType;
}

export default function CourseLayout({ children, params }: CourseLayoutProps) {
    const { cid } = use(params);
    const pathname = usePathname();
    const router = useRouter();

    // Get everything from Redux
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

    // Track mobile drawer visibility
    const [showKambazNav, setShowKambazNav] = useState<boolean>(false);
    const [showCourseNav, setShowCourseNav] = useState<boolean>(false);

    // Find this specific course
    const course = courses.find((c: Course) => c._id === cid);

    // Check if current user is enrolled in this course
    const isEnrolled = currentUser && enrollments.some(
        (e: Enrollment) => e.user === currentUser._id && e.course === cid
    );

    // Enrollment protection - kick out users who aren't enrolled
    useEffect(() => {
        if (currentUser && !isEnrolled) {
            router.push("/Dashboard");
        }
    }, [currentUser, isEnrolled, router]);

    // Main navigation items for mobile drawer
    const canvasNavItems: NavItem[] = [
        { id: "dashboard", label: "Dashboard", href: "/Dashboard", icon: AiOutlineDashboard },
        { id: "account", label: "Account", href: "/Account", icon: FaRegCircleUser },
        { id: "courses", label: "Courses", href: `/Courses/${cid}/Home`, icon: LiaBookSolid },
        { id: "groups", label: "Groups", href: "/Groups", icon: HiOutlineUserGroup },
        { id: "calendar", label: "Calendar", href: "/Calendar", icon: IoCalendarOutline },
        { id: "inbox", label: "Inbox", href: "/Inbox", icon: FaInbox },
        { id: "history", label: "History", href: "/History", icon: BiHistory },
        { id: "help", label: "Help", href: "/Help", icon: BiHelpCircle },
    ];

    // Course doesn't exist - show error
    if (!course) {
        return (
            <div id="wd-courses">
                <div className="alert alert-warning m-4">
                    <h4>Course Not Found</h4>
                    <p>The course with ID &quot;{cid}&quot; could not be found.</p>                    <Link href="/Dashboard" className="btn btn-primary">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    // User not enrolled - show access denied while redirecting
    if (currentUser && !isEnrolled) {
        return (
            <div id="wd-courses">
                <div className="alert alert-danger m-4">
                    <h4>Access Denied</h4>
                    <p>You must be enrolled in this course to access it.</p>
                    <p>Redirecting to Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div id="wd-courses">
            {/* Top header with course name and breadcrumbs */}
            <div className="d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center">
                    {/* Mobile menu button for main Kambaz navigation */}
                    <button
                        className="btn btn-link text-danger d-md-none p-0 me-3"
                        onClick={() => setShowKambazNav(true)}
                        aria-label="Show main navigation"
                    >
                        <FaAlignJustify className="fs-3" />
                    </button>

                    <div className="d-flex align-items-center text-danger">
                        <FaAlignJustify className="me-3 fs-4 d-none d-md-inline" />

                        {/* Course name is clickable to get back home */}
                        <Link
                            href={`/Courses/${cid}/Home`}
                            className="text-danger text-decoration-none hover-underline"
                            style={{ fontSize: '1.5rem', fontWeight: 500 }}
                        >
                            {course.number} {course.name}
                        </Link>

                        {/* Breadcrumb showing current section */}
                        <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                            <Breadcrumb course={course} />
                        </span>
                    </div>
                </div>

                {/* Mobile menu button for course navigation */}
                <button
                    className="btn btn-link text-secondary d-md-none p-0"
                    onClick={() => setShowCourseNav(true)}
                    aria-label="Show course navigation"
                >
                    <FaBars className="fs-4" />
                </button>
            </div>

            <hr className="my-2" />

            {/* Main layout with sidebar and content */}
            <div className="d-flex">
                {/* Course sidebar - hidden on mobile */}
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>

                {/* Main content where course pages render */}
                <div className="flex-fill p-3">
                    {children}
                </div>
            </div>

            {/* Mobile drawer for main Kambaz navigation */}
            <Offcanvas
                show={showKambazNav}
                onHide={() => setShowKambazNav(false)}
                placement="start"
                style={{ width: '320px' }}
            >
                <Offcanvas.Header className="border-bottom pb-3">
                    <div className="d-flex align-items-center">
                        <div className="text-danger me-2">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="10" cy="20" r="3"/>
                                <circle cx="20" cy="10" r="3"/>
                                <circle cx="30" cy="20" r="3"/>
                                <circle cx="20" cy="30" r="3"/>
                            </svg>
                        </div>
                        <h4 className="mb-0 text-danger fw-bold">KAMBAZ</h4>
                    </div>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowKambazNav(false)}
                        aria-label="Close"
                    />
                </Offcanvas.Header>

                <Offcanvas.Body className="p-0">
                    <ListGroup variant="flush">
                        {canvasNavItems.map((item: NavItem) => {
                            const isActive = pathname?.includes(item.href) ||
                                (item.id === "courses" && pathname?.includes("/Courses/"));

                            return (
                                <ListGroup.Item
                                    key={item.id}
                                    as={Link}
                                    href={item.href}
                                    action
                                    className={`border-0 py-3 px-4 d-flex align-items-center justify-content-between 
                                        ${isActive ? 'bg-light' : ''}`}
                                    onClick={() => setShowKambazNav(false)}
                                >
                                    <div className="d-flex align-items-center">
                                        <item.icon className={`fs-5 me-3 ${
                                            item.id === "dashboard" || item.id === "courses"
                                                ? 'text-danger'
                                                : 'text-secondary'
                                        }`} />
                                        <span className={`${isActive ? 'text-danger fw-semibold' : 'text-dark'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <IoChevronForward className="text-secondary" />
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Mobile drawer for course navigation */}
            <Offcanvas
                show={showCourseNav}
                onHide={() => setShowCourseNav(false)}
                placement="end"
                style={{ width: '250px' }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Course Navigation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CourseNavigation />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
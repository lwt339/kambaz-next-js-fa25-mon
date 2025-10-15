// File: app/(Kambaz)/Navigation.tsx
// Main sidebar navigation with signin protection for Dashboard

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Modal, Alert } from "react-bootstrap";
import { FaRegCircleUser, FaInbox, FaRegStar } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaFlask } from "react-icons/fa";
import { RootState } from "./store";
import { Course, Enrollment } from "./Database/type";

// What each navigation link looks like
interface NavItem {
    id: string;
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
}

// All the main navigation links
const NAV_LINKS: NavItem[] = [
    { id: "account", href: "/Account", label: "Account", Icon: FaRegCircleUser },
    { id: "dashboard", href: "/Dashboard", label: "Dashboard", Icon: AiOutlineDashboard },
    { id: "courses", href: "/Dashboard", label: "Courses", Icon: LiaBookSolid },
    { id: "calendar", href: "/Calendar", label: "Calendar", Icon: IoCalendarOutline },
    { id: "inbox", href: "/Inbox", label: "Inbox", Icon: FaInbox },
    { id: "labs", href: "/Labs", label: "Labs", Icon: FaFlask },
];

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();

    // Track if we're on client side yet
    const [isClient, setIsClient] = useState<boolean>(false);

    // Track modal visibility
    const [showCourseSelector, setShowCourseSelector] = useState<boolean>(false);
    const [showSigninPrompt, setShowSigninPrompt] = useState<boolean>(false);
    const [signinReason, setSigninReason] = useState<string>("");

    // Get data from Redux
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const { courses } = useSelector((state: RootState) => state.coursesReducer);

    // Wait for client-side to avoid hydration issues
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle Dashboard clicks - require signin
    const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!isClient) return;

        if (!currentUser) {
            setSigninReason("You must sign in to access your Dashboard and view your enrolled courses.");
            setShowSigninPrompt(true);
            return;
        }

        router.push("/Dashboard");
    };

    // Handle Courses clicks - require signin and show course selector
    const handleCoursesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!isClient) return;

        if (!currentUser) {
            setSigninReason("You must sign in to access your courses and course materials.");
            setShowSigninPrompt(true);
            return;
        }

        // Get user's enrollments
        const userEnrollments = enrollments.filter(
            (enroll: Enrollment) => enroll.user === currentUser._id
        );

        // No enrollments - send to Dashboard
        if (userEnrollments.length === 0) {
            router.push("/Dashboard");
            return;
        }

        // One course - go directly to it
        if (userEnrollments.length === 1) {
            router.push(`/Courses/${userEnrollments[0].course}/Home`);
            return;
        }

        // Multiple courses - show selector
        setShowCourseSelector(true);
    };

    // Get list of courses user is enrolled in
    const getEnrolledCourses = (): Course[] => {
        if (!currentUser || !isClient) return [];

        const userEnrollments = enrollments.filter(
            (e: Enrollment) => e.user === currentUser._id
        );

        return userEnrollments
            .map((e: Enrollment) => courses.find((c: Course) => c._id === e.course))
            .filter((c): c is Course => c !== undefined);
    };

    // Figure out styling for each nav item
    const getNavItemStyles = (id: string) => {
        const active = id === "courses"
            ? pathname?.includes("/Courses/") || false
            : pathname?.startsWith(NAV_LINKS.find(link => link.id === id)?.href || "") || false;

        return {
            bgColor: active ? "bg-white" : "bg-black",
            textColor: active ? "text-danger" : "text-white",
            iconColor: id === "account"
                ? (active ? "text-danger" : "text-white")
                : "text-danger",
            active
        };
    };

    return (
        <>
            {/* Main Navigation Sidebar */}
            <ListGroup
                id="wd-kambaz-navigation"
                className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
                style={{ width: 110 }}
            >
                {/* NEU Logo */}
                <ListGroupItem
                    as="a"
                    target="_blank"
                    href="https://www.northeastern.edu/"
                    id="wd-neu-link"
                    className="bg-black border-0 text-center"
                >
                    <Image
                        src="/images/NEU.png"
                        width={75}
                        height={75}
                        alt="Northeastern University"
                    />
                </ListGroupItem>

                <br />

                {/* Navigation Links */}
                {NAV_LINKS.map(({ id, href, label, Icon }) => {
                    const { bgColor, textColor, iconColor, active } = getNavItemStyles(id);

                    // Dashboard needs signin protection
                    if (id === "dashboard") {
                        return (
                            <ListGroupItem
                                key={id}
                                className={`${bgColor} border-0 text-center`}
                            >
                                <a
                                    href="#"
                                    id={`wd-${id}-link`}
                                    className={`${textColor} text-decoration-none`}
                                    onClick={handleDashboardClick}
                                    aria-current={active ? "page" : undefined}
                                >
                                    <Icon className={`fs-1 ${iconColor}`} />
                                    <br />
                                    {label}
                                </a>
                            </ListGroupItem>
                        );
                    }

                    // Courses needs special handler
                    if (id === "courses") {
                        return (
                            <ListGroupItem
                                key={id}
                                className={`${bgColor} border-0 text-center`}
                            >
                                <a
                                    href="#"
                                    id={`wd-${id}-link`}
                                    className={`${textColor} text-decoration-none`}
                                    onClick={handleCoursesClick}
                                    aria-current={active ? "page" : undefined}
                                >
                                    <Icon className={`fs-1 ${iconColor}`} />
                                    <br />
                                    {label}
                                </a>
                            </ListGroupItem>
                        );
                    }

                    // Regular links
                    return (
                        <ListGroupItem
                            key={id}
                            className={`${bgColor} border-0 text-center`}
                        >
                            <Link
                                href={href}
                                id={`wd-${id}-link`}
                                className={`${textColor} text-decoration-none`}
                                aria-current={active ? "page" : undefined}
                            >
                                <Icon className={`fs-1 ${iconColor}`} />
                                <br />
                                {label}
                            </Link>
                        </ListGroupItem>
                    );
                })}

                <br />
            </ListGroup>

            {/* Signin Required Modal */}
            <Modal
                show={showSigninPrompt}
                onHide={() => setShowSigninPrompt(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-lock-fill text-warning me-2"></i>
                        Sign In Required
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="info" className="mb-3">
                        <Alert.Heading className="h6">
                            <strong>Authentication Needed</strong>
                        </Alert.Heading>
                        <p className="mb-0">
                            {signinReason}
                        </p>
                    </Alert>
                    <p className="text-muted mb-0">
                        Please sign in with your Kambaz account to continue.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowSigninPrompt(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowSigninPrompt(false);
                            router.push("/Account/Signin?redirect=dashboard");
                        }}
                    >
                        Sign In
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Course Selector Modal */}
            <Modal
                show={showCourseSelector}
                onHide={() => setShowCourseSelector(false)}
                size="xl"
            >
                <Modal.Header closeButton className="border-0 pb-2">
                    <Modal.Title>All Courses</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <table className="table table-hover mb-0">
                        <thead>
                        <tr style={{ fontSize: '0.875rem' }}>
                            <th style={{ width: '60px' }}>Favorite</th>
                            <th>Course</th>
                            <th>Nickname</th>
                            <th>Term</th>
                            <th>Enrolled as</th>
                            <th>Published</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getEnrolledCourses().map((course: Course) => (
                            <tr
                                key={course._id}
                                onClick={() => {
                                    router.push(`/Courses/${course._id}/Home`);
                                    setShowCourseSelector(false);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="text-center align-middle">
                                    <FaRegStar className="text-muted" style={{ fontSize: '1.1rem' }} />
                                </td>
                                <td className="align-middle">
                                    <div className="d-flex align-items-center">
                                        <div
                                            style={{
                                                width: '4px',
                                                height: '35px',
                                                backgroundColor: course.color,
                                                marginRight: '12px',
                                                borderRadius: '2px'
                                            }}
                                        />
                                        <span className="text-danger">
                                                {course.number} {course.name}
                                            </span>
                                    </div>
                                </td>
                                <td className="align-middle"></td>
                                <td className="align-middle">
                                    <small className="text-muted">
                                        {new Date(course.startDate).getFullYear()}{' '}
                                        {new Date(course.startDate).toLocaleDateString('en-US', { month: 'short' })}{' '}
                                        Semester Full Term
                                    </small>
                                </td>
                                <td className="align-middle">{currentUser?.role || 'Student'}</td>
                                <td className="align-middle">Yes</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
}
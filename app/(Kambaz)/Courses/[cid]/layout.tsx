"use client";
import { ReactNode, use, useState } from "react";
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

export default function CourseLayout({
                                         children,
                                         params
                                     }: {
    children: ReactNode,
    params: Promise<{ cid: string }>
}) {
    const { cid } = use(params);
    const pathname = usePathname();

    // offcanvas menus
    const [showKambazNav, setShowKambazNav] = useState(false);
    const [showCourseNav, setShowCourseNav] = useState(false);

    // Canvas-style navigation items
    const canvasNavItems = [
        { id: "dashboard", label: "Dashboard", href: "/Dashboard", icon: AiOutlineDashboard },
        { id: "account", label: "Account", href: "/Account", icon: FaRegCircleUser },
        { id: "courses", label: "Courses", href: `/Courses/${cid}/Home`, icon: LiaBookSolid },
        { id: "groups", label: "Groups", href: "/Groups", icon: HiOutlineUserGroup },
        { id: "calendar", label: "Calendar", href: "/Calendar", icon: IoCalendarOutline },
        { id: "inbox", label: "Inbox", href: "/Inbox", icon: FaInbox },
        { id: "history", label: "History", href: "/History", icon: BiHistory },
        { id: "help", label: "Help", href: "/Help", icon: BiHelpCircle },
    ];

    return (
        <div id="wd-courses">
            {/* menus */}
            <div className="d-flex align-items-center justify-content-between p-2">
                {/* Left top icon */}
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-link text-danger d-md-none p-0 me-3"
                        onClick={() => setShowKambazNav(true)}
                        aria-label="Show main navigation"
                    >
                        <FaAlignJustify className="fs-3" />
                    </button>

                    {/* Course title */}
                    <h2 className="text-danger mb-0">
                        <FaAlignJustify className="me-4 fs-4 mb-1 d-none d-md-inline" />
                        Course {cid}
                    </h2>
                </div>

                {/* Right icon */}
                <button
                    className="btn btn-link text-secondary d-md-none p-0"
                    onClick={() => setShowCourseNav(true)}
                    aria-label="Show course navigation"
                >
                    <FaBars className="fs-4" />
                </button>
            </div>

            <hr />

            <div className="d-flex">
                {/* Course Navigation - Hidden on small screens */}
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>

                {/* Main content area */}
                <div className="flex-fill p-3">
                    {children}
                </div>
            </div>

            {/* Canvas-Style Navigation Offcanvas (mobile) */}
            <Offcanvas
                show={showKambazNav}
                onHide={() => setShowKambazNav(false)}
                placement="start"
                className="canvas-nav-offcanvas"
                style={{ width: '320px' }}
            >
                <Offcanvas.Header className="border-bottom pb-3">
                    {/* Canvas Logo */}
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
                        {canvasNavItems.map((item) => {
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
                                        <item.icon className={`fs-5 me-3 ${item.id === "dashboard" || item.id === "courses" ? 'text-danger' : 'text-secondary'}`} />
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

            {/* Course Navigation Offcanvas (mobile) */}
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
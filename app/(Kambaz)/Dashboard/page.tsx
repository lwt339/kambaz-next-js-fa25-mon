"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
} from "react-bootstrap";
import {
    BsMegaphone,
    BsCardChecklist,
    BsChatDots,
    BsFolder,
    BsThreeDotsVertical,
} from "react-icons/bs";

const COURSE_HOME = "/Courses/5610/Home";

type Course = {
    id: string;
    title: string;
    section: string;
    image: string;
    description: string;
    color: string;
};

const COURSES: Course[] = [
    {
        id: "CS5610",
        title: "CS5610 Web Development",
        section: "CS5610.18616.202610",
        image: "/images/cs5610.jpg",
        description: "Fall 2025 Semester Full Term",
        color: "#e35d86",
    },
    {
        id: "CS5520",
        title: "CS5520 Mobile Application Development",
        section: "CS5520.18606.202610",
        image: "/images/cs5520.jpg",
        description: "Fall 2025 Semester Full Term",
        color: "#FE4E00",
    },
    {
        id: "CS5800",
        title: "CS5800 Algorithms SEC 01",
        section: "CS5800.53170.202550",
        image: "/images/cs5800.jpg",
        description: "Summer Full 2025 Semester",
        color: "#7b3fb9",
    },
    {
        id: "CS5004",
        title: "CS5004 Spring 2025 Boston All Modules",
        section: "CS5004.SP2025.BOSTON.ALL",
        image: "/images/cs5004.jpg",
        description: "Spring 2025 Semester Full Term",
        color: "#2E86AB",
    },
    {
        id: "CS5008",
        title: "CS5008 MERGED Spring 2025",
        section: "CS5008.40215.MERGED.40250",
        image: "/images/cs5008.jpg",
        description: "Spring 2025 Semester Full Term",
        color: "#FF579F",
    },
    {
        id: "CS5001",
        title: "CS 5001 Intensive Foundations of CS",
        section: "CS5001.FALL2024.BOSTON.01",
        image: "/images/cs5001.jpg",
        description: "Fall 2024 Semester Full Term",
        color: "#5D2E46",
    },
    {
        id: "CS5002",
        title: "CS5002 Discrete Structures [Section 02]",
        section: "CS5002.02.FALL2024",
        image: "/images/cs5002.jpg",
        description: "Fall 2024 Semester Full Term",
        color: "#6457A6",
    },
];

export default function Dashboard() {
    const [imgError, setImgError] = useState<Record<string, boolean>>({});
    const onImgErr = (id: string) => setImgError((s) => ({ ...s, [id]: true }));

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({COURSES.length})</h2>
            <hr />

            <div id="wd-dashboard-courses">
                {/*  g-4 (24px) with additional p-1 on columns for 32px tota */}
                <Row xs={1} md={5} className="g-4">
                    {COURSES.map((c) => (
                        <Col
                            key={c.id}
                            className="wd-course-col"
                            style={{
                                width: "270px",  // Fixed width
                                flex: "0 0 auto"
                            }}
                        >
                            {/*24px (g-4) + 8px (p-1) = 32px total */}
                            <div className="p-1">
                                <Card className="h-100 shadow-sm wd-card-translucent">
                                    <Link
                                        href={COURSE_HOME}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        <div className="wd-img-wrap position-relative">
                                            {!imgError[c.id] ? (
                                                <CardImg
                                                    variant="top"
                                                    src={c.image}
                                                    alt={`${c.title} cover`}
                                                    className="wd-card-img"
                                                    onError={() => onImgErr(c.id)}
                                                    style={{ height: "160px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <div
                                                    className="wd-card-img"
                                                    style={{
                                                        backgroundColor: c.color,
                                                        height: "160px"
                                                    }}
                                                />
                                            )}

                                            {/* Color overlay */}
                                            <div
                                                className="position-absolute top-0 start-0 w-100 h-100"
                                                style={{
                                                    backgroundColor: c.color,
                                                    opacity: 0.35,
                                                    mixBlendMode: "multiply",
                                                    pointerEvents: "none"
                                                }}
                                                aria-hidden="true"
                                            />

                                            {/* Bottom gradient for readability */}
                                            <div
                                                className="position-absolute bottom-0 start-0 w-100"
                                                style={{
                                                    height: "52px",
                                                    background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.35) 100%)",
                                                    pointerEvents: "none"
                                                }}
                                                aria-hidden="true"
                                            />

                                            {/* Three dots menu with Bootstrap positioning */}
                                            <BsThreeDotsVertical
                                                className="position-absolute top-0 end-0 m-2 text-white"
                                                size={18}
                                                title="More"
                                            />
                                        </div>

                                        <CardBody className="p-3">
                                            {/* Course title */}
                                            <CardTitle
                                                className="text-nowrap overflow-hidden mb-1"
                                                style={{
                                                    color: c.color,
                                                    textOverflow: "ellipsis"
                                                }}
                                                title={c.title}
                                            >
                                                {c.title}
                                            </CardTitle>

                                            {/* Course section */}
                                            <div
                                                className="text-nowrap overflow-hidden text-muted small mb-2"
                                                style={{ textOverflow: "ellipsis" }}
                                                title={c.section}
                                            >
                                                {c.section}
                                            </div>

                                            {/* Course description */}
                                            <CardText
                                                className="text-secondary small"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    lineHeight: 1.3,
                                                    minHeight: "2.6em"
                                                }}
                                                title={c.description}
                                            >
                                                {c.description}
                                            </CardText>

                                            <Button variant="primary" className="mb-2">Go</Button>

                                            {/* Mini icons using Bootstrap spacing utilities */}
                                            <div
                                                className="d-flex justify-content-between align-items-center px-2 pt-2"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Announcements"
                                                    title="Announcements"
                                                >
                                                    <BsMegaphone />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Assignments"
                                                    title="Assignments"
                                                >
                                                    <BsCardChecklist />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Discussions"
                                                    title="Discussions"
                                                >
                                                    <BsChatDots />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Files"
                                                    title="Files"
                                                >
                                                    <BsFolder />
                                                </button>
                                            </div>
                                        </CardBody>
                                    </Link>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
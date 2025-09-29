"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
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

// Chapter 2: all courses navigate to the SAME course screen
const COURSE_HOME = "/Courses/5610/Home";

type Course = {
    id: string;          // e.g., "CS5610"
    title: string;       // shown in course color
    section: string;     // e.g., "CS5610.18616.202610" (styled #5C6B73)
    image: string;       // path in /public/images
    description: string; // gray blurb
    color: string;       // per-course accent + overlay tint
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
        <div id="wd-dashboard" className="p-3">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({COURSES.length})</h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row
                    xs={1}
                    md={5}
                    className="g-0 wd-dashboard-grid"
                    style={{} as CSSProperties}
                >
                    {COURSES.map((c) => (
                        <Col key={c.id} className="wd-course-col">
                            <Card className="h-100 shadow-sm wd-card-translucent">
                                <Link
                                    href={COURSE_HOME}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    {/* ===== Header image with transparent color overlay ===== */}
                                    <div className="wd-img-wrap">
                                        {!imgError[c.id] ? (
                                            <CardImg
                                                variant="top"
                                                src={c.image}
                                                alt={`${c.title} cover`}
                                                className="wd-card-img"
                                                onError={() => onImgErr(c.id)}
                                            />
                                        ) : (
                                            <div className="wd-card-img" style={{ backgroundColor: c.color }} />
                                        )}

                                        {/* Transparent tint overlay using per-course color */}
                                        <div
                                            className="wd-color-overlay"
                                            style={{ backgroundColor: c.color }}
                                            aria-hidden="true"
                                        />

                                        {/* Optional bottom gradient for contrast */}
                                        <div className="wd-bottom-gradient" aria-hidden="true" />

                                        {/* 3-dots icon above overlays */}
                                        <BsThreeDotsVertical
                                            className="wd-img-actions text-white"
                                            size={18}
                                            title="More"
                                        />
                                    </div>
                                    {/* ======================================================= */}

                                    <CardBody className="wd-card-body">
                                        {/* Title — single line with ellipsis, tinted to course color */}
                                        <CardTitle
                                            className="wd-course-title text-nowrap overflow-hidden"
                                            style={{ color: c.color }}
                                            title={c.title}
                                        >
                                            {c.title}
                                        </CardTitle>

                                        {/* Section/code — single line with ellipsis (color via CSS #5C6B73) */}
                                        <div
                                            className="wd-course-section text-nowrap overflow-hidden"
                                            title={c.section}
                                        >
                                            {c.section}
                                        </div>

                                        {/* Description — gray, 2-line clamp with ellipsis */}
                                        <CardText className="wd-course-desc text-secondary" title={c.description}>
                                            {c.description}
                                        </CardText>

                                        <Button variant="primary" className="mb-2">Go</Button>

                                        {/* Mini icons (gray → red on hover/touch) */}
                                        <div
                                            className="wd-mini-icons d-flex justify-content-between align-items-center px-2 pt-2"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <button type="button" className="icon-btn" aria-label="Announcements" title="Announcements">
                                                <BsMegaphone />
                                            </button>
                                            <button type="button" className="icon-btn" aria-label="Assignments" title="Assignments">
                                                <BsCardChecklist />
                                            </button>
                                            <button type="button" className="icon-btn" aria-label="Discussions" title="Discussions">
                                                <BsChatDots />
                                            </button>
                                            <button type="button" className="icon-btn" aria-label="Files" title="Files">
                                                <BsFolder />
                                            </button>
                                        </div>
                                    </CardBody>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

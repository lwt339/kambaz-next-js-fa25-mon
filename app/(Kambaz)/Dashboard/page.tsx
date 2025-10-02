/**
 * Dashboard Component - Data-Driven Version
 * Location: app/(Kambaz)/Dashboard/page.tsx
 *
 * This dashboard now pulls courses from the database instead of hardcoded data,
 * while maintaining all your beautiful styling and mini icons.
 *
 * Changes from your original:
 * - Imports courses from Database
 * - Maps course._id to match database structure
 * - Keeps all your styling, colors, and mini icons
 * - Uses course._id for navigation URLs
 */

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
// Import courses from database
import * as db from "../Database";

/**
 * Course type definition
 * Matches the structure needed for display
 */
type Course = {
    _id: string;          // Database ID (e.g., "RS101", "CS5610")
    name: string;         // Course name
    number: string;       // Course number
    description: string;  // Course description
    image: string;        // Image path
    color: string;        // Theme color for overlay
};

export default function Dashboard() {
    /**
     * Get courses from database and add display properties
     *
     * We map through the database courses and add:
     * - image: Path to course image
     * - color: Theme color for each course
     */
    const courses: Course[] = db.courses.map((course) => {
        // Map course IDs to appropriate images and colors
        let image = "/images/reactjs.jpg";  // Default image
        let color = "#e35d86";              // Default color

        // Assign specific images and colors based on course ID
        switch (course._id) {
            case "RS101":
                image = "/images/RS4550.png";
                color = "#dc3545";
                break;
            case "RS102":
                image = "/images/rs4560.png";
                color = "#0dcaf0";
                break;
            case "RS103":
                image = "/images/rs4570.png";
                color = "#6c757d";
                break;
            case "CS5610":
                image = "/images/cs5610.png";
                color = "#e35d86";
                break;
            case "CS5520":
                image = "/images/cs5520.png";
                color = "#FE4E00";  // Orange for Mobile
                break;
            case "CS5800":
                image = "/images/cs5800.png";
                color = "#7b3fb9";  // Purple for Algorithms
                break;
            case "CS5004":
                image = "/images/cs5004.png";
                color = "#2E86AB";  // Blue for OOD
                break;
            case "CS5008":
                image = "/images/cs5008.png";
                color = "#FF579F";  // Pink for Data Structures
                break;
            case "CS5001":
                image = "/images/cs5001.png";
                color = "#5D2E46";  // Dark purple for Foundations
                break;
            case "CS5002":
                image = "/images/cs5002.png";
                color = "#6457A6";  // Purple for Discrete
                break;
            default:
                image = "/images/reactjs.jpg";
                color = "#e35d86";
        }

        return {
            ...course,
            image,
            color,
        };
    });

    /**
     * State for tracking image loading errors
     * If an image fails to load, we show a colored div instead
     */
    const [imgError, setImgError] = useState<Record<string, boolean>>({});
    const onImgErr = (id: string) => setImgError((s) => ({...s, [id]: true}));

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>

            {/*
              Dynamic course count
              Shows the actual number of courses from the database
            */}
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>
            <hr/>

            <div id="wd-dashboard-courses">
                {/* Grid layout with 24px gaps (g-4) */}
                <Row xs={1} md={5} className="g-4">
                    {courses.map((c) => (
                        <Col
                            key={c._id}  // Use database ID as key
                            className="wd-course-col"
                            style={{
                                width: "270px",
                                flex: "0 0 auto"
                            }}
                        >
                            <div className="p-1">
                                <Card className="h-100 shadow-sm wd-card-translucent">
                                    {/*
                                      Link to course Home page
                                      Uses course._id to create dynamic URL
                                      Example: /Courses/RS101/Home
                                    */}
                                    <Link
                                        href={`/Courses/${c._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        {/* Course Image Section */}
                                        <div className="wd-img-wrap position-relative">
                                            {/* Show image if not errored, otherwise show colored div */}
                                            {!imgError[c._id] ? (
                                                <CardImg
                                                    variant="top"
                                                    src={c.image}
                                                    alt={`${c.name} cover`}
                                                    className="wd-card-img"
                                                    onError={() => onImgErr(c._id)}
                                                    style={{height: "160px", objectFit: "cover"}}
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

                                            {/* Color overlay for visual appeal */}
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

                                            {/* Three dots menu */}
                                            <BsThreeDotsVertical
                                                className="position-absolute top-0 end-0 m-2 text-white"
                                                size={18}
                                                title="More"
                                            />
                                        </div>

                                        <CardBody className="p-3">
                                            {/*
                                              Course Title
                                              Uses c.name from database
                                            */}
                                            <CardTitle
                                                className="text-nowrap overflow-hidden mb-1"
                                                style={{
                                                    color: c.color,
                                                    textOverflow: "ellipsis"
                                                }}
                                                title={c.name}
                                            >
                                                {c.name}
                                            </CardTitle>

                                            {/*
                                              Course Number
                                              Uses c.number from database
                                            */}
                                            <div
                                                className="text-nowrap overflow-hidden text-muted small mb-2"
                                                style={{textOverflow: "ellipsis"}}
                                                title={c.number}
                                            >
                                                {c.number}
                                            </div>

                                            {/*
                                              Course Description
                                              Uses c.description from database
                                            */}
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

                                            <Button variant="primary" className="mb-2">
                                                Go
                                            </Button>

                                            {/*
                                              Mini Icons Row
                                              Your beautiful icon row is preserved!
                                            */}
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
                                                    <BsMegaphone/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Assignments"
                                                    title="Assignments"
                                                >
                                                    <BsCardChecklist/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Discussions"
                                                    title="Discussions"
                                                >
                                                    <BsChatDots/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-1 text-muted"
                                                    aria-label="Files"
                                                    title="Files"
                                                >
                                                    <BsFolder/>
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

"use client";
import { Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import { FaFileAlt, FaClipboardList, FaChartLine } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Dashboard() {
    const courses = [
        {
            id: "CS5001",
            name: "CS5001 Intensive Foundations",
            section: "01",
            semester: "Fall 2024",
            color: "#dc3545", // red
            image: "/images/cs5001.jpg" // Using placeholder image
        },
        {
            id: "CS5002",
            name: "CS5002 Discrete Structures",
            section: "01",
            semester: "Fall 2024",
            color: "#0d6efd", // blue
            image: "/images/cs5002.jpg" // Using placeholder image
        },
        {
            id: "CS5004",
            name: "CS5004 Object-Oriented Design",
            section: "02",
            semester: "Spring 2025",
            color: "#198754", // green
            image: "/images/cs5004.jpg" // Using placeholder image
        },
        {
            id: "CS5008",
            name: "CS5008 Data Structures & Algorithms",
            section: "01",
            semester: "Spring 2025",
            color: "#ffc107", // yellow
            image: "/images/cs5008.jpg" // Using placeholder image
        },
        {
            id: "CS5800",
            name: "CS5800 Algorithms",
            section: "03",
            semester: "Fall 2025",
            color: "#6f42c1", // purple
            image: "/images/cs5800.jpg" // Using placeholder image
        },
        {
            id: "CS5520",
            name: "CS5520 Mobile App Development",
            section: "03",
            semester: "Fall 2025",
            color: "#fd7e14", // orange
            image: "/images/cs5520.jpg" // Using placeholder image
        },
        {
            id: "CS5610",
            name: "CS5610 Web Development",
            section: "04",
            semester: "Fall 2025",
            color: "#20c997", // teal
            image: "/images/cs5610.jpg" // Using placeholder image
        }
    ];

    return (
        <div className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />

            <Row id="wd-dashboard-courses" className="g-4">
                {courses.map((course) => (
                    <Col key={course.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="wd-course-card h-100 shadow-sm">
                            {/* Course Image with Color Overlay */}
                            <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                                {/* Background Image */}
                                <div
                                    style={{
                                        backgroundImage: `url(${course.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "100%",
                                        width: "100%",
                                        position: "absolute"
                                    }}
                                />
                                {/* Color Overlay */}
                                <div
                                    style={{
                                        backgroundColor: course.color,
                                        opacity: 0.7,
                                        height: "100%",
                                        width: "100%",
                                        position: "absolute"
                                    }}
                                />
                                {/* Three Dots Menu */}
                                <BsThreeDotsVertical
                                    className="text-white position-absolute"
                                    style={{ top: 10, right: 10, fontSize: "1.5rem", cursor: "pointer", zIndex: 10 }}
                                />
                            </div>

                            <Card.Body className="d-flex flex-column">
                                <Link
                                    href={`/Courses/${course.id}/Home`}
                                    className="text-decoration-none text-dark"
                                >
                                    <Card.Title className="fw-bold" style={{ minHeight: "48px" }}>
                                        {course.name}
                                    </Card.Title>
                                </Link>

                                <Card.Text className="text-muted small mb-3">
                                    {course.id}.{course.section} | {course.semester}
                                </Card.Text>

                                {/* Icons Row */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex gap-3">
                                        <Link
                                            href={`/Courses/${course.id}/Assignments`}
                                            className="text-muted"
                                            title="Assignments"
                                        >
                                            <FaClipboardList size={20} />
                                        </Link>
                                        <Link
                                            href={`/Courses/${course.id}/Modules`}
                                            className="text-muted"
                                            title="Modules"
                                        >
                                            <FaFileAlt size={20} />
                                        </Link>
                                        <Link
                                            href={`/Courses/${course.id}/Grades`}
                                            className="text-muted"
                                            title="Grades"
                                        >
                                            <FaChartLine size={20} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Go Button */}
                                <Link
                                    href={`/Courses/${course.id}/Home`}
                                    className="btn btn-primary btn-sm mt-auto"
                                >
                                    Go →
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
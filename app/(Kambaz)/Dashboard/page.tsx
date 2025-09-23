"use client";
import Link from "next/link";
import { Card, CardBody, CardText, CardTitle, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
    // REQUIRED: At least 7 courses
    const courses = [
        {
            id: "CS5610",
            name: "Web Development",
            semester: "Summer 2 2024",
            color: "#0073e6",
            description: "Full Stack software development with MERN stack"
        },
        {
            id: "CS5200",
            name: "Database Management Systems",
            semester: "Summer 2 2024",
            color: "#28a745",
            description: "Relational databases and SQL programming"
        },
        {
            id: "CS5800",
            name: "Algorithms",
            semester: "Summer 2 2024",
            color: "#dc3545",
            description: "Advanced algorithms and data structures"
        },
        {
            id: "CS5520",
            name: "Mobile Application Development",
            semester: "Fall 2024",
            color: "#ffc107",
            description: "Mobile phone or related platform"
        },
        {
            id: "CS5150",
            name: "Game Artificial Intelligence",
            semester: "Fall 2024",
            color: "#17a2b8",
            description: "Classical and modern approaches to artificial intelligence in digital games"
        },
        {
            id: "CS5600",
            name: "Computer Systems",
            semester: "Fall 2024",
            color: "#6610f2",
            description: "Structure, components, design, implementation, and internal operation of computer systems"
        },
        {
            id: "CS6510",
            name: "Advanced Software Development",
            semester: "Spring 2025",
            color: "#e83e8c",
            description: "Academic concepts and practical experience of software design"
        },
    ];

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />

            {/* Course Cards Grid - Responsive */}
            <Row id="wd-dashboard-courses" className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                {courses.map((course) => (
                    <Col key={course.id} className="wd-dashboard-course mb-4">
                        <Card style={{ width: "270px" }}>
                            <Link
                                href={`/Courses/${course.id}/Home`}
                                className="text-decoration-none text-dark">
                                {/* Colored top section - REQUIRED */}
                                <div style={{
                                    height: "160px",
                                    backgroundColor: course.color,
                                    borderTopLeftRadius: "0.375rem",
                                    borderTopRightRadius: "0.375rem"
                                }}></div>

                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title">
                                        {course.id} {course.name}
                                    </CardTitle>
                                    <CardText className="wd-dashboard-course-semester text-muted">
                                        {course.semester}
                                    </CardText>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}>
                                        {course.description}
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
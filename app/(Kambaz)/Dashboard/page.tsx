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
import * as db from "../Database";
import "./dashboard.css";

type Course = {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    instructor: string;
    description: string;
    image: string;
    color: string;
};

export default function Dashboard() {
    const courses = db.courses as Course[];
    const [imgError, setImgError] = useState<Record<string, boolean>>({});
    const onImgErr = (id: string) => setImgError((s) => ({...s, [id]: true}));

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>

            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>
            <hr/>

            <div id="wd-dashboard-courses">
                <Row className="wd-courses-row">
                    {courses.map((course: Course) => (
                        <Col key={course._id} className="wd-course-col">
                            <div className="wd-card-wrapper">
                                <Card className="wd-course-card">
                                    <Link
                                        href={`/Courses/${course._id}/Home`}
                                        className="wd-course-link"
                                    >
                                        {/* COURSE IMAGE */}
                                        <div className="wd-img-wrap">
                                            {!imgError[course._id] ? (
                                                <CardImg
                                                    variant="top"
                                                    src={course.image}
                                                    alt={`${course.name} cover`}
                                                    className="wd-card-img"
                                                    onError={() => onImgErr(course._id)}
                                                />
                                            ) : (
                                                <div
                                                    className="wd-card-img wd-img-fallback"
                                                    style={{ backgroundColor: course.color }}
                                                />
                                            )}

                                            {/* Color overlay */}
                                            <div
                                                className="wd-color-overlay"
                                                style={{ backgroundColor: course.color }}
                                            />

                                            {/* Bottom gradient */}
                                            <div className="wd-gradient-overlay" />

                                            {/* Three dots menu */}
                                            <BsThreeDotsVertical className="wd-menu-icon" />
                                        </div>

                                        {/* CARD BODY */}
                                        <CardBody className="wd-card-body">
                                            {/* Course Name */}
                                            <CardTitle
                                                className="wd-course-title"
                                                style={{ color: course.color }}
                                                title={course.name}
                                            >
                                                {course.name}
                                            </CardTitle>

                                            {/* Course Number */}
                                            <div
                                                className="wd-course-number"
                                                title={course.number}
                                            >
                                                {course.number}
                                            </div>

                                            {/* Course Description */}
                                            <CardText
                                                className="wd-course-description"
                                                title={course.description}
                                            >
                                                {course.description}
                                            </CardText>

                                            {/* Instructor */}
                                            <div
                                                className="wd-course-instructor"
                                                title={course.instructor ? `Instructor: ${course.instructor}` : ""}
                                            >
                                                {course.instructor && (
                                                    <>
                                                        <strong>Instructor:</strong> {course.instructor}
                                                    </>
                                                )}
                                            </div>

                                            {/* Spacer */}
                                            <div className="wd-spacer" />

                                            {/* Go Button */}
                                            <Button variant="primary" className="wd-go-button">
                                                Go to Course
                                            </Button>

                                            {/* Mini Icons */}
                                            <div
                                                className="wd-mini-icons"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <button
                                                    type="button"
                                                    className="wd-icon-btn"
                                                    aria-label="Announcements"
                                                    title="Announcements"
                                                >
                                                    <BsMegaphone/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="wd-icon-btn"
                                                    aria-label="Assignments"
                                                    title="Assignments"
                                                >
                                                    <BsCardChecklist/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="wd-icon-btn"
                                                    aria-label="Discussions"
                                                    title="Discussions"
                                                >
                                                    <BsChatDots/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="wd-icon-btn"
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
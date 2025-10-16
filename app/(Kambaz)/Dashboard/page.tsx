// File: app/(Kambaz)/Dashboard/page.tsx
// Dashboard showing course cards with enrollment controls and CRUD operations

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
    FormControl,
    FormLabel,
    Form,
    Collapse
} from "react-bootstrap";
import {
    BsMegaphone,
    BsCardChecklist,
    BsChatDots,
    BsFolder,
    BsThreeDotsVertical,
    BsChevronDown,
    BsChevronUp
} from "react-icons/bs";
import { Course, Enrollment } from "../Database/type";
import { addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "../Enrollments/reducer";
import { RootState, AppDispatch } from "../store";
import "./dashboard.css";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Get all data from Redux
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

    // Track which view we're in (enrolled courses vs all courses)
    const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

    // Track if advanced course fields are visible
    const [showAdvancedFields, setShowAdvancedFields] = useState<boolean>(false);

    // Track if admin has been auto-enrolled yet
    const [adminEnrolled, setAdminEnrolled] = useState<boolean>(false);

    // Form data for creating/editing courses
    const [course, setCourse] = useState<Course>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        department: "Computer Science",
        credits: 4,
        instructor: "Staff",
        description: "New Description",
        image: "/images/cs5150.jpg",
        color: "#dc3545"
    });

    // Track which images failed to load
    const [imgError, setImgError] = useState<Record<string, boolean>>({});
    const onImgErr = (id: string) => setImgError((prev) => ({ ...prev, [id]: true }));

    // Redirect to signin if nobody's logged in
    useEffect(() => {
        if (!currentUser) {
            router.push("/Account/Signin");
        }
    }, [currentUser, router]);

    // Auto-enroll admins in all courses when they sign in
    useEffect(() => {
        if (!currentUser || currentUser.role !== "ADMIN" || adminEnrolled) return;

        courses.forEach((c: Course) => {
            const alreadyEnrolled = enrollments.some(
                (e: Enrollment) => e.user === currentUser._id && e.course === c._id
            );
            if (!alreadyEnrolled) {
                dispatch(enrollUser({ userId: currentUser._id, courseId: c._id }));
            }
        });

        setAdminEnrolled(true);
    }, [currentUser, courses, enrollments, dispatch, adminEnrolled]);

    // Show loading while checking authentication
    if (!currentUser) {
        return (
            <div className="p-4 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Checking authentication...</span>
                </div>
                <p className="mt-3 text-muted">Redirecting to sign in...</p>
            </div>
        );
    }

    // Check if user is enrolled in a course
    const isEnrolled = (courseId: string): boolean => {
        if (!currentUser) return false;
        return enrollments.some(
            (e: Enrollment) => e.user === currentUser._id && e.course === courseId
        );
    };

    // Add new course and enroll the creator
    const handleAddNewCourse = () => {
        const newCourseId = uuidv4();
        const newCourse: Course = { ...course, _id: newCourseId };

        dispatch(addCourse(newCourse));

        // Auto-enroll whoever created it
        if (currentUser) {
            dispatch(enrollUser({ userId: currentUser._id, courseId: newCourseId }));
        }

        // Reset form to defaults
        setCourse({
            _id: "0",
            name: "New Course",
            number: "New Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            department: "Computer Science",
            credits: 4,
            instructor: "Staff",
            description: "New Description",
            image: "/images/reactjs.jpg",
            color: "#dc3545"
        });
    };

    // Save changes to existing course
    const handleUpdateCourse = () => {
        if (course._id === "0") return;
        dispatch(updateCourse(course));
    };

    // Delete a course
    const handleDeleteCourse = (courseId: string) => {
        dispatch(deleteCourse(courseId));
    };

    // Enroll user in course
    const handleEnroll = (courseId: string) => {
        if (!currentUser) return;
        dispatch(enrollUser({ userId: currentUser._id, courseId }));
    };

    // Unenroll user from course
    const handleUnenroll = (courseId: string) => {
        if (!currentUser) return;
        dispatch(unenrollUser({ userId: currentUser._id, courseId }));
    };

    // Filter courses based on toggle
    const displayedCourses = showAllCourses
        ? courses
        : courses.filter((c: Course) => isEnrolled(c._id));

    // Check if user can edit courses
    const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            {/* Course creation form - faculty and admin only */}
            {canEdit && (
                <>
                    <h5>
                        New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={handleAddNewCourse}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-warning float-end me-2"
                            id="wd-update-course-click"
                            onClick={handleUpdateCourse}
                            disabled={course._id === "0"}
                        >
                            Update
                        </button>
                    </h5>
                    <br />

                    {/* Main course fields */}
                    <FormControl
                        value={course.name}
                        className="mb-2"
                        placeholder="Course Name"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        onFocus={(e) => e.target.select()}
                    />

                    <FormControl
                        value={course.number}
                        className="mb-2"
                        placeholder="Course Number"
                        onChange={(e) => setCourse({ ...course, number: e.target.value })}
                        onFocus={(e) => e.target.select()}
                    />

                    <FormControl
                        as="textarea"
                        value={course.description}
                        rows={3}
                        className="mb-2"
                        placeholder="Course Description"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        onFocus={(e) => e.target.select()}
                    />

                    {/* Toggle for additional fields */}
                    <div className="wd-advanced-toggle mb-3">
                        <Button
                            variant="link"
                            className="p-0 text-decoration-none"
                            onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                        >
                            {showAdvancedFields ? <BsChevronUp /> : <BsChevronDown />}
                            {' '}
                            {showAdvancedFields ? 'Hide' : 'Show'} Additional Course Details
                        </Button>
                    </div>

                    {/* Collapsible advanced fields */}
                    <Collapse in={showAdvancedFields}>
                        <div className="wd-advanced-fields">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="wd-course-instructor">
                                            Instructor
                                        </FormLabel>
                                        <FormControl
                                            id="wd-course-instructor"
                                            type="text"
                                            value={course.instructor}
                                            placeholder="e.g., Prof. John Smith"
                                            onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="wd-course-department">
                                            Department
                                        </FormLabel>
                                        <FormControl
                                            id="wd-course-department"
                                            type="text"
                                            value={course.department}
                                            placeholder="e.g., Computer Science"
                                            onChange={(e) => setCourse({ ...course, department: e.target.value })}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="wd-course-credits">
                                            Credits
                                        </FormLabel>
                                        <FormControl
                                            id="wd-course-credits"
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={course.credits}
                                            onChange={(e) => setCourse({ ...course, credits: parseInt(e.target.value) || 0 })}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="wd-course-start-date">
                                            Start Date
                                        </FormLabel>
                                        <FormControl
                                            id="wd-course-start-date"
                                            type="date"
                                            value={course.startDate}
                                            onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="wd-course-end-date">
                                            End Date
                                        </FormLabel>
                                        <FormControl
                                            id="wd-course-end-date"
                                            type="date"
                                            value={course.endDate}
                                            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <FormLabel htmlFor="wd-course-image">
                                                    Image URL
                                                </FormLabel>
                                                <FormControl
                                                    id="wd-course-image"
                                                    type="text"
                                                    value={course.image}
                                                    placeholder="/images/..."
                                                    onChange={(e) => setCourse({ ...course, image: e.target.value })}
                                                    onFocus={(e) => e.target.select()}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <FormLabel htmlFor="wd-course-color">
                                                    Color
                                                </FormLabel>
                                                <div className="d-flex gap-2">
                                                    <FormControl
                                                        id="wd-course-color"
                                                        type="color"
                                                        value={course.color}
                                                        onChange={(e) => setCourse({ ...course, color: e.target.value })}
                                                        className="wd-color-picker"
                                                    />
                                                    <FormControl
                                                        type="text"
                                                        value={course.color}
                                                        placeholder="#dc3545"
                                                        onChange={(e) => setCourse({ ...course, color: e.target.value })}
                                                        onFocus={(e) => e.target.select()}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Collapse>

                    <hr />
                </>
            )}

            {/* Header with enrollment toggle */}
            <div className="d-flex justify-content-between align-items-center">
                <h2 id="wd-dashboard-published">
                    {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
                </h2>

                <Button
                    variant="primary"
                    id="wd-enrollments-btn"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                >
                    {showAllCourses ? "Show My Courses" : "Show All Courses"}
                </Button>
            </div>
            <hr />

            {/* Course cards grid */}
            <div id="wd-dashboard-courses">
                <Row className="wd-courses-row">
                    {displayedCourses.map((courseItem: Course) => {
                        const enrolled = isEnrolled(courseItem._id);

                        return (
                            <Col key={courseItem._id} className="wd-course-col">
                                <div className="wd-card-wrapper">
                                    <Card className="wd-course-card">
                                        <Link
                                            href={`/Courses/${courseItem._id}/Home`}
                                            className="wd-course-link"
                                        >
                                            {/* Course image */}
                                            <div className="wd-img-wrap">
                                                {!imgError[courseItem._id] ? (
                                                    <CardImg
                                                        variant="top"
                                                        src={courseItem.image}
                                                        alt={`${courseItem.name} cover`}
                                                        className="wd-card-img"
                                                        onError={() => onImgErr(courseItem._id)}
                                                    />
                                                ) : (
                                                    <div
                                                        className="wd-card-img wd-img-fallback"
                                                        style={{ backgroundColor: courseItem.color }}
                                                    />
                                                )}

                                                <div
                                                    className="wd-color-overlay"
                                                    style={{ backgroundColor: courseItem.color }}
                                                />
                                                <div className="wd-gradient-overlay" />
                                                <BsThreeDotsVertical className="wd-menu-icon" />
                                            </div>

                                            {/* Course info */}
                                            <CardBody className="wd-card-body">
                                                <CardTitle
                                                    className="wd-course-title"
                                                    style={{ color: courseItem.color }}
                                                    title={courseItem.name}
                                                >
                                                    {courseItem.name}
                                                </CardTitle>

                                                <div className="wd-course-number">
                                                    {courseItem.number}
                                                </div>

                                                <CardText className="wd-course-description">
                                                    {courseItem.description}
                                                </CardText>

                                                <div className="wd-course-instructor">
                                                    {courseItem.instructor && (
                                                        <>
                                                            <strong>Instructor:</strong> {courseItem.instructor}
                                                        </>
                                                    )}
                                                </div>

                                                <div className="wd-spacer" />

                                                {/* Action buttons */}
                                                <div className="wd-action-buttons">
                                                    <Button
                                                        variant="primary"
                                                        className="wd-go-button"
                                                    >
                                                        Go
                                                    </Button>

                                                    {/* Enroll/unenroll buttons in "All Courses" view */}
                                                    {showAllCourses && (
                                                        enrolled ? (
                                                            <Button
                                                                variant="danger"
                                                                className="wd-unenroll-button"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    handleUnenroll(courseItem._id);
                                                                }}
                                                            >
                                                                Unenroll
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="success"
                                                                className="wd-enroll-button"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    handleEnroll(courseItem._id);
                                                                }}
                                                            >
                                                                Enroll
                                                            </Button>
                                                        )
                                                    )}

                                                    {/* Edit/delete buttons in "My Courses" view for faculty */}
                                                    {!showAllCourses && canEdit && (
                                                        <>
                                                            <Button
                                                                variant="warning"
                                                                className="wd-edit-button"
                                                                id="wd-edit-course-click"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    setCourse(courseItem);
                                                                    setShowAdvancedFields(true);
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>

                                                            <Button
                                                                variant="danger"
                                                                className="wd-delete-button"
                                                                id="wd-delete-course-click"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    handleDeleteCourse(courseItem._id);
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Bottom icon toolbar */}
                                                <div
                                                    className="wd-mini-icons"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <button className="wd-icon-btn">
                                                        <BsMegaphone/>
                                                        <span className="wd-icon-label">Announcements</span>
                                                    </button>
                                                    <button className="wd-icon-btn">
                                                        <BsCardChecklist/>
                                                        <span className="wd-icon-label">Tasks</span>
                                                    </button>
                                                    <button className="wd-icon-btn">
                                                        <BsChatDots/>
                                                        <span className="wd-icon-label">Discussions</span>
                                                    </button>
                                                    <button className="wd-icon-btn">
                                                        <BsFolder/>
                                                        <span className="wd-icon-label">Files</span>
                                                    </button>
                                                </div>
                                            </CardBody>
                                        </Link>
                                    </Card>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}
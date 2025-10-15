// File: app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
// Main assignments page showing all assignments, quizzes, exams, and projects

"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, InputGroup, Form, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaCaretRight, FaRegFileAlt, FaSearch, FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { IconType } from "react-icons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog";
import AssignmentGroupEditor from "./AssignmentGroupEditor";
import { deleteAssignment } from "./reducer";
import { deleteQuiz } from "../Quizzes/reducer";
import { deleteExam } from "../Exams/reducer";
import * as db from "../../../Database";
import { Assignment, Quiz, Exam, GradingWeights } from "../../../Database/type";
import { RootState, AppDispatch } from "../../../store";
import "./assignments.css";

// Types for the four main sections
type SectionKey = "ASSIGNMENTS" | "QUIZZES" | "EXAMS" | "PROJECTS";

// When we combine different item types for display
interface ItemWithType {
    item: Assignment | Quiz | Exam;
    type: string;
    icon: IconType;
}

// What we're deleting
interface DeleteItem {
    item: Assignment | Quiz | Exam;
    type: string;
}

export default function Assignments() {
    const params = useParams();
    const cid = params?.cid as string;
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Get everything we need from Redux
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { exams } = useSelector((state: RootState) => state.examsReducer);

    // Get grading weights for this course
    const typedGradingWeights = db.gradingWeights as GradingWeights[];
    const courseWeights = typedGradingWeights.find((w: GradingWeights) => w.course === cid);
    const weights = courseWeights?.weights || { ASSIGNMENTS: 40, QUIZZES: 10, EXAMS: 20, PROJECTS: 30 };

    // Track UI state
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [viewMode, setViewMode] = useState<"date" | "type">("type");
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null);
    const [showGroupDialog, setShowGroupDialog] = useState<boolean>(false);
    const [upcomingOpen, setUpcomingOpen] = useState<boolean>(true);
    const [pastOpen, setPastOpen] = useState<boolean>(false);

    // Filter items for this course
    const courseAssignments = assignments.filter(
        (a: Assignment) => a.course === cid && a.assignmentType === "ASSIGNMENT"
    );
    const courseQuizzes = quizzes.filter((q: Quiz) => q.course === cid);
    const courseExams = exams.filter((e: Exam) => e.course === cid);
    const courseProjects = assignments.filter(
        (p: Assignment) => p.course === cid && p.assignmentType === "PROJECTS"
    );

    // Filter by search term
    const filterBySearch = <T extends { title: string }>(items: T[]): T[] => {
        if (!searchTerm.trim()) return items;
        return items.filter((item: T) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredAssignments = filterBySearch(courseAssignments);
    const filteredQuizzes = filterBySearch(courseQuizzes);
    const filteredExams = filterBySearch(courseExams);
    const filteredProjects = filterBySearch(courseProjects);

    // Track which sections are open/closed
    const [open, setOpen] = useState<Record<SectionKey, boolean>>({
        ASSIGNMENTS: true,
        QUIZZES: true,
        EXAMS: true,
        PROJECTS: true
    });

    const toggle = (key: SectionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));

    // Check if user can edit (Faculty, Admin, or TA)
    const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";

    // Navigation handlers
    const handleAddAssignment = () => router.push(`/Courses/${cid}/Assignments/new`);
    const handleAddQuiz = () => router.push(`/Courses/${cid}/Quizzes/new`);
    const handleAddExam = () => router.push(`/Courses/${cid}/Exams/new`);
    const handleAddProject = () => router.push(`/Courses/${cid}/Assignments/new?type=PROJECTS`);

    // Edit handlers
    const handleEditAssignment = (assignmentId: string) => {
        router.push(`/Courses/${cid}/Assignments/${assignmentId}`);
    };

    const handleEditQuiz = (quizId: string) => {
        router.push(`/Courses/${cid}/Quizzes/${quizId}`);
    };

    const handleEditExam = (examId: string) => {
        router.push(`/Courses/${cid}/Exams/${examId}`);
    };

    // Delete handlers
    const handleDeleteClick = (assignment: Assignment) => {
        setItemToDelete({ item: assignment, type: 'Assignment' });
        setShowDeleteDialog(true);
    };

    const handleDeleteQuiz = (quiz: Quiz) => {
        setItemToDelete({ item: quiz, type: 'Quiz' });
        setShowDeleteDialog(true);
    };

    const handleDeleteExam = (exam: Exam) => {
        setItemToDelete({ item: exam, type: 'Exam' });
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;
        const { item, type } = itemToDelete;

        if (type === 'Assignment' || type === 'Project') {
            dispatch(deleteAssignment(item._id));
        } else if (type === 'Quiz') {
            dispatch(deleteQuiz(item._id));
        } else if (type === 'Exam') {
            dispatch(deleteExam(item._id));
        }

        setShowDeleteDialog(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
        setItemToDelete(null);
    };

    const handleCreateGroup = (groupName: string, percentage: number) => {
        alert(`Created group: ${groupName} (${percentage}%)`);
    };

    // Date formatting helpers
    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } catch {
            return "";
        }
    };

    const formatTime = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        } catch {
            return "";
        }
    };

    const formatFullDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return "";
        }
    };

    // Organize items by date for date view
    const getAllItemsByDate = (): { upcoming: ItemWithType[], past: ItemWithType[] } => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const allItems: ItemWithType[] = [
            ...filteredAssignments.map(a => ({ item: a, type: 'Assignment', icon: MdAssignment })),
            ...filteredQuizzes.map(q => ({ item: q, type: 'Quiz', icon: GrNotes })),
            ...filteredExams.map(e => ({ item: e, type: 'Exam', icon: FaRegFileAlt })),
            ...filteredProjects.map(p => ({ item: p, type: 'Project', icon: PiProjectorScreenChartBold }))
        ];

        allItems.sort((a, b) => new Date(a.item.dueDate).getTime() - new Date(b.item.dueDate).getTime());

        const upcoming = allItems.filter(item => new Date(item.item.dueDate) >= now);
        const past = allItems.filter(item => new Date(item.item.dueDate) < now);

        return { upcoming, past };
    };

    // Section header component
    interface SectionHeaderProps {
        label: string;
        percentage: string;
        isOpen: boolean;
        onToggle: () => void;
        onAdd?: () => void;
        count?: number;
    }

    const SectionHeader = (props: SectionHeaderProps) => (
        <div className="wd-section-header">
            <BsGripVertical className="wd-grip-icon" onClick={props.onToggle} />
            <span onClick={props.onToggle} style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}>
                {props.isOpen ? <FaCaretDown className="wd-caret-icon" /> : <FaCaretRight className="wd-caret-icon" />}
                <span className="wd-section-label">{props.label}{props.count !== undefined && ` (${props.count})`}</span>
            </span>
            <span className="wd-percentage-badge" onClick={props.onToggle}>{props.percentage} of Total</span>

            {canEdit && props.onAdd && (
                <span
                    className="wd-add-icon"
                    onClick={() => props.onAdd!()}
                    style={{ cursor: 'pointer' }}
                    title={`Add new ${props.label.toLowerCase()}`}
                >
                    <FaPlus />
                </span>
            )}

            <IoEllipsisVertical className="wd-ellipsis-icon" onClick={props.onToggle} />
        </div>
    );

    // Row components for each type
    const AssignmentRow = (a: Assignment) => (
        <li key={a._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <MdAssignment className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link href={`/Courses/${cid}/Assignments/${a._id}`} className="wd-item-title">{a.title}</Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        {a.availableDate && <span> | <strong>Not available until</strong> {formatDate(a.availableDate)} at {formatTime(a.availableDate)}</span>}
                        <br /><strong>Due</strong> {formatDate(a.dueDate)} at {formatTime(a.dueDate)} | {a.points} pts
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons
                        assignmentId={a._id}
                        onEdit={canEdit ? () => handleEditAssignment(a._id) : undefined}
                        onDelete={canEdit ? () => handleDeleteClick(a) : undefined}
                    />
                </div>
            </div>
        </li>
    );

    const QuizRow = (q: Quiz) => (
        <li key={q._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <GrNotes className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link href={`/Courses/${cid}/Quizzes/${q._id}`} className="wd-item-title">{q.title}</Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(q.availableDate)} at {formatTime(q.availableDate)}</span>
                        <br /><strong>Due</strong> {formatDate(q.dueDate)} at {formatTime(q.dueDate)} | {q.points} pts | {q.questions} Questions | {q.timeLimit} Minutes
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons
                        assignmentId={q._id}
                        onEdit={canEdit ? () => handleEditQuiz(q._id) : undefined}
                        onDelete={canEdit ? () => handleDeleteQuiz(q) : undefined}
                    />
                </div>
            </div>
        </li>
    );

    const ExamRow = (e: Exam) => (
        <li key={e._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <FaRegFileAlt className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link href={`/Courses/${cid}/Exams/${e._id}`} className="wd-item-title">{e.title}</Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(e.availableDate)} at {formatTime(e.availableDate)}</span>
                        <br /><strong>Due</strong> {formatDate(e.dueDate)} at {formatTime(e.dueDate)} | {e.points} pts | {e.questions} Questions | {e.timeLimit} Minutes
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons
                        assignmentId={e._id}
                        onEdit={canEdit ? () => handleEditExam(e._id) : undefined}
                        onDelete={canEdit ? () => handleDeleteExam(e) : undefined}
                    />
                </div>
            </div>
        </li>
    );

    const ProjectRow = (p: Assignment) => (
        <li key={p._id} className="wd-assignment-item">
            <div className="wd-item-content">
                <BsGripVertical className="wd-grip-icon" />
                <PiProjectorScreenChartBold className="wd-type-icon text-success" />
                <div className="wd-item-details">
                    <Link href={`/Courses/${cid}/Assignments/${p._id}`} className="wd-item-title">{p.title}</Link>
                    <div className="wd-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        {p.availableDate && <span> | <strong>Not available until</strong> {formatDate(p.availableDate)} at {formatTime(p.availableDate)}</span>}
                        <br /><strong>Due</strong> {formatDate(p.dueDate)} at {formatTime(p.dueDate)} | {p.points} pts
                    </div>
                </div>
                <div className="wd-item-controls">
                    <AssignmentControlButtons
                        assignmentId={p._id}
                        onEdit={canEdit ? () => handleEditAssignment(p._id) : undefined}
                        onDelete={canEdit ? () => handleDeleteClick(p) : undefined}
                    />
                </div>
            </div>
        </li>
    );

    // Date view item component
    const DateViewItem = ({ item, type, icon: Icon }: ItemWithType) => {
        const isPast = new Date(item.dueDate) < new Date();

        const handleEdit = () => {
            if (type === 'Assignment' || type === 'Project') {
                handleEditAssignment(item._id);
            } else if (type === 'Quiz') {
                handleEditQuiz(item._id);
            } else if (type === 'Exam') {
                handleEditExam(item._id);
            }
        };

        const handleDelete = () => {
            if (type === 'Assignment' || type === 'Project') {
                handleDeleteClick(item as Assignment);
            } else if (type === 'Quiz') {
                handleDeleteQuiz(item as Quiz);
            } else if (type === 'Exam') {
                handleDeleteExam(item as Exam);
            }
        };

        return (
            <li className="wd-assignment-item">
                <div className="wd-item-content">
                    <Icon className="wd-type-icon text-success" />
                    <div className="wd-item-details">
                        <Link href={`/Courses/${cid}/${type === 'Assignment' || type === 'Project' ? 'Assignments' : type + 's'}/${item._id}`} className="wd-item-title">
                            {item.title}
                        </Link>
                        <div className="wd-item-meta">
                            {isPast && <><strong className="text-danger">Closed</strong> | </>}
                            <strong>Due</strong> {formatFullDate(item.dueDate)} | {item.points} pts
                            {!isPast && <> | Not Yet Graded</>}
                        </div>
                    </div>
                    <div className="wd-item-controls">
                        <AssignmentControlButtons
                            assignmentId={item._id}
                            onEdit={canEdit ? handleEdit : undefined}
                            onDelete={canEdit ? handleDelete : undefined}
                        />
                    </div>
                </div>
            </li>
        );
    };

    return (
        <div id="wd-assignments">
            {/* Search and action buttons */}
            <div className="wd-assignments-controls">
                <InputGroup className="wd-search-input">
                    <InputGroup.Text className="wd-search-icon">
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for Assignments"
                        className="wd-search-field"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                <div className="wd-action-buttons">
                    <Button
                        variant={viewMode === "date" ? "success" : "outline-secondary"}
                        size="sm"
                        onClick={() => setViewMode("date")}
                    >
                        Show by Date
                    </Button>
                    <Button
                        variant={viewMode === "type" ? "success" : "outline-secondary"}
                        size="sm"
                        onClick={() => setViewMode("type")}
                    >
                        Show by Type
                    </Button>

                    {canEdit && (
                        <>
                            <Button
                                variant="light"
                                className="wd-group-btn"
                                onClick={() => setShowGroupDialog(true)}
                            >
                                <FaPlus className="wd-btn-icon" /> Group
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleAddAssignment}
                            >
                                <FaPlus className="wd-btn-icon" /> Assignment
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Type view - organized by category */}
            {viewMode === "type" && (
                <ul className="wd-assignment-list">
                    <ListGroup className="wd-section">
                        <ListGroupItem className="wd-section-item">
                            <SectionHeader
                                label="ASSIGNMENTS"
                                percentage={`${weights.ASSIGNMENTS}%`}
                                count={filteredAssignments.length}
                                isOpen={open.ASSIGNMENTS}
                                onToggle={() => toggle("ASSIGNMENTS")}
                                onAdd={canEdit ? handleAddAssignment : undefined}
                            />
                            {open.ASSIGNMENTS && (
                                <ul className="wd-items-list">
                                    {filteredAssignments.map(AssignmentRow)}
                                    {filteredAssignments.length === 0 && (
                                        <li className="p-3 text-muted text-center">
                                            {searchTerm ? "No assignments match your search" : "No assignments yet"}
                                        </li>
                                    )}
                                </ul>
                            )}
                        </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="wd-section">
                        <ListGroupItem className="wd-section-item">
                            <SectionHeader
                                label="QUIZZES"
                                percentage={`${weights.QUIZZES}%`}
                                count={filteredQuizzes.length}
                                isOpen={open.QUIZZES}
                                onToggle={() => toggle("QUIZZES")}
                                onAdd={canEdit ? handleAddQuiz : undefined}
                            />
                            {open.QUIZZES && (
                                <ul className="wd-items-list">
                                    {filteredQuizzes.map(QuizRow)}
                                    {filteredQuizzes.length === 0 && (
                                        <li className="p-3 text-muted text-center">
                                            {searchTerm ? "No quizzes match your search" : "No quizzes yet"}
                                        </li>
                                    )}
                                </ul>
                            )}
                        </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="wd-section">
                        <ListGroupItem className="wd-section-item">
                            <SectionHeader
                                label="EXAMS"
                                percentage={`${weights.EXAMS}%`}
                                count={filteredExams.length}
                                isOpen={open.EXAMS}
                                onToggle={() => toggle("EXAMS")}
                                onAdd={canEdit ? handleAddExam : undefined}
                            />
                            {open.EXAMS && (
                                <ul className="wd-items-list">
                                    {filteredExams.map(ExamRow)}
                                    {filteredExams.length === 0 && (
                                        <li className="p-3 text-muted text-center">
                                            {searchTerm ? "No exams match your search" : "No exams yet"}
                                        </li>
                                    )}
                                </ul>
                            )}
                        </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="wd-section">
                        <ListGroupItem className="wd-section-item">
                            <SectionHeader
                                label="PROJECTS"
                                percentage={`${weights.PROJECTS}%`}
                                count={filteredProjects.length}
                                isOpen={open.PROJECTS}
                                onToggle={() => toggle("PROJECTS")}
                                onAdd={canEdit ? handleAddProject : undefined}
                            />
                            {open.PROJECTS && (
                                <ul className="wd-items-list">
                                    {filteredProjects.map(ProjectRow)}
                                    {filteredProjects.length === 0 && (
                                        <li className="p-3 text-muted text-center">
                                            {searchTerm ? "No projects match your search" : "No projects yet"}
                                        </li>
                                    )}
                                </ul>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </ul>
            )}

            {/* Date view - organized by upcoming/past */}
            {viewMode === "date" && (
                <div className="wd-assignments-by-date">
                    {(() => {
                        const { upcoming, past } = getAllItemsByDate();
                        return (
                            <>
                                <ListGroup className="wd-section">
                                    <ListGroupItem className="wd-section-item">
                                        <div className="wd-section-header wd-date-section-header" onClick={() => setUpcomingOpen(!upcomingOpen)}>
                                            {upcomingOpen ? <FaCaretDown className="wd-date-caret" /> : <FaCaretRight className="wd-date-caret" />}
                                            <span className="wd-date-section-label">Upcoming Assignments</span>
                                        </div>
                                        {upcomingOpen && (
                                            <ul className="wd-items-list">
                                                {upcoming.map(({ item, type, icon }) => (
                                                    <DateViewItem key={item._id} item={item} type={type} icon={icon} />
                                                ))}
                                                {upcoming.length === 0 && (
                                                    <li className="p-3 text-muted text-center">
                                                        {searchTerm ? "No upcoming items match your search" : "No upcoming assignments"}
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </ListGroupItem>
                                </ListGroup>

                                <ListGroup className="wd-section">
                                    <ListGroupItem className="wd-section-item">
                                        <div className="wd-section-header wd-date-section-header" onClick={() => setPastOpen(!pastOpen)}>
                                            {pastOpen ? <FaCaretDown className="wd-date-caret" /> : <FaCaretRight className="wd-date-caret" />}
                                            <span className="wd-date-section-label">Past Assignments</span>
                                        </div>
                                        {pastOpen && (
                                            <ul className="wd-items-list">
                                                {past.map(({ item, type, icon }) => (
                                                    <DateViewItem key={item._id} item={item} type={type} icon={icon} />
                                                ))}
                                                {past.length === 0 && (
                                                    <li className="p-3 text-muted text-center">
                                                        {searchTerm ? "No past items match your search" : "No past assignments"}
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </ListGroupItem>
                                </ListGroup>
                            </>
                        );
                    })()}
                </div>
            )}

            {/* Dialogs */}
            <AssignmentDeleteDialog
                show={showDeleteDialog}
                assignmentTitle={itemToDelete?.item?.title || ""}
                itemType={itemToDelete?.type || "Assignment"}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
            <AssignmentGroupEditor
                show={showGroupDialog}
                onClose={() => setShowGroupDialog(false)}
                onSave={handleCreateGroup}
            />
        </div>
    );
}
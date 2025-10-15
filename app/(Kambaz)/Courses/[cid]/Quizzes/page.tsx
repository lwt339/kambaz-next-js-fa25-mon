// File: app/(Kambaz)/Courses/[cid]/Quizzes/page.tsx
// Main quizzes and exams page with filtering and view modes

"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, InputGroup, Form, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaCaretRight, FaRegFileAlt, FaSearch, FaPlus } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { IoEllipsisVertical } from "react-icons/io5";
import { IconType } from "react-icons";
import AssignmentControlButtons from "../Assignments/AssignmentControlButtons";
import AssignmentDeleteDialog from "../Assignments/AssignmentDeleteDialog";
import { deleteQuiz } from "./reducer";
import { deleteExam } from "../Exams/reducer";
import * as db from "../../../Database";
import { Quiz, Exam, GradingWeights } from "../../../Database/type";
import { RootState, AppDispatch } from "../../../store";
import "./quizzes.css";

// Section types
type SectionKey = "QUIZZES" | "EXAMS";

// When combining different item types
interface ItemWithType {
    item: Quiz | Exam;
    type: string;
    icon: IconType;
}

// What we're deleting
interface DeleteItem {
    item: Quiz | Exam;
    type: string;
}

export default function QuizzesPage() {
    const params = useParams();
    const cid = params?.cid as string;
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Get data from Redux
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
    const [upcomingOpen, setUpcomingOpen] = useState<boolean>(true);
    const [pastOpen, setPastOpen] = useState<boolean>(false);

    // Filter for this course
    const courseQuizzes = quizzes.filter((q: Quiz) => q.course === cid);
    const courseExams = exams.filter((e: Exam) => e.course === cid);

    // Filter by search term
    const filterBySearch = <T extends { title: string }>(items: T[]): T[] => {
        if (!searchTerm.trim()) return items;
        return items.filter((item: T) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredQuizzes = filterBySearch(courseQuizzes);
    const filteredExams = filterBySearch(courseExams);

    // Track which sections are open
    const [open, setOpen] = useState<Record<SectionKey, boolean>>({
        QUIZZES: true,
        EXAMS: true
    });

    const toggle = (key: SectionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));
    const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";

    // Navigation handlers
    const handleAddQuiz = () => router.push(`/Courses/${cid}/Quizzes/new`);
    const handleAddExam = () => router.push(`/Courses/${cid}/Exams/new`);
    const handleEditQuiz = (quizId: string) => router.push(`/Courses/${cid}/Quizzes/${quizId}`);
    const handleEditExam = (examId: string) => router.push(`/Courses/${cid}/Exams/${examId}`);

    // Delete handlers
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

        if (type === 'Quiz') {
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

    // Date formatting helpers
    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } catch {
            return "";
        }
    };

    const formatTime = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
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

    // Organize items by date
    const getAllItemsByDate = (): { upcoming: ItemWithType[], past: ItemWithType[] } => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const allItems: ItemWithType[] = [
            ...filteredQuizzes.map(q => ({ item: q, type: 'Quiz', icon: GrNotes })),
            ...filteredExams.map(e => ({ item: e, type: 'Exam', icon: FaRegFileAlt }))
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
        <div className="wd-quiz-section-header">
            <BsGripVertical className="wd-quiz-grip-icon" onClick={props.onToggle} />
            <span onClick={props.onToggle} className="wd-quiz-flex-row wd-quiz-flex-1 wd-quiz-cursor-pointer">
                {props.isOpen ? <FaCaretDown className="wd-quiz-caret-icon" /> : <FaCaretRight className="wd-quiz-caret-icon" />}
                <span className="wd-quiz-section-label">
                    {props.label}{props.count !== undefined && ` (${props.count})`}
                </span>
            </span>
            <span className="wd-quiz-percentage-badge" onClick={props.onToggle}>
                {props.percentage} of Total
            </span>

            {canEdit && props.onAdd && (
                <span className="wd-quiz-add-icon" onClick={props.onAdd} title={`Add new ${props.label.toLowerCase()}`}>
                    <FaPlus />
                </span>
            )}

            <IoEllipsisVertical className="wd-quiz-ellipsis-icon" onClick={props.onToggle} />
        </div>
    );

    // Quiz row component
    const QuizRow = (q: Quiz) => (
        <li key={q._id} className="wd-quiz-item">
            <div className="wd-quiz-item-content">
                <BsGripVertical className="wd-quiz-grip-icon" />
                <GrNotes className="wd-quiz-type-icon text-success" />
                <div className="wd-quiz-item-details">
                    <Link href={`/Courses/${cid}/Quizzes/${q._id}`} className="wd-quiz-item-title">
                        {q.title}
                    </Link>
                    <div className="wd-quiz-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(q.availableDate)} at {formatTime(q.availableDate)}</span>
                        <br />
                        <strong>Due</strong> {formatDate(q.dueDate)} at {formatTime(q.dueDate)} | {q.points} pts | {q.questions} Questions | {q.timeLimit} Minutes
                    </div>
                </div>
                <div className="wd-quiz-item-controls">
                    <AssignmentControlButtons
                        assignmentId={q._id}
                        onEdit={canEdit ? () => handleEditQuiz(q._id) : undefined}
                        onDelete={canEdit ? () => handleDeleteQuiz(q) : undefined}
                    />
                </div>
            </div>
        </li>
    );

    // Exam row component
    const ExamRow = (e: Exam) => (
        <li key={e._id} className="wd-quiz-item">
            <div className="wd-quiz-item-content">
                <BsGripVertical className="wd-quiz-grip-icon" />
                <FaRegFileAlt className="wd-quiz-type-icon text-success" />
                <div className="wd-quiz-item-details">
                    <Link href={`/Courses/${cid}/Exams/${e._id}`} className="wd-quiz-item-title">
                        {e.title}
                    </Link>
                    <div className="wd-quiz-item-meta">
                        <span className="text-danger">Multiple Modules</span>
                        <span> | <strong>Not available until</strong> {formatDate(e.availableDate)} at {formatTime(e.availableDate)}</span>
                        <br />
                        <strong>Due</strong> {formatDate(e.dueDate)} at {formatTime(e.dueDate)} | {e.points} pts | {e.questions} Questions | {e.timeLimit} Minutes
                    </div>
                </div>
                <div className="wd-quiz-item-controls">
                    <AssignmentControlButtons
                        assignmentId={e._id}
                        onEdit={canEdit ? () => handleEditExam(e._id) : undefined}
                        onDelete={canEdit ? () => handleDeleteExam(e) : undefined}
                    />
                </div>
            </div>
        </li>
    );

    // Date view item component
    const DateViewItem = ({ item, type, icon: Icon }: ItemWithType) => {
        const isPast = new Date(item.dueDate) < new Date();

        const handleEdit = () => {
            if (type === 'Quiz') {
                handleEditQuiz(item._id);
            } else if (type === 'Exam') {
                handleEditExam(item._id);
            }
        };

        const handleDelete = () => {
            if (type === 'Quiz') {
                handleDeleteQuiz(item as Quiz);
            } else if (type === 'Exam') {
                handleDeleteExam(item as Exam);
            }
        };

        return (
            <li className="wd-quiz-item">
                <div className="wd-quiz-item-content">
                    <Icon className="wd-quiz-type-icon text-success" />
                    <div className="wd-quiz-item-details">
                        <Link
                            href={`/Courses/${cid}/${type === 'Quiz' ? 'Quizzes' : 'Exams'}/${item._id}`}
                            className="wd-quiz-item-title"
                        >
                            {item.title}
                        </Link>
                        <div className="wd-quiz-item-meta">
                            {isPast && <><strong className="text-danger">Closed</strong> | </>}
                            <strong>Due</strong> {formatFullDate(item.dueDate)} | {item.points} pts
                            {!isPast && <> | Not Yet Graded</>}
                        </div>
                    </div>
                    <div className="wd-quiz-item-controls">
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
        <div id="wd-quizzes">
            {/* Search and controls */}
            <div className="wd-quiz-controls">
                <InputGroup className="wd-quiz-search-input">
                    <InputGroup.Text className="wd-quiz-search-icon">
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for Quizzes & Exams"
                        className="wd-quiz-search-field"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                <div className="wd-quiz-action-buttons">
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
                        <Button variant="danger" onClick={handleAddQuiz}>
                            <FaPlus className="wd-quiz-btn-icon" /> Quiz
                        </Button>
                    )}
                </div>
            </div>

            {/* Type view - organized by category */}
            {viewMode === "type" && (
                <ul className="wd-quiz-list">
                    <ListGroup className="wd-quiz-section">
                        <ListGroupItem className="wd-quiz-section-item">
                            <SectionHeader
                                label="QUIZZES"
                                percentage={`${weights.QUIZZES}%`}
                                count={filteredQuizzes.length}
                                isOpen={open.QUIZZES}
                                onToggle={() => toggle("QUIZZES")}
                                onAdd={canEdit ? handleAddQuiz : undefined}
                            />
                            {open.QUIZZES && (
                                <ul className="wd-quiz-items-list">
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

                    <ListGroup className="wd-quiz-section">
                        <ListGroupItem className="wd-quiz-section-item">
                            <SectionHeader
                                label="EXAMS"
                                percentage={`${weights.EXAMS}%`}
                                count={filteredExams.length}
                                isOpen={open.EXAMS}
                                onToggle={() => toggle("EXAMS")}
                                onAdd={canEdit ? handleAddExam : undefined}
                            />
                            {open.EXAMS && (
                                <ul className="wd-quiz-items-list">
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
                </ul>
            )}

            {/* Date view - organized by upcoming/past */}
            {viewMode === "date" && (
                <div className="wd-quizzes-by-date">
                    {(() => {
                        const { upcoming, past } = getAllItemsByDate();
                        return (
                            <>
                                <ListGroup className="wd-quiz-section">
                                    <ListGroupItem className="wd-quiz-section-item">
                                        <div
                                            className="wd-quiz-section-header wd-quiz-date-section-header"
                                            onClick={() => setUpcomingOpen(!upcomingOpen)}
                                        >
                                            {upcomingOpen ? <FaCaretDown className="wd-quiz-date-caret" /> : <FaCaretRight className="wd-quiz-date-caret" />}
                                            <span className="wd-quiz-section-label">Upcoming Quizzes & Exams</span>
                                        </div>
                                        {upcomingOpen && (
                                            <ul className="wd-quiz-items-list">
                                                {upcoming.map(({ item, type, icon }) => (
                                                    <DateViewItem key={item._id} item={item} type={type} icon={icon} />
                                                ))}
                                                {upcoming.length === 0 && (
                                                    <li className="p-3 text-muted text-center">
                                                        {searchTerm ? "No upcoming items match your search" : "No upcoming quizzes or exams"}
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </ListGroupItem>
                                </ListGroup>

                                <ListGroup className="wd-quiz-section">
                                    <ListGroupItem className="wd-quiz-section-item">
                                        <div
                                            className="wd-quiz-section-header wd-quiz-date-section-header"
                                            onClick={() => setPastOpen(!pastOpen)}
                                        >
                                            {pastOpen ? <FaCaretDown className="wd-quiz-date-caret" /> : <FaCaretRight className="wd-quiz-date-caret" />}
                                            <span className="wd-quiz-section-label">Past Quizzes & Exams</span>
                                        </div>
                                        {pastOpen && (
                                            <ul className="wd-quiz-items-list">
                                                {past.map(({ item, type, icon }) => (
                                                    <DateViewItem key={item._id} item={item} type={type} icon={icon} />
                                                ))}
                                                {past.length === 0 && (
                                                    <li className="p-3 text-muted text-center">
                                                        {searchTerm ? "No past items match your search" : "No past quizzes or exams"}
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

            {/* Delete confirmation dialog */}
            <AssignmentDeleteDialog
                show={showDeleteDialog}
                assignmentTitle={itemToDelete?.item?.title || ""}
                itemType={itemToDelete?.type || "Quiz"}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
}
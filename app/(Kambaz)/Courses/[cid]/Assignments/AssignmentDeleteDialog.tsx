// File: app/(Kambaz)/Courses/[cid]/Assignments/AssignmentDeleteDialog.tsx
// Confirmation popup that asks if you're sure about deleting

import { Modal, Button } from "react-bootstrap";

// What information the dialog needs
interface AssignmentDeleteDialogProps {
    show: boolean;
    assignmentTitle: string;
    itemType?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function AssignmentDeleteDialog({
                                                   show,
                                                   assignmentTitle,
                                                   itemType = "Assignment",
                                                   onConfirm,
                                                   onCancel
                                               }: AssignmentDeleteDialogProps) {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete {itemType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this {itemType.toLowerCase()}?</p>
                <p className="fw-bold">{assignmentTitle}</p>
                <p className="text-muted mb-0">This action cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    No, Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
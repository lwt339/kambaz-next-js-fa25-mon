// File: app/(Kambaz)/Courses/[cid]/Assignments/AssignmentGroupEditor.tsx
// Popup dialog for creating new assignment groups like "Quizzes" or "Labs"

import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

// What the dialog needs to work
interface AssignmentGroupEditorProps {
    show: boolean;
    onClose: () => void;
    onSave: (groupName: string, percentage: number) => void;
}

export default function AssignmentGroupEditor({
                                                  show,
                                                  onClose,
                                                  onSave
                                              }: AssignmentGroupEditorProps) {
    // Track what the user types
    const [groupName, setGroupName] = useState<string>("");
    const [percentage, setPercentage] = useState<number>(40);

    // Reset the form whenever the dialog opens
    useEffect(() => {
        if (show) {
            setGroupName("");
            setPercentage(40);
        }
    }, [show]);

    // Save the new group
    const handleSave = () => {
        if (!groupName.trim()) {
            alert("Group name is required");
            return;
        }
        onSave(groupName.trim(), percentage);
        setGroupName("");
        setPercentage(40);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Assignment Group</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Group name field */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-group-name">
                        Group Name
                    </Form.Label>
                    <Form.Control
                        id="wd-group-name"
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g., QUIZZES, LABS, PROJECTS"
                        autoFocus
                    />
                </Form.Group>

                {/* Percentage field */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-group-percentage">
                        % of Total Grade
                    </Form.Label>
                    <Form.Control
                        id="wd-group-percentage"
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(parseInt(e.target.value) || 0)}
                        min="0"
                        max="100"
                    />
                    <Form.Text className="text-muted">
                        Enter a value between 0 and 100
                    </Form.Text>
                </Form.Group>

                {/* Info message */}
                <div className="alert alert-info mb-0">
                    <small>
                        <strong>Note:</strong> This will create a new section for organizing assignments.
                        You can add assignments to this group later.
                    </small>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Create Group
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
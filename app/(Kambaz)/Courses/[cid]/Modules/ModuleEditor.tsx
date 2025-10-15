// File: app/(Kambaz)/Courses/[cid]/Modules/ModuleEditor.tsx
// Popup dialog for creating and editing modules

import { Modal, FormControl, Button } from "react-bootstrap";

// What props this component needs
interface ModuleEditorProps {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    moduleName: string;
    setModuleName: (name: string) => void;
    addModule: () => void;
}

export default function ModuleEditor({
                                         show,
                                         handleClose,
                                         dialogTitle,
                                         moduleName,
                                         setModuleName,
                                         addModule,
                                     }: ModuleEditorProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Input for module name */}
                <FormControl
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    placeholder="Enter module name"
                    autoFocus
                />
            </Modal.Body>

            <Modal.Footer>
                {/* Cancel - just close without saving */}
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                {/* Add - save and close */}
                <Button
                    variant="primary"
                    onClick={() => {
                        addModule();
                        handleClose();
                    }}
                >
                    Add Module
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
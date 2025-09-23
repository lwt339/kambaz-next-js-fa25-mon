import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function AssignmentsControls() {
    return (
        <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center mb-3">
            {/* Search Input - Left aligned */}
            <InputGroup style={{ width: "300px" }}>
                <InputGroup.Text className="bg-white">
                    <FaSearch />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Search for Assignments"
                />
            </InputGroup>

            {/* Buttons - Right aligned */}
            <div>
                <Button variant="secondary" className="me-2">
                    <FaPlus className="me-1" /> Group
                </Button>
                <Button variant="danger">
                    <FaPlus className="me-1" /> Assignment
                </Button>
            </div>
        </div>
    );
}
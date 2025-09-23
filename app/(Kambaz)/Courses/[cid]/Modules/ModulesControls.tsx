import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            {/* Gray buttons - REQUIRED */}
            <Button variant="secondary" className="me-1">
                Collapse All
            </Button>
            <Button variant="secondary" className="me-1">
                View Progress
            </Button>

            {/* Publish All Dropdown - REQUIRED with 4 options */}
            <DropdownButton
                variant="secondary"
                title="Publish All"
                className="d-inline me-1"
            >
                <Dropdown.Item>Publish All Modules and Items</Dropdown.Item>
                <Dropdown.Item>Publish Modules Only</Dropdown.Item>
                <Dropdown.Item>Unpublish All Modules</Dropdown.Item>
                <Dropdown.Item>Unpublish Modules and Items</Dropdown.Item>
            </DropdownButton>

            {/* Red Module button - REQUIRED */}
            <Button variant="danger">
                <BsPlus className="fs-4" /> Module
            </Button>
        </div>
    );
}
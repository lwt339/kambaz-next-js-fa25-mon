import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";

type ModulesControlsProps = {
    onCollapseAll: () => void;
    onExpandAll: () => void;
    allCollapsed: boolean;
};

export default function ModulesControls({
                                            onCollapseAll,
                                            onExpandAll,
                                            allCollapsed
                                        }: ModulesControlsProps) {
    return (
        <div id="wd-modules-controls" className="text-nowrap d-flex flex-wrap justify-content-end gap-2">
            {/* Collapse All / Expand All button */}
            <Button
                variant="secondary"
                size="lg"
                id="wd-collapse-all"
                onClick={allCollapsed ? onExpandAll : onCollapseAll}
            >
                {allCollapsed ? "Expand All" : "Collapse All"}
            </Button>

            {/* View Progress button */}
            <Button
                variant="secondary"
                size="lg"
                id="wd-view-progress"
            >
                View Progress
            </Button>

            {/* Publish All dropdown */}
            <Dropdown>
                <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark />
                    Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item id="wd-publish-all">
                        <GreenCheckmark />
                        Publish All
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-all-modules-and-items">
                        <GreenCheckmark />
                        Publish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-publish-modules-only">
                        <GreenCheckmark />
                        Publish modules only
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                        <MdDoNotDisturbAlt className="me-2 text-secondary" />
                        Unpublish all modules and items
                    </Dropdown.Item>
                    <Dropdown.Item id="wd-unpublish-modules-only">
                        <MdDoNotDisturbAlt className="me-2 text-secondary" />
                        Unpublish modules only
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Module button */}
            <Button
                variant="danger"
                size="lg"
                id="wd-add-module-btn"
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
        </div>
    );
}
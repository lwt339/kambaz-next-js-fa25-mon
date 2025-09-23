import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";

export default function CourseStatus() {
    return (
        <div style={{ width: "300px" }}>
            <h2>Course Status</h2>
            <div className="d-flex">
                <div className="w-50 pe-1">
                    <Button variant="secondary" className="w-100 text-nowrap">
                        <MdDoNotDisturbAlt className="me-2 fs-5" />
                        Unpublish
                    </Button>
                </div>
                <div className="w-50 ps-1">
                    <Button variant="success" className="w-100">
                        <FaCheckCircle className="me-2 fs-5" />
                        Publish
                    </Button>
                </div>
            </div>
            <br />
            <Button variant="secondary" className="w-100 text-start">
                <BiImport className="me-2 fs-5" />
                Import Existing Content
            </Button>
            <br />
            <Button variant="secondary" className="w-100 text-start">
                <LiaFileImportSolid className="me-2 fs-5" />
                Import from Commons
            </Button>
            {/* Add more buttons as needed */}
        </div>
    );
}
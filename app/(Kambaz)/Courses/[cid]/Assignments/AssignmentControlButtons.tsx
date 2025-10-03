/**
 * Assignment Control Buttons - Fixed Green Checkmark
 * Location: app/(Kambaz)/Courses/[cid]/Assignments/AssignmentControlButtons.tsx
 *
 * Fixed green checkmark alignment with ellipsis icon
 */

import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end d-flex align-items-center">
            {/* Green Checkmark - Fixed alignment */}
            <span
                className="position-relative d-inline-block me-2"
                style={{
                    width: "18px",
                    height: "18px",
                    verticalAlign: "middle",
                    top: "0 px"
                }}
            >
                <FaCircle
                    className="text-white position-absolute"
                    style={{
                        fontSize: "12px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
                <FaCheckCircle
                    className="text-success position-absolute"
                    style={{
                        fontSize: "18px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
            </span>

            {/* Ellipsis menu */}
            <IoEllipsisVertical className="fs-4 text-muted" />
        </div>
    );
}
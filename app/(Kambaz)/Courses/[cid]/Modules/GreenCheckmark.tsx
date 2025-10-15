// File: app/(Kambaz)/Courses/[cid]/Modules/GreenCheckmark.tsx
// Published status indicator with green checkmark

import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
    return (
        <span
            className="position-relative d-inline-block me-1"
            style={{ width: "1.25rem", height: "1.25rem", verticalAlign: "text-top", top: "3px" }}
        >
            {/* White circle background */}
            <FaCircle
                className="text-white position-absolute"
                style={{ fontSize: "0.95rem", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            {/* Green checkmark on top */}
            <FaCheckCircle
                className="text-success position-absolute"
                style={{ fontSize: "1.2rem", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
        </span>
    );
}
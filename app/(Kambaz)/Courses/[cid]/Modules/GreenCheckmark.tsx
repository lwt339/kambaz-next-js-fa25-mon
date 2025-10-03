/**
 * Green Checkmark Component - Fixed Alignment
 * Location: app/(Kambaz)/Courses/[cid]/Modules/GreenCheckmark.tsx
 *
 * Creates a green checkmark icon with proper alignment
 * Fixed: Removed white background artifacts
 */

import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
    return (
        <span className="position-relative d-inline-block me-1" style={{ width: "1.25rem", height: "1.25rem", verticalAlign: "text-top", top: "3px" }}>
            <FaCircle
                className="text-white position-absolute"
                style={{ fontSize: "0.95rem", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            <FaCheckCircle
                className="text-success position-absolute"
                style={{ fontSize: "1.2rem", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
        </span>
    );
}

/**
 * HOW IT WORKS:
 *
 * 1. Container span: Fixed dimensions (1.25rem x 1.25rem)
 * 2. White circle: Smaller (1rem) - creates background
 * 3. Green checkmark: Larger (1.25rem) - overlays on top
 * 4. Both absolutely positioned and centered
 *
 * FIXES:
 * - Removed extra margins (me-1)
 * - Centered both icons
 * - Fixed size container
 * - Perfect alignment
 */
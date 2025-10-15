// File: app/(Kambaz)/Courses/[cid]/Modules/LessonControlButtons.tsx
// Control buttons for each lesson row

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
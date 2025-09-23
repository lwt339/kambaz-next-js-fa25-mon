import { IoEllipsisVertical } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <BsCheckCircle className="text-success me-2 fs-5" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
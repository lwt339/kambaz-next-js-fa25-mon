import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end d-flex align-items-center">
            {/*Green Checkmark*/}
            <span className="me-2 position-relative">
                {/* position*/}
                <FaCheckCircle
                    style={{ top: "2px" }}
                    className="text-success position-absolute fs-5"
                />
                {/*background*/}
                <FaCircle className="text-white fs-6" />
            </span>

            {/* Ellipsis menu*/}
            <IoEllipsisVertical className="fs-4 text-muted" />
        </div>
    );
}
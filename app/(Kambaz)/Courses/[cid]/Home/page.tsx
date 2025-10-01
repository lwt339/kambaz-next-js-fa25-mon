import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
    return (
        <div id="wd-home" className="d-flex">
            {/* full width on mobile*/}
            <div className="flex-fill">
                <Modules />
            </div>

            {/* Course Status Hideen */}
            <div className="d-none d-xl-block ms-4" style={{ width: "350px" }}>
                <CourseStatus />
            </div>
        </div>
    );
}
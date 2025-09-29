import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
    return (
        <div id="wd-home" className="d-flex">
            {/* Modules take full width on mobile, share on desktop */}
            <div className="flex-fill">
                <Modules />
            </div>

            {/* Course Status - Hidden on screens smaller than XL */}
            <div className="d-none d-xl-block ms-4" style={{ width: "350px" }}>
                <CourseStatus />
            </div>
        </div>
    );
}
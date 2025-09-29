import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
    return (
        <div id="wd-kambaz">
            <div className="d-flex">
                <div>
                    <KambazNavigation />
                </div>
                {/* Offset only when sidebar is visible (via CSS @media) */}
                <div className="wd-main-content-offset p-3 flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}

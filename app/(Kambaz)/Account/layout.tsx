// File: app/(Kambaz)/Account/layout.tsx
// Layout for Account pages with sidebar navigation

"use client";

import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

interface AccountLayoutProps {
    children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
    return (
        <div id="wd-account-screen">
            <div className="d-flex">
                {/* Show sidebar on larger screens */}
                <div className="d-none d-md-block">
                    <AccountNavigation />
                </div>

                {/* Main content area */}
                <div className="flex-fill p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
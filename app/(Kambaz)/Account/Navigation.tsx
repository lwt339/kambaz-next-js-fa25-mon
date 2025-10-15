// File: app/(Kambaz)/Account/Navigation.tsx
// Sidebar navigation that shows different links based on login status

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// What each navigation link looks like
interface NavLink {
    name: string;
    path: string;
}

export default function AccountNavigation() {
    const pathname = usePathname();

    // Check who's logged in to show the right links
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    // Logged in users see Profile, guests see Signin and Signup
    const links: NavLink[] = currentUser
        ? [{ name: "Profile", path: "/Account/Profile" }]
        : [
            { name: "Signin", path: "/Account/Signin" },
            { name: "Signup", path: "/Account/Signup" }
        ];

    // Check if this link is the current page
    const isActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <div
            id="wd-account-navigation"
            className="wd list-group fs-5 rounded-0"
            style={{ width: "150px" }}
        >
            {links.map((link: NavLink) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`list-group-item border-0 ${
                        isActive(link.path)
                            ? 'active text-black'
                            : 'text-danger'
                    }`}
                    style={{
                        backgroundColor: isActive(link.path) ? 'white' : 'transparent',
                        borderLeft: isActive(link.path) ? '3px solid black' : 'none',
                        paddingLeft: isActive(link.path) ? '13px' : '16px'
                    }}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
}
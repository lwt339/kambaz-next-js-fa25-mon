"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
    const pathname = usePathname();

    const links = [
        { name: "Signin", path: "/Account/Signin" },
        { name: "Signup", path: "/Account/Signup" },
        { name: "Profile", path: "/Account/Profile" },
    ];

    // Check if a link is active
    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div
            id="wd-account-navigation"
            className="wd list-group fs-5 rounded-0"
            style={{ width: "150px" }}
        >
            {links.map((link) => (
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
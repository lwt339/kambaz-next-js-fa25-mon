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

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`list-group-item border-0 ${
                        pathname === link.path ? 'active' : 'text-danger'
                    }`}>
                    {link.name}
                </Link>
            ))}
        </div>
    );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
// icon imports
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaFlask } from "react-icons/fa";

/**
 * Navigation Item Interface
 */
type NavItem = {
    id: string;
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
};


// navigation data

const NAV_LINKS: NavItem[] = [
    {
        id: "account",
        href: "/Account",
        label: "Account",
        Icon: FaRegCircleUser
    },
    {
        id: "dashboard",
        href: "/Dashboard",
        label: "Dashboard",
        Icon: AiOutlineDashboard
    },
    {
        id: "courses",
        href: "/Dashboard",
        label: "Courses",
        Icon: LiaBookSolid
    },
    {
        id: "calendar",
        href: "/Calendar",
        label: "Calendar",
        Icon: IoCalendarOutline
    },
    {
        id: "inbox",
        href: "/Inbox",
        label: "Inbox",
        Icon: FaInbox
    },
    {
        id: "labs",
        href: "/Labs",
        label: "Labs",
        Icon: FaFlask
    },
];


// MAIN component

export default function KambazNavigation() {
    const pathname = usePathname();

    return (
        <ListGroup
            id="wd-kambaz-navigation"
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 110 }}
        >
            {/* NEU LOGO */}
            <ListGroupItem
                as="a"
                target="_blank"
                href="https://www.northeastern.edu/"
                id="wd-neu-link"
                className="bg-black border-0 text-center"
            >
                <Image
                    src="/images/NEU.png"
                    width={75}
                    height={75}
                    alt="Northeastern University"
                />
            </ListGroupItem>

            <br />

            {/* data-driven navigation links */}
            {NAV_LINKS.map(({ id, href, label, Icon }) => {
                // DETERMINE ACTIVE STATE
                let active: boolean;

                if (id === "courses") {
                    // Courses is active when in any course
                    active = pathname?.includes("/Courses/") || false;
                } else {
                    // ctive when pathname starts with href
                    active = pathname?.startsWith(href) || false;
                }

                // styling based on active state

                const bgColor = active ? "bg-white" : "bg-black";
                const textColor = active ? "text-danger" : "text-white";

                // Account icon changes color, other icons stay red
                const iconColor = id === "account"
                    ? (active ? "text-danger" : "text-white")
                    : "text-danger";


                // courses
                let linkHref = href;
                if (id === "courses") {
                    // course's Home
                    if (pathname?.includes("/Courses/")) {
                        const match = pathname.match(/\/Courses\/([^\/]+)/);
                        linkHref = match
                            ? `/Courses/${match[1]}/Home`
                            : "/Courses/CS5610/Home";
                    } else {
                        // Default to CS5610 Home
                        linkHref = "/Courses/CS5610/Home";
                    }
                }

                // render
                return (
                    <ListGroupItem
                        key={id}
                        className={`${bgColor} border-0 text-center`}
                    >
                        <Link
                            href={linkHref}
                            id={`wd-${id}-link`}
                            className={`${textColor} text-decoration-none`}
                            aria-current={active ? "page" : undefined}
                        >
                            <Icon className={`fs-1 ${iconColor}`} />
                            <br />
                            {label}
                        </Link>
                    </ListGroupItem>
                );
            })}

            <br />
        </ListGroup>
    );
}

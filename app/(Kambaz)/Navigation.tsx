"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

// Icons
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid} from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaFlask } from "react-icons/fa";

type NavItem = {
    id: string;
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
};

// Order
const NAV: NavItem[] = [
    { id: "account",   href: "/Account",   label: "Account",   Icon: FaRegCircleUser },
    { id: "dashboard", href: "/Dashboard", label: "Dashboard", Icon: AiOutlineDashboard },
    { id: "courses",   href: "/Courses",   label: "Courses",   Icon: LiaBookSolid },
    { id: "calendar",  href: "/Calendar",  label: "Calendar",  Icon: IoCalendarOutline },
    { id: "inbox",     href: "/Inbox",     label: "Inbox",     Icon: FaInbox },
    { id: "labs",      href: "/Labs",      label: "Labs",      Icon: FaFlask },
];

export default function KambazNavigation() {
    const pathname = usePathname();

    return (
        <ListGroup
            id="wd-kambaz-navigation"
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 110 }}  // ~110px
        >
            {/* logo */}
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

            {NAV.map(({ id, href, label, Icon }) => {
                // nav item active
                let active: boolean;
                if (id === "courses") {
                    // Courses is active
                    active = pathname?.includes("/Courses/") || false;
                } else {
                    // pathname starts with the href
                    active = pathname?.startsWith(href) || false;
                }


                const bgColor = active ? "bg-white" : "bg-black";
                const textColor = active ? "text-danger" : "text-white";

                // Icon colorsd
                const iconColor = id === "account"
                    ? (active ? "text-danger" : "text-white")  // Account icon
                    : "text-danger";  // All other icon

                // href to use for navigation
                let linkHref = href;
                if (id === "courses") {
                    // Always navigate to a specific course page
                    if (pathname?.includes("/Courses/")) {
                        // If already in a course, extract the course ID
                        const match = pathname.match(/\/Courses\/([^\/]+)/);
                        linkHref = match ? `/Courses/${match[1]}/Home` : "/Courses/CS5610/Home";
                    } else {
                        // Default course
                        linkHref = "/Courses/CS5610/Home";
                    }
                }

                return (
                    <ListGroupItem
                        key={id}
                        className={`${bgColor} border-0 text-center`}
                    >
                        <Link
                            href={linkHref}
                            id={
                                id === "account"   ? "wd-account-link"   :
                                    id === "dashboard" ? "wd-dashboard-link" :
                                        id === "courses"   ? "wd-course-link"    :
                                            id === "calendar"  ? "wd-calendar-link"  :
                                                id === "inbox"     ? "wd-inbox-link"     :
                                                    /* labs */           "wd-labs-link"
                            }
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
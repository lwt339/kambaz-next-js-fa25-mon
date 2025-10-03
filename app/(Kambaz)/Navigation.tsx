/**
 * ═══════════════════════════════════════════════════════════════════════════
 * KAMBAZ NAVIGATION COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Location: app/(Kambaz)/Navigation.tsx
 *
 * DATA-DRIVEN NAVIGATION BAR
 * - Dynamically renders navigation links from data array
 * - Highlights active route
 * - Beautiful styling with icons
 * - Responsive design
 *
 * KEY FEATURES:
 * ✅ Data-driven navigation (no hardcoded links)
 * ✅ Active state highlighting
 * ✅ Icon support with react-icons
 * ✅ Clean, organized code structure
 * ✅ Follows textbook Chapter 3 guidelines
 *
 * @author Kambaz Development Team
 * @version 3.0 - Data-Driven Edition
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

// ═══════════════════════════════════════════════════════════════════════════
// ICON IMPORTS
// ═══════════════════════════════════════════════════════════════════════════
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaFlask } from "react-icons/fa";

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Navigation Item Interface
 * Defines the structure for each navigation link
 */
type NavItem = {
    id: string;                                      // Unique identifier
    href: string;                                    // Target route
    label: string;                                   // Display text
    Icon: React.ComponentType<{ className?: string }>;  // Icon component
};

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION DATA STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Navigation Links Configuration
 *
 * This array drives the entire navigation system.
 * To add a new link, simply add an entry here!
 *
 * Order matters - links appear in this order top to bottom
 */
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
        href: "/Dashboard",  // Courses link goes to Dashboard per textbook
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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * KambazNavigation Component
 *
 * Renders the left sidebar navigation with:
 * - NEU logo at top
 * - Dynamic navigation links from NAV_LINKS array
 * - Active state highlighting
 * - Icon and label for each link
 *
 * @returns JSX.Element - The rendered navigation sidebar
 */
export default function KambazNavigation() {
    // ────────────────────────────────────────────────────────────────────────
    // HOOKS
    // ────────────────────────────────────────────────────────────────────────
    const pathname = usePathname();

    // ────────────────────────────────────────────────────────────────────────
    // RENDER
    // ────────────────────────────────────────────────────────────────────────
    return (
        <ListGroup
            id="wd-kambaz-navigation"
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 110 }}
        >
            {/* ═══════════════════════════════════════════════════════════════
                NEU LOGO
                ═══════════════════════════════════════════════════════════════ */}
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

            {/* ═══════════════════════════════════════════════════════════════
                DATA-DRIVEN NAVIGATION LINKS
                ═══════════════════════════════════════════════════════════════

                Maps over NAV_LINKS array to create navigation items
                Each link has:
                - Active state highlighting
                - Icon (always red except Account)
                - Label text
                - Proper routing
            */}
            {NAV_LINKS.map(({ id, href, label, Icon }) => {
                // ────────────────────────────────────────────────────────────
                // DETERMINE ACTIVE STATE
                // ────────────────────────────────────────────────────────────
                let active: boolean;

                if (id === "courses") {
                    // Special case: Courses is active when in any course
                    active = pathname?.includes("/Courses/") || false;
                } else {
                    // Standard case: Active when pathname starts with href
                    active = pathname?.startsWith(href) || false;
                }

                // ────────────────────────────────────────────────────────────
                // STYLING BASED ON ACTIVE STATE
                // ────────────────────────────────────────────────────────────
                const bgColor = active ? "bg-white" : "bg-black";
                const textColor = active ? "text-danger" : "text-white";

                // Account icon changes color, other icons stay red
                const iconColor = id === "account"
                    ? (active ? "text-danger" : "text-white")
                    : "text-danger";

                // ────────────────────────────────────────────────────────────
                // SMART ROUTING FOR COURSES
                // ────────────────────────────────────────────────────────────
                let linkHref = href;
                if (id === "courses") {
                    // If already in a course, navigate to that course's Home
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

                // ────────────────────────────────────────────────────────────
                // RENDER NAVIGATION ITEM
                // ────────────────────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════════════════
// USAGE NOTES
// ═══════════════════════════════════════════════════════════════════════════
/**
 * HOW TO USE THIS COMPONENT:
 *
 * 1. Import in your layout:
 *    import KambazNavigation from "./Navigation";
 *
 * 2. Add to layout:
 *    <KambazNavigation />
 *
 * 3. To add new navigation items:
 *    - Add entry to NAV_LINKS array
 *    - Import the icon you want to use
 *    - That's it! The component will handle the rest.
 *
 * CUSTOMIZATION:
 * - Width: Change the style={{ width: 110 }} prop
 * - Colors: Modify bgColor and textColor variables
 * - Icons: Import different icons from react-icons
 *
 * DATA-DRIVEN APPROACH:
 * - All navigation items come from NAV_LINKS array
 * - No hardcoded JSX for each link
 * - Easy to maintain and extend
 * - Follows DRY (Don't Repeat Yourself) principle
 */
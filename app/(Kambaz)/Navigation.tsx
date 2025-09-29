import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
// import { BiHistory } from "react-icons/bi";
// import { MdOutlineOndemandVideo } from "react-icons/md";
// import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaFlask } from "react-icons/fa";

// Navigation items defined outside component for better performance
const NAV_ITEMS = [
    { href: "/Account",    label: "Account",    icon: FaRegCircleUser },
    { href: "/Dashboard",  label: "Dashboard",  icon: AiOutlineDashboard },
    { href: "/Courses/5610/Home", label: "Courses", icon: LiaBookSolid },
   // { href: "/Groups",     label: "Groups",     icon: HiOutlineUserGroup },
    { href: "/Calendar",   label: "Calendar",   icon: IoCalendarOutline },
    { href: "/Inbox",      label: "Inbox",      icon: FaInbox },
   // { href: "/History",    label: "History",    icon: BiHistory },
  //  { href: "/Studio",     label: "Studio",     icon: MdOutlineOndemandVideo },
   // { href: "/Help",       label: "Help",       icon: IoMdHelpCircleOutline },
    { href: "/Labs",       label: "Labs",       icon: FaFlask },
    { href: "/Settings",   label: "Settings",   icon: LiaCogSolid },
] as const;

export default function KambazNavigation() {
    const pathname = usePathname();

    // navigation item is active
    const isActive = (href: string): boolean => {
        const mainPath = href.split('/')[1];
        return pathname.includes(mainPath);
    };

    // icon color
    const getIconColor = (label: string, active: boolean): string => {
        if (label === 'Account') {
            return active ? 'text-black' : 'text-white';
        }
        return 'text-danger';
    };

    // text color based on item and active state
    const getTextColor = (label: string, active: boolean): string => {
        if (label === 'Account') {
            return active ? 'text-black' : 'text-white';
        }
        return active ? 'text-danger' : 'text-white';
    };

    return (
        <ListGroup
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 80 }}
            id="wd-kambaz-navigation">

            {/* NEU Logo - REQUIRED */}
            <ListGroupItem
                className="bg-black border-0 text-center py-1"
                style={{ paddingLeft: '5px', paddingRight: '5px' }}
                as="a"
                target="_blank"
                href="https://www.northeastern.edu/"
                id="wd-neu-link">
                <Image
                    src="/images/NEU.png"
                    width={75}
                    height={75}
                    alt="Northeastern University"
                    priority
                />
            </ListGroupItem>

            {/* Navigation Items */}
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                const iconColor = getIconColor(label, active);
                const textColor = getTextColor(label, active);

                return (
                    <ListGroupItem
                        key={href}
                        className={`border-0 text-center py-1.2 ${
                            active ? 'bg-white' : 'bg-black'
                        }`}>
                        <Link
                            href={href}
                            id={`wd-${label.toLowerCase()}-link`}
                            className="text-decoration-none d-flex flex-column align-items-center">
                            <Icon className={`${
                                label === 'Labs' || label === 'Inbox' ? 'fs-3' : 'fs-2'
                            } ${iconColor}`} />
                            <span
                                className={`small mt-1 ${textColor}`}
                                style={{ fontSize: '12px' }}>
                                {label}
                            </span>
                        </Link>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
}
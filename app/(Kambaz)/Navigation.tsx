"use client";
import Image from "next/image";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
    const pathname = usePathname();

    return (
        <ListGroup
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 120 }}
            id="wd-kambaz-navigation">

            {/* NEU Logo - REQUIRED */}
            <ListGroupItem
                className="bg-black border-0 text-center"
                as="a"
                target="_blank"
                href="https://www.northeastern.edu/"
                id="wd-neu-link">
                <Image src="/images/NEU.png" width={75} height={75} alt="Northeastern University" />
            </ListGroupItem>
            <br />

            {/* Account - White Icon REQUIRED */}
            <ListGroupItem
                className={`border-0 text-center ${
                    pathname.includes('/Account') ? 'bg-white' : 'bg-black'
                }`}>
                <Link
                    href="/Account"
                    id="wd-account-link"
                    className="text-decoration-none">
                    <FaRegCircleUser className={`fs-1 ${
                        pathname.includes('/Account') ? 'text-black' : 'text-white'
                    }`} />
                    <br />
                    <span className={
                        pathname.includes('/Account') ? 'text-black' : 'text-white'
                    }>Account</span>
                </Link>
            </ListGroupItem>
            <br />

            {/* Dashboard - Red Icon REQUIRED */}
            <ListGroupItem
                className={`border-0 text-center ${
                    pathname.includes('/Dashboard') ? 'bg-white' : 'bg-black'
                }`}>
                <Link
                    href="/Dashboard"
                    id="wd-dashboard-link"
                    className="text-decoration-none">
                    <AiOutlineDashboard className="fs-1 text-danger" />
                    <br />
                    <span className={
                        pathname.includes('/Dashboard') ? 'text-danger' : 'text-white'
                    }>Dashboard</span>
                </Link>
            </ListGroupItem>
            <br />

            {/* Courses - Red Icon REQUIRED */}
            <ListGroupItem
                className={`border-0 text-center ${
                    pathname.includes('/Courses') ? 'bg-white' : 'bg-black'
                }`}>
                <Link
                    href="/Courses/5610/Home"
                    id="wd-courses-link"
                    className="text-decoration-none">
                    <LiaBookSolid className="fs-1 text-danger" />
                    <br />
                    <span className={
                        pathname.includes('/Courses') ? 'text-danger' : 'text-white'
                    }>Courses</span>
                </Link>
            </ListGroupItem>
            <br />

            {/* Calendar - Red Icon REQUIRED */}
            <ListGroupItem className="border-0 bg-black text-center">
                <Link
                    href="/Calendar"
                    id="wd-calendar-link"
                    className="text-decoration-none">
                    <IoCalendarOutline className="fs-1 text-danger" />
                    <br />
                    <span className="text-white">Calendar</span>
                </Link>
            </ListGroupItem>
            <br />

            {/* Inbox - Red Icon REQUIRED */}
            <ListGroupItem className="border-0 bg-black text-center">
                <Link
                    href="/Inbox"
                    id="wd-inbox-link"
                    className="text-decoration-none">
                    <FaInbox className="fs-1 text-danger" />
                    <br />
                    <span className="text-white">Inbox</span>
                </Link>
            </ListGroupItem>
            <br />

            {/* Labs - Red Icon REQUIRED */}
            <ListGroupItem className="border-0 bg-black text-center">
                <Link
                    href="/Labs"
                    id="wd-labs-link"
                    className="text-decoration-none">
                    <LiaCogSolid className="fs-1 text-danger" />
                    <br />
                    <span className="text-white">Labs</span>
                </Link>
            </ListGroupItem>
        </ListGroup>
    );
}

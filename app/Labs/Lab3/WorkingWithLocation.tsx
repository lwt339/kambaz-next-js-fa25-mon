'use client';
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WorkingWithLocation() {
    const pathname = usePathname() || "";
    return (
        <Nav variant="pills" id="wd-toc" className="my-2">
            <NavItem>
                <NavLink href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
                    Labs </NavLink> </NavItem>
            <NavItem>
                <NavLink href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>
                    Lab 1 </NavLink> </NavItem>
            <NavItem>
                <NavLink href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>
                    Lab 2 </NavLink> </NavItem>
            <NavItem><NavLink as={Link} href="/Labs/Lab3" id="wd-a1" active={pathname.endsWith("/Lab3")}> Lab 3 </NavLink></NavItem>
            <NavItem><NavLink as={Link} href="/Labs/Lab3/add/1/2" id="wd-a2" active={pathname.includes("/add/1/2")}> 1 + 2 </NavLink></NavItem>
            <NavItem><NavLink as={Link} href="/Labs/Lab3/add/3/4" id="wd-a3" active={pathname.includes("/add/3/4")}> 3 + 4 </NavLink></NavItem>
            <NavItem><NavLink as={Link} href="/" id="wd-kambaz-link"> Kambaz </NavLink></NavItem>
            <NavItem><NavLink id="wd-github" href="https://github.com/lwt339/kambaz-next-js-fa25-mon">My GitHub</NavLink></NavItem>
        </Nav>
    );
}
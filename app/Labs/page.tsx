import Link from "next/link";

export default function Labs() {
    return (
        <div id="wd-labs">
            <h1>Labs</h1>
            <h2>Weiting Liu</h2>
            <h3>CS5610 Fall 2025 Section 04</h3>
            <ul>
                <li>
                    <Link href="/Labs/Lab1" id="wd-lab1-link">
                        Lab 1: HTML Examples
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab2" id="wd-lab2-link">
                        Lab 2: CSS Basics
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab3" id="wd-lab3-link">
                        Lab 3: JavaScript Fundamentals
                    </Link>
                </li>
            </ul>
                <p>
                    <Link href="/" id="wd-kambaz-link">
                        Kambaz
                    </Link>
                </p>
                <p>
                    <Link
                        id="wd-github"
                        href="https://github.com/lwt339/kambaz-next-js-fa25-mon"
                    >
                        GitHub Repository
                    </Link>
                </p>

        </div>
    );
}


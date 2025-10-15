
"use client";

import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
    return (
        // Wrap the entire Labs section with Redux Provider
        // This makes the Redux store available to all child components
        <Provider store={store}>
            <div className="container-fluid">
                <h1>Labs</h1>

                {/* Student Information */}
                <div className="mb-4">
                    <h2>Weiting Liu</h2>
                    <h3 className="text-muted">CS5610 Fall 2025 Section 04</h3>
                </div>

                {/* Navigation between labs */}
                <nav className="mb-4">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link href="/Labs/Lab1" className="nav-link" id="wd-lab1-link">
                                Lab 1
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/Labs/Lab2" className="nav-link" id="wd-lab2-link">
                                Lab 2
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/Labs/Lab3" className="nav-link" id="wd-lab3-link">
                                Lab 3
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/Labs/Lab4" className="nav-link" id="wd-lab4-link">
                                Lab 4
                            </Link>
                        </li>
                        <li><Link href="/" className="nav-link" id="wd-kambaz-link">
                            Kambaz
                        </Link>
                        </li>
                        <li>
                            <Link
                                className="nav-link"
                                id="wd-github"
                                href="https://github.com/lwt339/kambaz-next-js-fa25-mon">
                                GitHub Repository
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Main content will be displayed here based on route */}
                <div className="content">
                    {/* Child routes will render here */}
                    {/* Main content area */}
                    <div className="card">
                        <div className="card-body">
                            <h2>Welcome to Labs</h2>

                            {/* Lab Exercises List */}
                            <div className="mb-4">
                                <h3>Lab Exercises</h3>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link href="/Labs/Lab1" className="text-decoration-none">
                                            <strong>Lab 1:</strong> HTML Examples
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/Labs/Lab2" className="text-decoration-none">
                                            <strong>Lab 2:</strong> CSS Basics
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/Labs/Lab3" className="text-decoration-none">
                                            <strong>Lab 3:</strong> JavaScript Fundamentals
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/Labs/Lab4" className="text-decoration-none">
                                            <strong>Lab 4:</strong> Maintaining State in React Applications
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Links Section */}
                            <div className="mb-4">
                                <h3>Important Links</h3>
                                <p>
                                    <Link href="/" id="wd-kambaz-link" className="btn btn-primary me-2">
                                        Go to Kambaz Application
                                    </Link>
                                </p>
                                <p>
                                    <a
                                        id="wd-github"
                                        href="https://github.com/lwt339/kambaz-next-js-fa25-mon"
                                        className="btn btn-secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View GitHub Repository
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
}
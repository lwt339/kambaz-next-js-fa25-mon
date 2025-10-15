
"use client";

import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";
import {NavItem, NavLink} from "react-bootstrap";

export default function Lab4() {
    // This callback function will be passed to PassingFunctions component
    function sayHello() {
        alert("Hello");
    }

    return (
        <div id="wd-lab4" className="container">
            <h2>Lab 4 - Maintaining State in React Applications</h2>

            {/* Navigation Pills for better organization */}
            <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                    <Link className="nav-link" href="/Labs/Lab1">Lab 1</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/Labs/Lab2">Lab 2</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/Labs/Lab3">Lab 3</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" href="/Labs/Lab4">Lab 4</Link>
                </li>
                <NavItem><NavLink as={Link} href="/" id="wd-kambaz-link"> Kambaz </NavLink></NavItem>
                <NavItem><NavLink id="wd-github" href="https://github.com/lwt339/kambaz-next-js-fa25-mon">My GitHub</NavLink></NavItem>
            </ul>

            {/* Section 1: Handling User Events */}
            <div className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Part 1: Handling User Events</h3>

                {/* All the event handling exercises go here */}
                <ClickEvent />
                <PassingDataOnEvent />
                <PassingFunctions theFunction={sayHello} />
                <EventObject />
            </div>

            {/* Section 2: Managing Component State */}
            <div className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Part 2: Managing Component State</h3>

                {/* All useState examples go here */}
                <Counter />
                <BooleanStateVariables />
                <StringStateVariables />
                <DateStateVariable />
                <ObjectStateVariable />
                <ArrayStateVariable />
                <ParentStateComponent />
            </div>

            {/* Section 3: Redux State Management */}
            <div className="mb-5 p-4 border rounded bg-light">
                <h3 className="text-primary">Part 3: Application State with Redux</h3>

                {/* Redux examples including Todo List */}
                <ReduxExamples />
            </div>

            {/* Quick Links */}
            <div className="mt-5 p-3 bg-info bg-opacity-10 rounded">
                <h4>Quick Navigation</h4>
                <ul>
                    <li><Link href="/Labs">Back to Labs Index</Link></li>
                    <li><Link href="/">Kambaz Application</Link></li>
                    <li>
                        <Link href="https://github.com/lwt339/kambaz-next-js-fa25-mon" target="_blank">
                            GitHub Repository
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
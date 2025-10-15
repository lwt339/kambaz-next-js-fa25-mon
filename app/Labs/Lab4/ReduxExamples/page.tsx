// File: app/Labs/Lab4/ReduxExamples/page.tsx
// Container for all Redux examples

"use client";

import React from "react";
import HelloRedux from "./HelloRedux/page";
import CounterRedux from "./CounterRedux/page";
import AddRedux from "./AddRedux/page";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
    return (
        <div id="wd-redux-examples">
            <h2 className="mb-3">Redux Examples</h2>

            <div className="mb-4">
                <HelloRedux />
            </div>

            <div className="mb-4">
                <CounterRedux />
            </div>

            <div className="mb-4">
                <AddRedux />
            </div>

            <div className="mb-4">
                <TodoList />
            </div>
        </div>
    );
}
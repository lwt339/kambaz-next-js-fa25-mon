// File: app/(Kambaz)/layout.tsx
// Main Kambaz layout with Redux Provider wrapping everything

"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./Navigation";
import "./kambaz.css";

interface KambazLayoutProps {
    children: ReactNode;
}

export default function KambazLayout({ children }: KambazLayoutProps) {
    return (
        // Redux Provider makes all our reducers available everywhere in the app
        <Provider store={store}>
            <div id="wd-kambaz">
                <div className="d-flex">
                    <Navigation />
                    <div className="wd-main-content-offset p-3 flex-fill">
                        {children}
                    </div>
                </div>
            </div>
        </Provider>
    );
}
/**
 * Labs Layout with Redux Provider
 * This layout wraps all Labs pages with the Redux Provider
 * to make the store available to all child components
 *
 * File: app/Labs/Layout.tsx
 */

"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import TOC from "./Navigation"; // Import TOC, not Navigation

export default function LabsLayout({
                                       children
                                   }: Readonly<{
    children: ReactNode
}>) {
    return (
        // Wrap everything with Redux Provider at the layout level
        <Provider store={store}>
            <div className="d-flex p-2">
                {/* Sidebar navigation */}
                <div style={{ minWidth: 220 }}>
                    <TOC />
                </div>

                {/* Main content area */}
                <div className="flex-fill p-2">
                    {children}
                </div>
            </div>
        </Provider>
    );
}
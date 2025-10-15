// File: app/(Kambaz)/Account/page.tsx
// Main account page that redirects based on whether you're logged in

"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store";

export default function AccountPage() {
    // Check if anyone is currently signed in
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const router = useRouter();

    useEffect(() => {
        // Send them to the right place based on login status
        if (currentUser) {
            // Logged in users go to Profile
            router.push("/Account/Profile");
        } else {
            // Guests need to sign in first
            router.push("/Account/Signin");
        }
    }, [currentUser, router]);

    // Show a loading spinner while we figure out where to send them
    return (
        <div className="p-4 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
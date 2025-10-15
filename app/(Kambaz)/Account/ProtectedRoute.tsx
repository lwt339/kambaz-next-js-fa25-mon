// File: app/(Kambaz)/Account/ProtectedRoute.tsx
// Wrapper that checks if someone is logged in before showing the page

"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { RootState } from "../store";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const router = useRouter();
    const [isChecking, setIsChecking] = useState<boolean>(true);

    useEffect(() => {
        // Wait a tiny bit for Redux to load on the client side
        const timer = setTimeout(() => {
            if (!currentUser) {
                // Nobody logged in, send them to sign in page
                router.push("/Account/Signin");
            } else {
                // They're good, show the content
                setIsChecking(false);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [currentUser, router]);

    // Show loading while checking
    if (isChecking) {
        return (
            <div className="p-4 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // User is logged in, show what they came for
    if (currentUser) {
        return <>{children}</>;
    }

    // Redirecting (shouldn't reach here)
    return null;
}
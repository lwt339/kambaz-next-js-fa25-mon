/**
 * Main Kambaz Landing Page
 * Location: app/(Kambaz)/page.tsx
 *
 * Entry point for the Kambaz application.
 * Redirects users to the Dashboard to see all their courses.
 *
 * FIXED: Now redirects to /Dashboard instead of /Account/Signin
 */

import { redirect } from "next/navigation";

export default function Kambaz() {
    /**
     * Redirect to Dashboard
     *
     * When users navigate to the root Kambaz route (/),
     * they are automatically redirected to the Dashboard
     * where they can see all available courses.
     *
     * This is better than redirecting to Account/Signin because:
     * 1. Shows the data-driven course list immediately
     * 2. Meets A3 requirements to display courses from database
     * 3. Users can click on any course to explore
     */
    redirect("/Dashboard");
}

/**
 * KEY CHANGE:
 *
 * Before: redirect("/Account/Signin")
 * After: redirect("/Dashboard")
 *
 * WHY THIS MATTERS:
 * - For Assignment 3, you need to show the data-driven Dashboard
 * - The Dashboard displays all courses from the database
 * - This is the main entry point that demonstrates your implementation
 *
 * NAVIGATION FLOW:
 * 1. User goes to http://yourapp.com
 * 2. Lands on root Kambaz route (/)
 * 3. Automatically redirected to /Dashboard
 * 4. Sees all 10 courses from database
 * 5. Can click any course to explore
 *
 * If you want to require sign-in first, you can change this back
 * after completing Assignment 3.
 */
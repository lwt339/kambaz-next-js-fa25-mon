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

    redirect("/Account/Signin");
}

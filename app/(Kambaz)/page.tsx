// File: app/(Kambaz)/page.tsx
// Main Kambaz landing page - just redirects to Dashboard

"use client";

import { redirect } from "next/navigation";

export default function KambazPage() {
    // Everything uses Redux now, so just send people to Dashboard
    redirect("/Dashboard");
}
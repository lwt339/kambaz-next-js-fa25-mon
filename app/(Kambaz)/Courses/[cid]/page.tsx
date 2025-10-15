// File: app/(Kambaz)/Courses/[cid]/page.tsx
// Validates course exists and redirects to course home

"use client";

import { redirect } from "next/navigation";
import { use } from "react";
import { useSelector } from "react-redux";
import { Course } from "../../Database/type";
import { RootState } from "../../store";

interface CoursesPageProps {
    params: Promise<{ cid: string }>;
}

export default function CoursesPage({ params }: CoursesPageProps) {
    // Get course ID from URL
    const { cid } = use(params);

    // Get courses from Redux (not Database) so we can see newly created courses
    const { courses } = useSelector((state: RootState) => state.coursesReducer);

    // Try to find this course
    const course = courses.find((c: Course) => c._id === cid);

    // Course doesn't exist - send back to Dashboard
    if (!course) {
        redirect("/Dashboard");
    }

    // Course exists - send to its home page
    redirect(`/Courses/${cid}/Home`);
}
import { redirect } from "next/navigation";

export default async function CoursesPage({ 
  params 
}: { 
  params: Promise<{ cid: string }> 
}) {
  const { cid } = await params;
  // Redirect to the Home page of the course
  redirect(`/Courses/${cid}/Home`);
}
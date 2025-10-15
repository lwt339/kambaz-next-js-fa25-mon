// File: app/(Kambaz)/Database/index.ts
// Exports all our database collections so components can import them easily

import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";
import quizzes from "./quizzes.json";
import exams from "./exams.json";
import grades from "./grades.json";
import projects from "./projects.json";
import gradingWeights from "./gradingWeights.json";

export {
    courses,
    modules,
    assignments,
    users,
    enrollments,
    quizzes,
    exams,
    grades,
    projects,
    gradingWeights
};
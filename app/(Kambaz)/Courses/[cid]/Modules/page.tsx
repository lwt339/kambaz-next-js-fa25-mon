import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
    const modules = [
        {
            title: "Lecture 1 - Building React User Interfaces with HTML, Assignment 1, Setting Up the Dev",
            lessons: [
                "LEARNING OBJECTIVES",
                "Introduction to the course",
                "What is Web Development?",
                "Setting up the Development Environment",
                "Creating a React Web Application",
                "Getting started with the Assignment 1",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 1 - Building Next.js User Interfaces with HTML",
                "INTRO AND SETTING UP DEVELOPMENT ENVIRONMENT",
                "Introduction to Web Development",
                "Installing Node.js",
                "Creating a Next.js React Application",
                "Commit your source to GitHub.com",
                "Deploying to Vercel",
                "ASSIGNMENT 1 - HTML LAB EXERCISES",
                "Introduction to HTML and the DOM",
                "Formatting Web content with Headings and Paragraphs",
                "Formatting content with Lists and Tables",
                "Creating Web Forms",
                "Navigating with Anchors",
                "Single Page Navigation",
                "EVALUATIONS",
                "A1 - Sep 22 100 pts",
                "Final Project"
            ]
        },
        {
            title: "Lecture 2 - Prototyping the React Kambaz User Interface with HTML",
            lessons: [
                "LEARNING OBJECTIVES",
                "Learn how to create user interfaces with HTML",
                "Keep working on assignment 1",
                "Deploy the assignment to Netlify",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 1 - Building React User Interfaces with HTML",
                "ASSIGNMENT 1 - PROTOTYPING THE KAMBAZ REACT APPLICATION WITH HTML",
                "Implementing the Kambaz Account Screens",
                "Implementing the Kambaz Dashboard Screen",
                "Implementing the Kambaz Courses Screen",
                "Implementing the Kambaz Modules Screen",
                "Implementing the Kambaz Assignments Screens",
                "EVALUATIONS",
                "A1 - Sep 22 100 pts",
                "Final Project",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 3 - Styling Web Pages with CSS and Bootstrap, Assignment 2",
            lessons: [
                "LEARNING OBJECTIVES",
                "Introduction to CSS",
                "Selectors by tag ID, classes, and document structure",
                "Styling color and background color",
                "Styling dimensions and positions",
                "The box model - styling margins, borders, and paddings",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 2 - Styling Web Pages with CSS",
                "STYLING WEB PAGES WITH CASCADING STYLE SHEETS (CSS)",
                "Introduction to Cascading Style Sheets",
                "Styling with Colors",
                "The Box Model",
                "Size & Position",
                "Float",
                "Flex",
                "Rotating content & Gradient background",
                "ASSIGNMENT 2 - CSS & BOOTSTRAP LAB EXERCISES",
                "Assignment 2 - CSS Lab Exercises",
                "Assignment 2 - Bootstrap Lab Exercises",
                "EVALUATIONS",
                "Q1 - Sep 29 29 pts",
                "A2 - Oct 6 100 pts",
                "Final Project",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "Project - Social Network - Dec 7 100 pts",
                "REFERENCES",
                "MDN Learn CSS",
                "MDN CSS guidelines",
                "MDN The Box Model",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 4 - Styling Kambaz with CSS and Bootstrap",
            lessons: [
                "LEARNING OBJECTIVES",
                "CSS Libraries: Bootstrap, Tailwind",
                "Float and grid systems",
                "Media queries and responsive design",
                "Laying out content with Flex",
                "Final Project Requirements",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 2 - Styling Web Pages with CSS",
                "STYLING WEB PAGES WITH BOOTSTRAP",
                "Introduction to Bootstrap",
                "Grid System",
                "Bootstrap Navigation",
                "Bootstrap Navbar",
                "Bootstrap Tables",
                "Bootstrap Forms",
                "Showing and Hiding Content with Bootstrap",
                "Miscellaneous Bootstrap Styles",
                "ASSIGNMENT 2 - STYLING THE KAMBAZ REACT WEB APPLICATION",
                "Assignment 2 - Styling the Kambaz React Web Application",
                "EVALUATIONS",
                "Q2 - Oct 6 23 pts",
                "A2 - Oct 6 100 pts",
                "Final Project",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "Project - Social Network - Dec 7 100 pts",
                "PROJECT",
                "Create project teams",
                "One of the team members should create a React.js project where the team will implement the final project",
                "The team member that created the React.js project should commit and push the code to a GitHub repository and invite the other team members to the repository as collaborators",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 5 - Creating Single Page Applications with React, Assignment 3",
            lessons: [
                "LEARNING OBJECTIVES",
                "Introduce the JavaScript programming language",
                "JavaScript Functions and Datastructures",
                "Dynamic Styling",
                "Parameterizing Components",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 3 - Creating Single Page Applications with React",
                "JAVASCRIPT SLIDES",
                "Introduction to JavaScript",
                "ES6 Variables and Functions",
                "ES6 Arrays and Strings",
                "ES6 Object and Array Destructing",
                "ES6 Modules and Classes",
                "Dynamic Styling",
                "Parameterizing Components",
                "EVALUATIONS",
                "Q3 - Oct 13 32 pts",
                "A3 - Oct 20 100 pts",
                "Final Project",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "Project - Social Network - Dec 7 100 pts",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 6 - Implementing a Data Driven Kambaz Application",
            lessons: [
                "LEARNING OBJECTIVES",
                "Importing Bootstrap, className, CSS expressions",
                "Implementing Navigating with React Router",
                "Encoding parameters in routes",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 3 - Creating Single Page Applications with React",
                "SLIDES",
                "Hello World React Web Application",
                "Using Bootstrap in a React Web Application",
                "Parameterizing React Components",
                "Rendering Dynamic Content in a React Application",
                "Working with Forms in React Web Applications",
                "Understanding React Routing",
                "EVALUATIONS",
                "Q4 - Oct 20 17 pts",
                "A3 - Oct 20 100 pts",
                "Implementing a Data Driven Kambaz Application",
                "Final Project",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "Project - Social Network - Dec 7 100 pts",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 7 - Maintaining State in React Applications, Assignment 4",
            lessons: [
                "LEARNING OBJECTIVES",
                "Maintain state in a React application",
                "Installing and configuring Redux",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 4 - Maintaining State in React Applications",
                "INTRODUCTION TO REDUX",
                "Hello Redux Hooks",
                "Hello Redux Connect",
                "Understanding React + Redux - A Trivial Example",
                "ASSIGNMENT 4 - MAINTAINING STATE IN REACT APPLICATIONS LAB EXERCISES",
                "Assignment 4 - Maintaining State in React Applications Lab Exercises",
                "EVALUATIONS",
                "Q5 - Oct 27 31 pts",
                "A4 - Nov 3 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "Project - Social Network - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE",
                "Maintaining State in React Applications, Assignment 4 - Part 1/2",
                "Maintaining State in React Applications, Assignment 4 - Part 2/2"
            ]
        },
        {
            title: "Lecture 8 - Adding State to the Kambaz User Interface, Exam 1",
            lessons: [
                "LEARNING OBJECTIVES",
                "Review material for Exam 1",
                "Exam 1",
                "Sharing data across components",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 4 - Maintaining State in React Applications",
                "SLIDES",
                "Implementing Stateful Kanbas",
                "A Hello World React + Redux Example",
                "Implementing a Simple React + Redux Counter",
                "Implementing a Widget List Editor Using React and Redux",
                "ASSIGNMENT 4 - IMPLEMENTING A DATA DRIVEN KAMBAZ APPLICATION",
                "Assignment 4 - Implementing a Data Driven Kambaz Application",
                "EVALUATIONS",
                "X1 - Nov 3 100 pts",
                "A4 - Nov 3 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Project - Kambaz Pazza - Dec 7 100 pts",
                "Project - Social Network - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE",
                "X1 Review",
                "X1.pdf"
            ]
        },
        {
            title: "Lecture 9 - Implementing RESTful APIs with Express.js, Assignment 5",
            lessons: [
                "LEARNING OBJECTIVES",
                "Creating an HTTP server with Node.js",
                "Passing data to the server in a queries, path, and body",
                "Responding to HTTP GET, POST, PUT, and DELETE requests",
                "Implementing RESTful Web services",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 5 - Implementing RESTful Web APIs with Express.js",
                "CREATING HTTP SERVERS WITH NODE.JS AND EXPRESS.JS",
                "Implementing HTTP Web APIs with Node & Express",
                "Implementing RESTful Web APIs with Asynchronous JavaScript and XML (AJAX)",
                "Integrating React with a Movie API - OPTIONAL",
                "ASSIGNMENT 5 - IMPLEMENTING RESTFUL APIS WITH EXPRESS.JS LAB EXERCISES",
                "Assignment 5 - Implementing RESTful APIs with Express.js Lab Exercises",
                "EVALUATIONS",
                "Q6 - Nov 10 18 pts",
                "A5 - Nov 17 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE",
                "Implementing RESTful Web APIs with Node.js and Express"
            ]
        },
        {
            title: "Lecture 10 - Implementing the Kambaz Node.js HTTP Server",
            lessons: [
                "LEARNING OBJECTIVES",
                "Learn how to use Cookies to remember a user's identity",
                "Installing and configuring express session",
                "Storing and retrieving session data",
                "Implementing user registration",
                "Implementing a user profile",
                "Implementing user login and logout",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 5 - Implementing RESTful Web APIs with Express.js",
                "SLIDES",
                "Maintaining Session in Node.js Applications",
                "Implementing a login, register, and profile REST API with Node.js Express",
                "EVALUATIONS",
                "Q7 - Nov 17 20 pts",
                "A5 - Nov 17 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE",
                "A5 - Implementing Authentication RESTful Web API for Kanbas - SP25",
                "A5 - Implementing the Courses RESTful Web API for Kanbas",
                "A5 - Implementing the Modules RESTful Web API for Kanbas"
            ]
        },
        {
            title: "Lecture 11 - Integrating React with MongoDB, Assignment 6",
            lessons: [
                "LEARNING OBJECTIVES",
                "Install and configure a database",
                "Interacting with a database with a database client",
                "Store and retrieve data to and from a database",
                "Integrating Node.js applications with a database",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 6 - Integrating React with MongoDB",
                "SLIDES",
                "Installing and Configuring MongoDB",
                "Integrating Node.js applications to MongoDB with Mongoose",
                "Hosting a remote MongoDB database in Mongo Atlas",
                "EVALUATIONS",
                "Q8 - Nov 24 25 pts",
                "A6 - Dec 1 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE",
                "Integrating React, Node, and MongoDB, part 1",
                "Integrating React, Node, and MongoDB, part 2",
                "Integrating React with MongoDB"
            ]
        },
        {
            title: "Lecture 12 - Adding a Database to the Kambaz Web Application",
            lessons: [
                "LEARNING OBJECTIVES",
                "Demonstrate implementing domain objects",
                "Demonstrate implementing relations between domain objects",
                "Demonstrate implementing many to many and one to many relations",
                "Demonstrate implementing relations between users and domain objects",
                "Demonstrate implementing relations between users",
                "READING",
                "Developing Full Stack Next.js Web Applications - Chapter 6 - Integrating React with MongoDB",
                "EVALUATIONS",
                "Q9 - Dec 1 38 pts",
                "A6 - Dec 1 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE VIDEO LECTURES",
                "Reviewing Kanbas People Screen Implementation",
                "Configuring Remote Atlas MongoDB",
                "Configuring Remote Atlas MongoDB - Part 2",
                "Implementing a Signin and Profile Screen",
                "Implementing Signup and Signout",
                "Implementing Multiple User Signin using Express Session",
                "Handling and Displaying Server Errors in a React Web Client Application",
                "Caching User Session in React using Redux",
                "Protecting Screens with User Session",
                "Implementing One to Many and Many to Many Relationships SP25"
            ]
        },
        {
            title: "Lecture 13 - Integrating with Web APIs",
            lessons: [
                "LEARNING OBJECTIVES",
                "Demonstrate integrating to a 3rd party API",
                "Build an application around an API",
                "SLIDES",
                "Integrating with the YouTube video API",
                "Integrating with the Napster music API",
                "Integrating with the OMDB movie API",
                "EVALUATIONS",
                "Q10 - Dec 8 20 pts",
                "A6 - Dec 1 100 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Final Project",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 14 - Adding AI to a Web Application: ChatGPT",
            lessons: [
                "LEARNING OBJECTIVES",
                "Demonstrate integrating with AI resources",
                "SLIDES",
                "Integrating with the ChatGPT API",
                "Integrating with the OMDB movie API",
                "EVALUATIONS",
                "Final Project",
                "YOUTUBE"
            ]
        },
        {
            title: "Lecture 15 - Exam 2, Project Due/Demos",
            lessons: [
                "LEARNING OBJECTIVES",
                "Continue working on the project demo",
                "Project Demos",
                "READING",
                "EXAM 2 SAMPLE QUESTIONS.pdf",
                "SLIDES",
                "EVALUATIONS",
                "X2 - Dec 8 103 pts",
                "Project - Kambaz Quizzes - Dec 7 100 pts",
                "Final Project",
                "BiliBili"
            ]
        }
    ];

    return (
        <div id="wd-modules">
            <ModulesControls />
            <br /><br /><br />

            <ListGroup className="rounded-0">
                {modules.map((module, index) => (
                    <ListGroupItem key={index} className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {module.title}
                            <ModuleControlButtons />
                        </div>
                        <ListGroup className="wd-lessons rounded-0">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <ListGroupItem key={lessonIndex} className="wd-lesson p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3" />
                                    {lesson}
                                    <LessonControlButtons />
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
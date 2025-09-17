export default function Modules() {
  return (
    <div id="wd-modules">
      <button id="wd-collapse-all">Collapse All</button>
      <button id="wd-view-progress">View Progress</button>
      <button id="wd-publish-all">Publish All</button>
      <button id="wd-add-module">+ Module</button>
      <br /><br />
      
      <ul id="wd-modules-list">
        {/* Lecture 1 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 1 - Building React User Interfaces with HTML, Assignment 1, Setting Up the Dev</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">What is Web Development?</li>
                <li className="wd-content-item">Setting up the Development Environment</li>
                <li className="wd-content-item">Creating a React Web Application</li>
                <li className="wd-content-item">Getting started with the Assignment 1</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 1 - Building Next.js User Interfaces with HTML</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">INTRO AND SETTING UP DEVELOPMENT ENVIRONMENT</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Installing Node.js</li>
                <li className="wd-content-item">Creating a Next.js React Application</li>
                <li className="wd-content-item">Commit your source to GitHub.com</li>
                <li className="wd-content-item">Deploying to Vercel</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 1 - HTML LAB EXERCISES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to HTML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings and Paragraphs</li>
                <li className="wd-content-item">Formatting content with Lists and Tables</li>
                <li className="wd-content-item">Creating Web Forms</li>
                <li className="wd-content-item">Navigating with Anchors</li>
                <li className="wd-content-item">Single Page Navigation</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">A1 - Sep 22 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
          </ul>
        </li>
        
        {/* Lecture 2 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 2 - Prototyping the React Kambaz User Interface with HTML</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Keep working on assignment 1</li>
                <li className="wd-content-item">Deploy the assignment to Netlify</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 1 - Building React User Interfaces with HTML</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 1 - PROTOTYPING THE KAMBAZ REACT APPLICATION WITH HTML</span>
              <ul className="wd-content">
                <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
                <li className="wd-content-item">Implementing the Kambaz Dashboard Screen</li>
                <li className="wd-content-item">Implementing the Kambaz Courses Screen</li>
                <li className="wd-content-item">Implementing the Kambaz Modules Screen</li>
                <li className="wd-content-item">Implementing the Kambaz Assignments Screens</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">A1 - Sep 22 100 pts</li>
                <li className="wd-content-item">Final Project</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 3 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 3 - Styling Web Pages with CSS and Bootstrap, Assignment 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                <li className="wd-content-item">Styling color and background color</li>
                <li className="wd-content-item">Styling dimensions and positions</li>
                <li className="wd-content-item">The box model - styling margins, borders, and paddings</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 2 - Styling Web Pages with CSS</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">STYLING WEB PAGES WITH CASCADING STYLE SHEETS (CSS)</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Cascading Style Sheets</li>
                <li className="wd-content-item">Styling with Colors</li>
                <li className="wd-content-item">The Box Model</li>
                <li className="wd-content-item">Size & Position</li>
                <li className="wd-content-item">Float</li>
                <li className="wd-content-item">Flex</li>
                <li className="wd-content-item">Rotating content & Gradient background</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 2 - CSS & BOOTSTRAP LAB EXERCISES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Assignment 2 - CSS Lab Exercises</li>
                <li className="wd-content-item">Assignment 2 - Bootstrap Lab Exercises</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q1 - Sep 29 29 pts</li>
                <li className="wd-content-item">A2 - Oct 6 100 pts</li>
                <li className="wd-content-item">Final Project</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Social Network - Dec 7 100 pts</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">REFERENCES</span>
              <ul className="wd-content">
                <li className="wd-content-item">MDN Learn CSS</li>
                <li className="wd-content-item">MDN CSS guidelines</li>
                <li className="wd-content-item">MDN The Box Model</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 4 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 4 - Styling Kambaz with CSS and Bootstrap</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">CSS Libraries: Bootstrap, Tailwind</li>
                <li className="wd-content-item">Float and grid systems</li>
                <li className="wd-content-item">Media queries and responsive design</li>
                <li className="wd-content-item">Laying out content with Flex</li>
                <li className="wd-content-item">Final Project Requirements</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 2 - Styling Web Pages with CSS</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">STYLING WEB PAGES WITH BOOTSTRAP</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Bootstrap</li>
                <li className="wd-content-item">Grid System</li>
                <li className="wd-content-item">Bootstrap Navigation</li>
                <li className="wd-content-item">Bootstrap Navbar</li>
                <li className="wd-content-item">Bootstrap Tables</li>
                <li className="wd-content-item">Bootstrap Forms</li>
                <li className="wd-content-item">Showing and Hiding Content with Bootstrap</li>
                <li className="wd-content-item">Miscellaneous Bootstrap Styles</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 2 - STYLING THE KAMBAZ REACT WEB APPLICATION</span>
              <ul className="wd-content">
                <li className="wd-content-item">Assignment 2 - Styling the Kambaz React Web Application</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q2 - Oct 6 23 pts</li>
                <li className="wd-content-item">A2 - Oct 6 100 pts</li>
                <li className="wd-content-item">Final Project</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Social Network - Dec 7 100 pts</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">PROJECT</span>
              <ul className="wd-content">
                <li className="wd-content-item">Create project teams</li>
                <li className="wd-content-item">One of the team members should create a React.js project where the team will implement the final project</li>
                <li className="wd-content-item">The team member that created the React.js project should commit and push the code to a GitHub repository and invite the other team members to the repository as collaborators</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 5 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 5 - Creating Single Page Applications with React, Assignment 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduce the JavaScript programming language</li>
                <li className="wd-content-item">JavaScript Functions and Datastructures</li>
                <li className="wd-content-item">Dynamic Styling</li>
                <li className="wd-content-item">Parameterizing Components</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 3 - Creating Single Page Applications with React</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">JAVASCRIPT SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to JavaScript</li>
                <li className="wd-content-item">ES6 Variables and Functions</li>
                <li className="wd-content-item">ES6 Arrays and Strings</li>
                <li className="wd-content-item">ES6 Object and Array Destructing</li>
                <li className="wd-content-item">ES6 Modules and Classes</li>
                <li className="wd-content-item">Dynamic Styling</li>
                <li className="wd-content-item">Parameterizing Components</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q3 - Oct 13 32 pts</li>
                <li className="wd-content-item">A3 - Oct 20 100 pts</li>
                <li className="wd-content-item">Final Project</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Social Network - Dec 7 100 pts</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 6 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 6 - Implementing a Data Driven Kambaz Application</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Importing Bootstrap, className, CSS expressions</li>
                <li className="wd-content-item">Implementing Navigating with React Router</li>
                <li className="wd-content-item">Encoding parameters in routes</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 3 - Creating Single Page Applications with React</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Hello World React Web Application</li>
                <li className="wd-content-item">Using Bootstrap in a React Web Application</li>
                <li className="wd-content-item">Parameterizing React Components</li>
                <li className="wd-content-item">Rendering Dynamic Content in a React Application</li>
                <li className="wd-content-item">Working with Forms in React Web Applications</li>
                <li className="wd-content-item">Understanding React Routing</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q4 - Oct 20 17 pts</li>
                <li className="wd-content-item">A3 - Oct 20 100 pts</li>
                <li className="wd-content-item">Implementing a Data Driven Kambaz Application</li>
                <li className="wd-content-item">Final Project</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Social Network - Dec 7 100 pts</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 7 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 7 - Maintaining State in React Applications, Assignment 4</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Maintain state in a React application</li>
                <li className="wd-content-item">Installing and configuring Redux</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 4 - Maintaining State in React Applications</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">INTRODUCTION TO REDUX</span>
              <ul className="wd-content">
                <li className="wd-content-item">Hello Redux Hooks</li>
                <li className="wd-content-item">Hello Redux Connect</li>
                <li className="wd-content-item">Understanding React + Redux - A Trivial Example</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 4 - MAINTAINING STATE IN REACT APPLICATIONS LAB EXERCISES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Assignment 4 - Maintaining State in React Applications Lab Exercises</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q5 - Oct 27 31 pts</li>
                <li className="wd-content-item">A4 - Nov 3 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Social Network - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
              <ul className="wd-content">
                <li className="wd-content-item">Maintaining State in React Applications, Assignment 4 - Part 1/2</li>
                <li className="wd-content-item">Maintaining State in React Applications, Assignment 4 - Part 2/2</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Lecture 8 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 8 - Adding State to the Kambaz User Interface, Exam 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Review material for Exam 1</li>
                <li className="wd-content-item">Exam 1</li>
                <li className="wd-content-item">Sharing data across components</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 4 - Maintaining State in React Applications</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Implementing Stateful Kanbas</li>
                <li className="wd-content-item">A Hello World React + Redux Example</li>
                <li className="wd-content-item">Implementing a Simple React + Redux Counter</li>
                <li className="wd-content-item">Implementing a Widget List Editor Using React and Redux</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 4 - IMPLEMENTING A DATA DRIVEN KAMBAZ APPLICATION</span>
              <ul className="wd-content">
                <li className="wd-content-item">Assignment 4 - Implementing a Data Driven Kambaz Application</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">X1 - Nov 3 100 pts</li>
                <li className="wd-content-item">A4 - Nov 3 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Pazza - Dec 7 100 pts</li>
                <li className="wd-content-item">Project - Social Network - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
              <ul className="wd-content">
                <li className="wd-content-item">X1 Review</li>
                <li className="wd-content-item">X1.pdf</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Lecture 9 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 9 - Implementing RESTful APIs with Express.js, Assignment 5</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item">Passing data to the server in a queries, path, and body</li>
                <li className="wd-content-item">Responding to HTTP GET, POST, PUT, and DELETE requests</li>
                <li className="wd-content-item">Implementing RESTful Web services</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 5 - Implementing RESTful Web APIs with Express.js</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">CREATING HTTP SERVERS WITH NODE.JS AND EXPRESS.JS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Implementing HTTP Web APIs with Node & Express</li>
                <li className="wd-content-item">Implementing RESTful Web APIs with Asynchronous JavaScript and XML (AJAX)</li>
                <li className="wd-content-item">Integrating React with a Movie API - OPTIONAL</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 5 - IMPLEMENTING RESTFUL APIS WITH EXPRESS.JS LAB EXERCISES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Assignment 5 - Implementing RESTful APIs with Express.js Lab Exercises</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q6 - Nov 10 18 pts</li>
                <li className="wd-content-item">A5 - Nov 17 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
              <ul className="wd-content">
                <li className="wd-content-item">Implementing RESTful Web APIs with Node.js and Express</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Lecture 10 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 10 - Implementing the Kambaz Node.js HTTP Server</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to use Cookies to remember a user's identity</li>
                <li className="wd-content-item">Installing and configuring express session</li>
                <li className="wd-content-item">Storing and retrieving session data</li>
                <li className="wd-content-item">Implementing user registration</li>
                <li className="wd-content-item">Implementing a user profile</li>
                <li className="wd-content-item">Implementing user login and logout</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 5 - Implementing RESTful Web APIs with Express.js</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Maintaining Session in Node.js Applications</li>
                <li className="wd-content-item">Implementing a login, register, and profile REST API with Node.js Express</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q7 - Nov 17 20 pts</li>
                <li className="wd-content-item">A5 - Nov 17 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
              <ul className="wd-content">
                <li className="wd-content-item">A5 - Implementing Authentication RESTful Web API for Kanbas - SP25</li>
                <li className="wd-content-item">A5 - Implementing the Courses RESTful Web API for Kanbas</li>
                <li className="wd-content-item">A5 - Implementing the Modules RESTful Web API for Kanbas</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Lecture 11 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 11 - Integrating React with MongoDB, Assignment 6</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Install and configure a database</li>
                <li className="wd-content-item">Interacting with a database with a database client</li>
                <li className="wd-content-item">Store and retrieve data to and from a database</li>
                <li className="wd-content-item">Integrating Node.js applications with a database</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 6 - Integrating React with MongoDB</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Installing and Configuring MongoDB</li>
                <li className="wd-content-item">Integrating Node.js applications to MongoDB with Mongoose</li>
                <li className="wd-content-item">Hosting a remote MongoDB database in Mongo Atlas</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q8 - Nov 24 25 pts</li>
                <li className="wd-content-item">A6 - Dec 1 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE</span>
              <ul className="wd-content">
                <li className="wd-content-item">Integrating React, Node, and MongoDB, part 1</li>
                <li className="wd-content-item">Integrating React, Node, and MongoDB, part 2</li>
                <li className="wd-content-item">Integrating React with MongoDB</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Lecture 12 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 12 - Adding a Database to the Kambaz Web Application</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Demonstrate implementing domain objects</li>
                <li className="wd-content-item">Demonstrate implementing relations between domain objects</li>
                <li className="wd-content-item">Demonstrate implementing many to many and one to many relations</li>
                <li className="wd-content-item">Demonstrate implementing relations between users and domain objects</li>
                <li className="wd-content-item">Demonstrate implementing relations between users</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack Next.js Web Applications - Chapter 6 - Integrating React with MongoDB</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q9 - Dec 1 38 pts</li>
                <li className="wd-content-item">A6 - Dec 1 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE VIDEO LECTURES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Reviewing Kanbas People Screen Implementation</li>
                <li className="wd-content-item">Configuring Remote Atlas MongoDB</li>
                <li className="wd-content-item">Configuring Remote Atlas MongoDB - Part 2</li>
                <li className="wd-content-item">Implementing a Signin and Profile Screen</li>
                <li className="wd-content-item">Implementing Signup and Signout</li>
                <li className="wd-content-item">Implementing Multiple User Signin using Express Session</li>
                <li className="wd-content-item">Handling and Displaying Server Errors in a React Web Client Application</li>
                <li className="wd-content-item">Caching User Session in React using Redux</li>
                <li className="wd-content-item">Protecting Screens with User Session</li>
                <li className="wd-content-item">Implementing One to Many and Many to Many Relationships SP25</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Lecture 13 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 13 - Integrating with Web APIs</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Demonstrate integrating to a 3rd party API</li>
                <li className="wd-content-item">Build an application around an API</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Integrating with the YouTube video API</li>
                <li className="wd-content-item">Integrating with the Napster music API</li>
                <li className="wd-content-item">Integrating with the OMDB movie API</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Q10 - Dec 8 20 pts</li>
                <li className="wd-content-item">A6 - Dec 1 100 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 14 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 14 - Adding AI to a Web Application: ChatGPT</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Demonstrate integrating with AI resources</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Integrating with the ChatGPT API</li>
                <li className="wd-content-item">Integrating with the OMDB movie API</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">YOUTUBE </span>
            </li>
          </ul>
        </li>

        {/* Lecture 15 */}
        <li className="wd-module">
          <div className="wd-title">Lecture 15 - Exam 2, Project Due/Demos</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Continue working on the project demo</li>
                <li className="wd-content-item">Project Demos</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">EXAM 2 SAMPLE QUESTIONS.pdf</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">X2 - Dec 8 103 pts</li>
                <li className="wd-content-item">Project - Kambaz Quizzes - Dec 7 100 pts</li>
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title"> BiliBili </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default function Modules() {
  return (
    <div id="wd-modules">
      <button id="wd-collapse-all">Collapse All</button>
      <button id="wd-view-progress">View Progress</button>
      <button id="wd-publish-all">Publish All</button>
      <button id="wd-add-module">+ Module</button>
      <br /><br />
      
      <ul id="wd-modules-list">
        {/* Module 1: Week 1, Lecture 1 */}
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
                <li className="wd-content-item">Setting up the Development Environment</li>
                <li className="wd-content-item">Creating a React Web Application</li>
                <li className="wd-content-item">Getting started with Assignment 1</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces with HTML</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item">Creating a React Application</li>
              </ul>
            </li>
          </ul>
        </li>
        
        {/* Module 2: Week 1, Lecture 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Deploy the assignment to Netlify</li>
                <li className="wd-content-item">Keep working on Assignment 1</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to HTML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings and Paragraphs</li>
                <li className="wd-content-item">Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>
        
        {/* Module 3: Week 2, Lecture 3 */}
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 3 - Styling User Interfaces with CSS</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to style user interfaces with CSS</li>
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                <li className="wd-content-item">Styling color and background color</li>
                <li className="wd-content-item">Styling dimensions and positions</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Styling Web Pages with CSS</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Cascading Style Sheets</li>
                <li className="wd-content-item">Styling with Colors</li>
                <li className="wd-content-item">The Box Model</li>
                <li className="wd-content-item">Size & Position</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 4: Week 2, Lecture 4 */}
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 4 - Styling Kambaz with CSS and Bootstrap</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">CSS Libraries: Bootstrap, Tailwind</li>
                <li className="wd-content-item">Float and grid systems</li>
                <li className="wd-content-item">Media queries and responsive design</li>
                <li className="wd-content-item">Laying out content with Flex</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Bootstrap</li>
                <li className="wd-content-item">Grid System</li>
                <li className="wd-content-item">Bootstrap Navigation</li>
                <li className="wd-content-item">Bootstrap Forms</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 5: Week 3, Lecture 5 */}
        <li className="wd-module">
          <div className="wd-title">Week 3, Lecture 5 - JavaScript</div>
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
                <li className="wd-content-item">Full Stack Developer - Chapter 3 - Creating Single Page Applications with React</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 6: Week 3, Lecture 6 */}
        <li className="wd-module">
          <div className="wd-title">Week 3, Lecture 6 - Implementing a Data Driven Kambaz Application</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Importing Bootstrap, className, CSS expressions</li>
                <li className="wd-content-item">Implementing Navigating with React Router</li>
                <li className="wd-content-item">Encoding parameters in routes</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 7: Week 4 */}
        <li className="wd-module">
          <div className="wd-title">Week 4 - Maintaining State in React Applications</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Maintain state in a React application</li>
                <li className="wd-content-item">Installing and configuring Redux</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 8: Week 5 */}
        <li className="wd-module">
          <div className="wd-title">Week 5 - RESTful Web APIs</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item">Implementing RESTful Web services</li>
                <li className="wd-content-item">Responding to HTTP GET, POST, PUT, and DELETE requests</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 9: Week 6 */}
        <li className="wd-module">
          <div className="wd-title">Week 6 - MongoDB Integration</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Install and configure a database</li>
                <li className="wd-content-item">Store and retrieve data to and from a database</li>
                <li className="wd-content-item">Integrating Node.js applications with a database</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
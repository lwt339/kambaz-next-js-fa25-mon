export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input 
        placeholder="Search for Assignments" 
        id="wd-search-assignment" 
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <br /><br />
      
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </a>
          <br />
          Multiple Modules | Not available until May 6 at 12:00am |
          <br />
          Due May 13 at 11:59pm | 100 pts
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/124" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          Multiple Modules | Not available until May 13 at 12:00am |
          <br />
          Due May 20 at 11:59pm | 100 pts
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/125" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          Multiple Modules | Not available until May 20 at 12:00am |
          <br />
          Due May 27 at 11:59pm | 100 pts
        </li>
      </ul>
      
      <h3>QUIZZES 10% of Total</h3>
      <ul>
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/126" className="wd-assignment-link">
            Q1 - HTML
          </a>
          <br />
          Multiple Choice | 1 Question | 10 pts
          <br />
          Due May 13 at 11:59pm
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/127" className="wd-assignment-link">
            Q2 - CSS
          </a>
          <br />
          Multiple Choice | 1 Question | 10 pts
          <br />
          Due May 20 at 11:59pm
        </li>
      </ul>
      
      <h3>EXAMS 15% of Total</h3>
      <ul>
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/128" className="wd-assignment-link">
            Midterm Exam
          </a>
          <br />
          Multiple Choice | 50 Questions | 100 pts
          <br />
          Due May 30 at 11:59pm
        </li>
        
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/129" className="wd-assignment-link">
            Final Exam
          </a>
          <br />
          Multiple Choice | 50 Questions | 100 pts
          <br />
          Due June 15 at 11:59pm
        </li>
      </ul>
      
      <h3>PROJECT 35% of Total</h3>
      <ul>
        <li className="wd-assignment-list-item">
          <a href="/Courses/5610/Assignments/130" className="wd-assignment-link">
            Final Project
          </a>
          <br />
          Group Project | Build a Full Stack Application | 350 pts
          <br />
          Due June 10 at 11:59pm
        </li>
      </ul>
    </div>
  );
}
import Link from "next/link";

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
          <Link href="/Courses/5610/Assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <br />
          Multiple Modules | Submitting a website url |
          <br />
          Due Sep 22 at 11:59pm | 100 pts
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/124" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <br />
          Multiple Modules | Submitting a website url |
          <br />
          Due Oct 6 at 11:59pm | 100 pts
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/125" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT + Routing
          </Link>
          <br />
          Multiple Modules | Not available until Sep 20 at 12:00am | Submitting a website url
          <br />
          Due Oct 20 at 11:59pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/126" className="wd-assignment-link">
            A4 - State + Redux 
          </Link>
          <br />
          Multiple Modules | Submitting a website url
          <br />
          Due Nov 3 at 11:59pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/127" className="wd-assignment-link">
            A5 - Node + Session
          </Link>
          <br />
          Multiple Modules | Submitting a website url
          <br />
          Due Nov 17 at 11:59pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/128" className="wd-assignment-link">
            A6 - MongoDB + Mongoose
          </Link>
          <br />
          Multiple Modules | Submitting a website url
          <br />
          Due Dec 1 at 11:59pm | 100 pts
        </li>
      </ul>
      
      <h3>QUIZZES 10% of Total</h3>
      <ul>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/129" className="wd-assignment-link">
            Q1 - HTML
          </Link>
          <br />
          Multiple Choice | 11 Question | Not available until Sep 22 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Sep 29 at 11:59pm | 29 pts
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/130" className="wd-assignment-link">
            Q2 - CSS
          </Link>
          <br />
          Multiple Choice | 6 Question | Not available until Sep 29 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Oct 6 at 11:59pm | 23 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/132" className="wd-assignment-link">
            Q3 - CSS
          </Link>
          <br />
          Multiple Choice | 7 Question | Not available until Oct 6 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Oct 13 at 11:59pm | 32 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/134" className="wd-assignment-link">
            Q4 - JS
          </Link>
          <br />
          Multiple Choice | 3 Question | Not available until Oct 13 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Oct 20 at 11:59pm | 17 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/135" className="wd-assignment-link">
            Q5 - JS
          </Link>
          <br />
          Multiple Choice | 8 Question | Not available until Oct 20 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Oct 27 at 11:59pm | 31 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/136" className="wd-assignment-link">
            Q6 - Redux
          </Link>
          <br />
          Multiple Choice | 3 Question | Not available until Nov 3 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Nov 10 at 11:59pm | 18 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/137" className="wd-assignment-link">
            Q7 - Redux
          </Link>
          <br />
          Multiple Choice | 1 Question | Not available until Nov 10 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Nov 17 at 11:59pm | 20 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/138" className="wd-assignment-link">
            Q8 - Node
          </Link>
          <br />
          Multiple Choice | 4 Question | Not available until Nov 17 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Nov 24 at 11:59pm | 25 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/139" className="wd-assignment-link">
            Q9 - Node
          </Link>
          <br />
          Multiple Choice | 10 Question | Not available until Nov 24 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Dec 1 at 11:59pm | 38 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/140" className="wd-assignment-link">
            Q10 - Mongo
          </Link>
          <br />
          Multiple Choice | 2 Question | Not available until Dec 1 at 12:00am | Time Limit 20 Minutes
          <br />
          Due Dec 8 at 11:59pm | 20 pts
        </li>
      </ul>
      
      <h3>EXAMS 20% of Total</h3>
      <ul>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/151" className="wd-assignment-link">
            Exam 1 - A1-A3
          </Link>
          <br />
          Multiple Choice | 15 Questions | Not available until Oct 27 at 12:00am | Time Limit 100 Minutes
          <br />
          Due Nov 3 at 11:59pm | 100 pts
        </li>
        
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/152" className="wd-assignment-link">
            Exam 2 - A4-A6
          </Link>
          <br />
          Multiple Choice | 18 Questions | Not available until Dec 1 at 12:00am | Time Limit 100 Minutes
          <br />
          Due Dec 8 at 11:59pm | 103 pts
        </li>
      </ul>
      
      <h3>PROJECT 30% of Total</h3>
      <ul>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/5610/Assignments/160" className="wd-assignment-link">
            Final Project
          </Link>
          <br />
          Group Project | Kambaz Quizzes or Kambaz Pazza or Social Network | Submitting a text entry box or a website url
          <br />
          Due Dec 7 at 11:59pm | 350 pts
        </li>
      </ul>
    </div>
  );
}
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5610" className="wd-dashboard-course-link">
            <Image 
              src="/images/webdev.jpg" 
              width={200} 
              height={150} 
              alt="Web Development" 
            />
            <div>
              <h5>CS5610 Web Development</h5>
              <p className="wd-dashboard-course-title">
                Sites that are dynamic, data driven, and interactive. 
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5520" className="wd-dashboard-course-link">
            <Image 
              src="/images/mobileapp.jpg" 
              width={200} 
              height={150} 
              alt="Mobile Application Development" 
            />
            <div>
              <h5>CS5520 Mobile Application Development</h5>
              <p className="wd-dashboard-course-title">
                 Mobile phone or related platform.
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5800" className="wd-dashboard-course-link">
            <Image 
              src="/images/Algorithms.jpg" 
              width={200} 
              height={150} 
              alt="Algorithms" 
            />
            <div>
              <h5>CS5800 Algorithms</h5>
              <p className="wd-dashboard-course-title">
                Presents the mathematical techniques used for the design and analysis of computer algorithms.
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5150" className="wd-dashboard-course-link">
            <Image 
              src="/images/game.jpg" 
              width={200} 
              height={150} 
              alt="Game Artificial Intelligence" 
            />
            <div>
              <h5>CS5150 Game Artificial Intelligence</h5>
              <p className="wd-dashboard-course-title">
                Classical and modern approaches to artificial intelligence in digital games.
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5200" className="wd-dashboard-course-link">
            <Image 
              src="/images/database.jpg" 
              width={200} 
              height={150} 
              alt="Database Management Systems" 
            />
            <div>
              <h5>CS5200 Database Management Systems</h5>
              <p className="wd-dashboard-course-title">
                SQL and NoSQL Databases
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5600" className="wd-dashboard-course-link">
            <Image 
              src="/images/system.jpg" 
              width={200} 
              height={150} 
              alt="Computer Systems" 
            />
            <div>
              <h5>CS5600 Computer Systems</h5>
              <p className="wd-dashboard-course-title">
                Structure, components, design, implementation, and internal operation of computer systems
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/6510" className="wd-dashboard-course-link">
            <Image 
              src="/images/software.jpg" 
              width={200} 
              height={150} 
              alt="Advanced Software Development" 
            />
            <div>
              <h5>CS6510 Advanced Software Development</h5>
              <p className="wd-dashboard-course-title">
                 Academic concepts and practical experience of software design
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
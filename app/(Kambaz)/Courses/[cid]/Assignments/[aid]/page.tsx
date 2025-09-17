export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      
      <textarea id="wd-description" cols={50} rows={10} defaultValue={
        `The assignment is available online. Submit a link to the landing page of your Web 
application running on Netlify. The landing page should include the following: Your 
full name and section. Links to all relevant source code repositories. The Kambaz 
application should include a link to navigate back to the landing page.`
      } />
      <br /><br />
      
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
                <option value="LETTER">Letter Grade</option>
              </select>
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
                <option value="EXTERNAL">External Tool</option>
              </select>
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              Online Entry Options
            </td>
            <td>
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry"> Text Entry</label><br />
              
              <input type="checkbox" id="wd-website-url" defaultChecked />
              <label htmlFor="wd-website-url"> Website URL</label><br />
              
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings"> Media Recordings</label><br />
              
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation"> Student Annotation</label><br />
              
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload"> File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-attempts">Submission Attempts</label>
            </td>
            <td>
              <select id="wd-submission-attempts" defaultValue="Unlimited">
                <option value="Unlimited">Unlimited</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group-assignment">Group Assignment</label>
            </td>
            <td>
              <input type="checkbox" id="wd-group-assignment" />
              <label htmlFor="wd-group-assignment"> This is a Group Assignment</label>
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-peer-reviews">Peer Reviews</label>
            </td>
            <td>
              <input type="checkbox" id="wd-peer-reviews" />
              <label htmlFor="wd-peer-reviews"> Require Peer Reviews</label>
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" defaultValue="2025-09-22" />
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input type="date" id="wd-available-from" defaultValue="2025-09-08" />
            </td>
          </tr>
          
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input type="date" id="wd-available-until" defaultValue="2025-09-23" />
            </td>
          </tr>
        </tbody>
      </table>
      
      <hr />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
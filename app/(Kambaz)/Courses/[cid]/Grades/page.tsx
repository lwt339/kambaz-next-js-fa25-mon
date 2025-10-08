export default function GradesPage() {
    const grades = [
        { id: 1, assignment: "A1 - HTML & CSS Basics", dueDate: "Sep 22", status: "Submitted", score: "95", outOf: "100" },
        { id: 2, assignment: "Q1 - HTML Quiz", dueDate: "Sep 22", status: "Submitted", score: "23", outOf: "25" },
        { id: 3, assignment: "A2 - Bootstrap & Responsive Design", dueDate: "Oct 6", status: "Submitted", score: "92", outOf: "100" },
        { id: 4, assignment: "Q2 - CSS Quiz", dueDate: "Oct 6", status: "Not Submitted", score: "-", outOf: "25" },
        { id: 5, assignment: "A3 - JavaScript & React", dueDate: "Oct 20", status: "Not Available", score: "-", outOf: "100" }
    ];

    const calculatePercentage = (score: string, outOf: string) => {
        if (score === "-") return "-";
        return `${((parseFloat(score) / parseFloat(outOf)) * 100).toFixed(1)}%`;
    };

    return (
        <div id="wd-grades">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Grades</h3>
                <div>
                    <button className="btn btn-secondary me-2">
                        <i className="bi bi-file-earmark-arrow-down me-1"></i> Import
                    </button>
                    <button className="btn btn-secondary dropdown-toggle">
                        <i className="bi bi-gear me-1"></i> Settings
                    </button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Student Names</label>
                    <input type="text" className="form-control" placeholder="Search Students" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Assignment Names</label>
                    <input type="text" className="form-control" placeholder="Search Assignments" />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Assignment Name</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Out of</th>
                        <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {grades.map((grade) => (
                        <tr key={grade.id}>
                            <td>{grade.assignment}</td>
                            <td>{grade.dueDate}</td>
                            <td>
                  <span className={`badge ${
                      grade.status === "Submitted" ? "bg-success" :
                          grade.status === "Not Submitted" ? "bg-danger" :
                              "bg-secondary"
                  }`}>
                    {grade.status}
                  </span>
                            </td>
                            <td>{grade.score}</td>
                            <td>{grade.outOf}</td>
                            <td>{calculatePercentage(grade.score, grade.outOf)}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="fw-bold">
                        <td colSpan={3}>Current Grade</td>
                        <td colSpan={3}>210/350 (60.0%)</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
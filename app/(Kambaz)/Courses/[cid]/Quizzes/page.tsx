export default function QuizzesPage() {
    const quizzes = [
        {
            id: "Q1",
            title: "HTML Quiz",
            available: "Sep 15, 2025 at 12:00am",
            due: "Sep 22, 2025 at 11:59pm",
            points: 25,
            questions: 10,
            timeLimit: "30 minutes"
        },
        {
            id: "Q2",
            title: "CSS Quiz",
            available: "Sep 29, 2025 at 12:00am",
            due: "Oct 6, 2025 at 11:59pm",
            points: 25,
            questions: 12,
            timeLimit: "45 minutes"
        },
        {
            id: "Q3",
            title: "JavaScript Quiz",
            available: "Oct 13, 2025 at 12:00am",
            due: "Oct 20, 2025 at 11:59pm",
            points: 32,
            questions: 15,
            timeLimit: "60 minutes"
        }
    ];

    return (
        <div id="wd-quizzes">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="input-group w-50">
                    <input type="text" className="form-control" placeholder="Search for Quiz" />
                    <button className="btn btn-outline-secondary" type="button">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <button className="btn btn-danger">
                    <i className="bi bi-plus me-1"></i> Quiz
                </button>
            </div>

            <div className="list-group">
                <div className="list-group-item list-group-item-secondary">
                    <h5 className="mb-0">
                        <i className="bi bi-caret-down-fill me-2"></i>
                        QUIZZES
                    </h5>
                </div>
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-grip-vertical me-2"></i>
                                <i className="bi bi-patch-question text-info me-3"></i>
                                <div>
                                    <h6 className="mb-1">{quiz.title}</h6>
                                    <small className="text-muted">
                                        <strong>Available:</strong> {quiz.available} <br/>
                                        <strong>Due:</strong> {quiz.due} |
                                        <strong> {quiz.points} pts</strong> |
                                        <strong> {quiz.questions} Questions</strong> |
                                        <strong> {quiz.timeLimit}</strong>
                                    </small>
                                </div>
                            </div>
                            <div>
                                <i className="bi bi-check-circle text-success me-2"></i>
                                <i className="bi bi-three-dots-vertical"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
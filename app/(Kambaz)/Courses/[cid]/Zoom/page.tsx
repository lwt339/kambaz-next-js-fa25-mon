export default function ZoomPage() {
    const upcomingMeetings = [
        { id: 1, title: "Lecture - Week 7", date: "Oct 20, 2025", time: "2:00 PM - 3:30 PM" },
        { id: 2, title: "Office Hours", date: "Oct 21, 2025", time: "4:00 PM - 5:00 PM" },
        { id: 3, title: "Lab Review Session", date: "Oct 22, 2025", time: "1:00 PM - 2:00 PM" }
    ];

    return (
        <div id="wd-zoom">
            <h3>Zoom</h3>
            <div className="row">
                <div className="col-12">
                    <h4>Upcoming Meetings</h4>
                    <div className="list-group">
                        {upcomingMeetings.map((meeting) => (
                            <div key={meeting.id} className="list-group-item">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{meeting.title}</h5>
                                    <button className="btn btn-sm btn-primary">
                                        <i className="bi bi-camera-video me-1"></i>
                                        Join
                                    </button>
                                </div>
                                <p className="mb-1">
                                    <i className="bi bi-calendar me-2"></i>
                                    {meeting.date}
                                </p>
                                <small>
                                    <i className="bi bi-clock me-2"></i>
                                    {meeting.time}
                                </small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
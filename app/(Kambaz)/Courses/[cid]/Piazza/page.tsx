export default function PiazzaPage() {
    return (
        <div id="wd-piazza">
            <h3>Piazza</h3>
            <p className="text-muted">
                Course discussion forum for Q&A with instructors and peers.
            </p>
            <div className="alert alert-info mt-3">
                <i className="bi bi-info-circle me-2"></i>
                Piazza integration coming soon. Click here to access Piazza in a new tab.
            </div>
            <a
                href="https://piazza.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-3"
            >
                <i className="bi bi-box-arrow-up-right me-2"></i>
                Open Piazza
            </a>
        </div>
    );
}
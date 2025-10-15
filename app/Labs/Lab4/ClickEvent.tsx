// File: app/Labs/Lab4/ClickEvent.tsx
// Shows how to handle button clicks

export default function ClickEvent() {
    // Simple alert when button is clicked
    const hello = () => {
        alert("Hello World!");
    };

    // Alert that takes a parameter
    const lifeIs = (good: string) => {
        alert(`Life is ${good}`);
    };

    return (
        <div id="wd-click-event">
            <h2>Click Event</h2>
            <div className="p-3 bg-white border rounded">
                {/* Simple click handler */}
                <button
                    onClick={hello}
                    id="wd-hello-world-click"
                    className="btn btn-primary me-2"
                >
                    Hello World!
                </button>

                {/* Need arrow function to pass parameters */}
                <button
                    onClick={() => lifeIs("Good!")}
                    id="wd-life-is-good-click"
                    className="btn btn-success me-2"
                >
                    Life is Good!
                </button>

                {/* Multiple function calls in one handler */}
                <button
                    onClick={() => {
                        hello();
                        lifeIs("Great!");
                    }}
                    id="wd-life-is-great-click"
                    className="btn btn-warning"
                >
                    Life is Great!
                </button>
            </div>
            <hr />
        </div>
    );
}
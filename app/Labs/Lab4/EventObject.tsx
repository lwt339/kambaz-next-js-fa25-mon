// app/Labs/Lab4/EventObject.tsx
import { useState } from "react";

export default function EventObject() {
    // State to store the event object for display
    const [event, setEvent] = useState(null);

    // Handler that captures and processes the event object
    const handleClick = (e: any) => {
        // Replace target with its HTML to avoid circular reference issues
        e.target = e.target.outerHTML;
        // Remove the view property to avoid circular reference
        delete e.view;
        // Store the event object so we can display it
        setEvent(e);
    };

    return (
        <div >
            <h2>Event Object</h2>
            <div className="p-3 bg-white border rounded">
            <button
                onClick={(e) => handleClick(e)}
                className="btn btn-primary"
                id="wd-display-event-obj-click"
            >
                Display Event Object
            </button>

            {/* Display the event object as formatted JSON */}
            <pre>{JSON.stringify(event, null, 2)}</pre>
            </div>
            <hr />
        </div>
    );
}
// File: app/Labs/Lab4/EventObject.tsx
// Shows how event objects work when you click buttons

"use client";

import { useState } from "react";

export default function EventObject() {
    // Keep track of the event object so we can display it
    const [event, setEvent] = useState<Record<string, unknown> | null>(null);

    // When button is clicked, capture all the event info
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Create a safe copy by manually extracting properties
        const eventData: Record<string, unknown> = {};

        // Loop through all event properties safely
        for (const key in e) {
            if (Object.prototype.hasOwnProperty.call(e, key)) {
                const value = e[key as keyof typeof e];

                // Skip functions and the view property
                if (typeof value === 'function' || key === 'view') {
                    continue;
                }

                // Copy the property value
                eventData[key] = value as unknown;
            }
        }

        // Now safely convert target to HTML string and set currentTarget to null
        eventData.target = (e.target as HTMLElement).outerHTML;
        eventData.currentTarget = null;

        // Simplify nativeEvent to avoid circular references
        eventData.nativeEvent = {
            isTrusted: e.nativeEvent.isTrusted
        };

        // Save the event so we can show it below
        setEvent(eventData);
    };

    return (
        <div>
            <h2>Event Object</h2>
            <div className="p-3 bg-white border rounded">
                <button
                    onClick={(e) => handleClick(e)}
                    className="btn btn-primary"
                    id="wd-display-event-obj-click"
                >
                    Display Event Object
                </button>

                {/* Show the event object as nicely formatted JSON */}
                <pre>{JSON.stringify(event, null, 2)}</pre>
            </div>
            <hr />
        </div>
    );
}
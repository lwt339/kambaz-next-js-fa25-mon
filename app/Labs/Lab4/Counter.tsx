// app/Labs/Lab4/Counter.tsx
import { useState } from "react";

export default function Counter() {
    // Using useState to manage the counter value
    // This ensures DOM updates when state changes
    const [count, setCount] = useState(7);

    // Log to console to see state changes
    console.log(count);

    return (
        <div id="wd-counter-use-state" >
            <h2>Counter: {count}</h2>
            <div className="p-3 bg-white border rounded">
            {/* Increment the counter using the setter function */}
            <button
                onClick={() => setCount(count + 1)}
                id="wd-counter-up-click"
                className="btn btn-success me-2"
            >
                Up
            </button>

            {/* Decrement the counter using the setter function */}
            <button
                onClick={() => setCount(count - 1)}
                id="wd-counter-down-click"
                className="btn btn-danger"
            >
                Down
            </button>
            </div>
            <hr />
        </div>
    );
}
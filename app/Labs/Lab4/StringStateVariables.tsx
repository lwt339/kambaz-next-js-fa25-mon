// app/Labs/Lab4/StringStateVariables.tsx
import { useState } from "react";

export default function StringStateVariables() {
    // Managing a string state variable for first name
    const [firstName, setFirstName] = useState("John");

    return (
        <div id="wd-string-state-variables" >
            <h2>String State Variables</h2>
            <div className="p-3 bg-white border rounded">

            {/* Display the current value of the string state */}
            <p>{firstName}</p>

            {/* Input field that updates the string state on every keystroke */}
            <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            </div>
            <hr />
        </div>
    );
}
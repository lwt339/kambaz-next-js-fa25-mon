// app/Labs/Lab4/BooleanStateVariables.tsx
import { useState } from "react";

export default function BooleanStateVariables() {
    // Managing a boolean state variable for a "done" status
    const [done, setDone] = useState(true);

    return (
        <div id="wd-boolean-state-variables" >
            <h2>Boolean State Variables</h2>
            <div className="p-3 bg-white border rounded">
            {/* Conditionally render text based on boolean value */}
            <p>{done ? "Done" : "Not done"}</p>

            {/* Checkbox that toggles the boolean state */}
            <label className="form-control">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={() => setDone(!done)}
                />
                {" "}Done
            </label> <br/>

            {/* Conditionally render an alert box when done is true */}
            {done && (
                <div className="alert alert-success">
                    Yay! you are done
                </div>
            )}
            </div>
            <hr />
        </div>
    );
}
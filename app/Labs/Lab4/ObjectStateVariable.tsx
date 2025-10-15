// app/Labs/Lab4/ObjectStateVariable.tsx
import { useState } from "react";

export default function ObjectStateVariable() {
    // Initialize an object state with name and age properties
    const [person, setPerson] = useState({
        name: "Peter",
        age: 24
    });

    return (
        <div id="wd-object-state-variables" >
            <h2>Object State Variables</h2>
            <div className="p-3 bg-white border rounded">

            {/* Display the object as formatted JSON to see changes in real-time */}
            <pre>{JSON.stringify(person, null, 2)}</pre>

            {/* Input field for updating the name property */}
            <input
                type="text"
                className="form-control mb-2"
                value={person.name}
                onChange={(e) => setPerson({
                    ...person, // Spread existing object properties
                    name: e.target.value // Override just the name property
                })}
                placeholder="Name"
            />

            {/* Input field for updating the age property */}
            <input
                type="number"
                className="form-control"
                value={person.age}
                onChange={(e) => setPerson({
                    ...person, // Spread existing object properties
                    age: parseInt(e.target.value) // Override just the age property
                })}
                placeholder="Age"
            />
            </div>
            <hr />
        </div>
    );
}
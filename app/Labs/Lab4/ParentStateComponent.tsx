import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

export default function ParentStateComponent() {
    // State managed by the parent component
    const [counter, setCounter] = useState(123);

    return (
        <div id="wd-parent-state" >
            <h2>Sharing State Between Components</h2>
            <div className="p-3 bg-white border rounded">
            <h3>Parent Counter: {counter}</h3>


            {/* Pass state and setter function to child component as props */}
            <ChildStateComponent
                counter={counter}
                setCounter={setCounter}
            />
            </div>
            <hr />
        </div>
    );
}
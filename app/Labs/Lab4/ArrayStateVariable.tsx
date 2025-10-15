// app/Labs/Lab4/ArrayStateVariable.tsx
import { useState } from "react";

export default function ArrayStateVariable() {
    // Initialize an array state with some default numbers
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    // Function to add a random element to the array
    const addElement = () => {
        // Create new array with spread operator and add random number at the end
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    // Function to delete an element by its index
    const deleteElement = (index: number) => {
        // Filter out the element at the specified index
        setArray(array.filter((item, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <div className="p-3 bg-white border rounded">

            {/* Button to add a new random element */}
            <button
                onClick={addElement}
                className="btn btn-success mb-3"
                id="wd-add-element-click"
            >
                Add Element
            </button>

            {/* Display array elements with delete buttons */}
            <ul className="list-group">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{item}</span>
                        <button
                            onClick={() => deleteElement(index)}
                            className="btn btn-sm btn-danger"
                            id="wd-delete-element-click"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            </div>
            <hr />
        </div>
    );
}
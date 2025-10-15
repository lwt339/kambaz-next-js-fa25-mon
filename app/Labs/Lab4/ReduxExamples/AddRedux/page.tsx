"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";

interface LabsRootState {
    addReducer: {
        sum: number;
    };
}

export default function AddRedux() {
    // Local state for inputs
    const [a, setA] = useState<number>(12);
    const [b, setB] = useState<number>(23);

    // Get sum from Redux
    const { sum } = useSelector((state: LabsRootState) => state.addReducer);
    const dispatch = useDispatch();

    return (
        <div id="wd-add-redux">
            <h3>Add Redux</h3>
            <div className="p-3 bg-white border rounded mb-3">
                <h4>{a} + {b} = {sum}</h4>

                {/* Input for first number */}
                <input
                    type="number"
                    value={a}
                    onChange={(e) => setA(parseInt(e.target.value))}
                    className="form-control mb-2"
                    style={{ maxWidth: "200px" }}
                />

                {/* Input for second number */}
                <input
                    type="number"
                    value={b}
                    onChange={(e) => setB(parseInt(e.target.value))}
                    className="form-control mb-2"
                    style={{ maxWidth: "200px" }}
                />

                {/* Calculate using Redux */}
                <button
                    id="wd-add-redux-click"
                    onClick={() => dispatch(add({ a, b }))}
                    className="btn btn-primary"
                >
                    Add Redux
                </button>
            </div>
            <hr />
        </div>
    );
}
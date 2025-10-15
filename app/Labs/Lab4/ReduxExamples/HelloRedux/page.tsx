// File: app/Labs/Lab4/ReduxExamples/HelloRedux/page.tsx
// Shows how to read from Redux
"use client";
import { useSelector } from "react-redux";

interface LabsRootState {
    helloReducer: {
        message: string;
    };
}

export default function HelloRedux() {
    // Read message from Redux store
    const { message } = useSelector((state: LabsRootState) => state.helloReducer);

    return (
        <div>
            <div id="wd-hello-redux" className="p-3 bg-white border rounded mb-3">
                <h3>Hello Redux</h3>
                <h4>{message}</h4>
            </div>
            <hr />
        </div>
    );
}
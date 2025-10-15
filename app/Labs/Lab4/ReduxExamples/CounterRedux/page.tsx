// File: app/Labs/Lab4/ReduxExamples/CounterRedux/page.tsx
// Counter using Redux

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";

interface LabsRootState {
    counterReducer: {
        count: number;
    };
}

export default function CounterRedux() {
    // Get count from Redux
    const { count } = useSelector((state: LabsRootState) => state.counterReducer);
    const dispatch = useDispatch();

    return (
        <div id="wd-counter-redux">
            <h3>Counter Redux</h3>
            <div className="p-3 bg-white border rounded mb-3">
                <h4>{count}</h4>

                {/* Dispatch actions to Redux */}
                <button
                    onClick={() => dispatch(increment())}
                    id="wd-counter-redux-increment-click"
                    className="btn btn-success me-2"
                >
                    Increment
                </button>

                <button
                    onClick={() => dispatch(decrement())}
                    id="wd-counter-redux-decrement-click"
                    className="btn btn-danger"
                >
                    Decrement
                </button>
            </div>
            <hr />
        </div>
    );
}
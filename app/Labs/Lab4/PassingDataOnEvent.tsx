// File: app/Labs/Lab4/PassingDataOnEvent.tsx
// Demonstrates passing parameters to event handlers

export default function PassingDataOnEvent() {
    // Function that adds two numbers
    const add = (a: number, b: number) => {
        alert(`${a} + ${b} = ${a + b}`);
    };

    return (
        <div id="wd-passing-data-on-event">
            <h2>Passing Data on Event</h2>
            <div className="p-3 bg-white border rounded">
                {/* Must wrap in arrow function to pass parameters */}
                <button
                    onClick={() => add(2, 3)}
                    className="btn btn-primary"
                    id="wd-pass-data-click"
                >
                    Pass 2 and 3 to add()
                </button>
            </div>
            <hr />
        </div>
    );
}
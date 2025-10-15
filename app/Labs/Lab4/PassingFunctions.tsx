// File: app/Labs/Lab4/PassingFunctions.tsx
// Shows how to pass functions as props

interface PassingFunctionsProps {
    theFunction: () => void;
}

export default function PassingFunctions({ theFunction }: PassingFunctionsProps) {
    return (
        <div>
            <h2>Passing Functions</h2>
            <div className="p-3 bg-white border rounded">
                {/* The function is passed as a prop */}
                <button
                    onClick={theFunction}
                    className="btn btn-primary"
                >
                    Invoke the Function
                </button>
            </div>
            <hr />
        </div>
    );
}
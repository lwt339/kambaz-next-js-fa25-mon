export default function ChildStateComponent({
                                        counter,
                                        setCounter
                                    }: {
    counter: number;
    setCounter: (counter: number) => void;
}) {
    return (
        <div id="wd-child-state">
            <h4>Child Component</h4>
            <h5>Counter from Parent: {counter}</h5>
            <div className="ms-4 p-3 border rounded">

            {/* Child can update parent's state using the setter function */}
            <button
                onClick={() => setCounter(counter + 1)}
                id="wd-increment-child-state-click"
                className="btn btn-primary me-2"
            >
                Increment
            </button>

            <button
                onClick={() => setCounter(counter - 1)}
                id="wd-decrement-child-state-click"
                className="btn btn-secondary"
            >
                Decrement

            </button>
            </div>
        </div>
    );
}
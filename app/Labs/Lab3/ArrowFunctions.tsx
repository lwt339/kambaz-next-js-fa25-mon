export default function ArrowFunctions() {
    // Modern ES6 arrow function syntax
    const subtract = (a: number, b: number) => {
        return a - b;
    };

    const threeMinusOne = subtract(3, 1);
    console.log('Arrow function result:', threeMinusOne);

    return (
        <div id="wd-arrow-functions" className="mb-4">
            <h4>New ES6 arrow functions</h4>
            <div className="p-3 bg-white border rounded">
                <code>threeMinusOne</code> = {threeMinusOne}<br/>
                <code>subtract(3, 1)</code> = {subtract(3, 1)}
            </div>
            <hr/>
        </div>
    );
}
export default function ArrowFunctions() {

    const subtract = (a: number, b: number) => {
        return a - b;
    };

    const threeMinusOne = subtract(3, 1);
    console.log('Arrow function result:', threeMinusOne);

    return (
        <div id="wd-arrow-functions" className="mb-4">
            <h4>New ES6 arrow functions</h4>
            <div className="p-3 bg-white border rounded">
                threeMinusOne = {threeMinusOne}<br/>
                subtract(3, 1) = {subtract(3, 1)}
            </div>
            <hr/>
        </div>
    );
}
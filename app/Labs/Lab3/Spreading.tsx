export default function Spreading() {
    // Demonstrate array spreading
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5, 6];  // Spread arr1 into arr2

    // Demonstrate object spreading
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { ...obj1, d: 4, e: 5, f: 6 };  // Spread obj1 into obj2
    const obj3 = { ...obj1, b: 4 };  // Override property b

    return (
        <div id="wd-spreading" className="mb-4">
            <h2>Spread Operator</h2>
            <h3>Array Spread</h3>
            <div className="p-3 bg-white border rounded">

                arr1 = {JSON.stringify(arr1)}<br/>
                arr2 = {JSON.stringify(arr2)} <br />
            </div>

            <h3>Object Spread</h3>
            <div className="p-3 bg-white border rounded">
                obj1 = {JSON.stringify(obj1)}<br/>
                obj2 = {JSON.stringify(obj2)}<br/>
                obj3 (override b) = {JSON.stringify(obj3)}
            </div>
            <hr/>
        </div>
    );
}
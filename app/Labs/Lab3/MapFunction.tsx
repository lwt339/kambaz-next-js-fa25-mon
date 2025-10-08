export default function MapFunction() {
    const numberArray1 = [1, 2, 3, 4, 5, 6];
    const square = (a: number) => a * a;
    const todos = ["Buy milk", "Feed the pets"];

    const squares = numberArray1.map(square);
    const cubes = numberArray1.map((a) => a * a * a);

    return (
        <div id="wd-map-function" className="mb-4">
            <h4>Map Function</h4>
            <div className="p-3 bg-white border rounded">
                squares = {squares}<br/>
                cubes = {cubes}<br/>
                Todos:
                <ol>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ol>
            </div>
            <hr/>
        </div>
    );
}
export default function JsonStringify() {
    const squares = [1, 4, 16, 25, 36];

    return (
        <div id="wd-json-stringify" className="mb-4">
            <h4>JSON Stringify</h4>
            <div className="p-3 bg-white border rounded">
                {/* JSON.stringify converts JavaScript objects/arrays to JSON string format */}
                squares = {JSON.stringify(squares)}
            </div>
            <hr/>
        </div>
    );
}

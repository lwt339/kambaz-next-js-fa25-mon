export default function FindFunction() {
    const numberArray1 = [1, 2, 3, 4, 5];
    const stringArray1 = ["string1", "string2", "string3"];

    const four = numberArray1.find((a) => a === 4);
    const string3 = stringArray1.find((a) => a === "string3");

    return (
        <div id="wd-find-function" className="mb-4">
            <h4>Find Function</h4>
            <div className="p-3 bg-white border rounded">
                four = {four}<br/>
                string3 = {string3}
            </div>
            <hr/>
        </div>
    );
}
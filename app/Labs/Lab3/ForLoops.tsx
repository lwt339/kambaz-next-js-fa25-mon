export default function ForLoops() {
    const stringArray1 = ["string1", "string3"];
    const stringArray2 = [];

    for (let i = 0; i < stringArray1.length; i++) {
        const string1 = stringArray1[i];
        stringArray2.push(string1.toUpperCase());
    }

    return (
        <div id="wd-for-loops" className="mb-4">
            <h4>Looping through arrays</h4>
            <div className="p-3 bg-white border rounded">
                stringArray2 = {stringArray2}
            </div>
            <hr/>
        </div>
    );
}
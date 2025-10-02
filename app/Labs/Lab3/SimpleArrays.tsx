export default function SimpleArrays() {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;

    // Different types of arrays
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ["string1", "string2"];
    let htmlArray1 = [<li key="1">Buy milk</li>, <li key="2">Feed the pets</li>];
    let variableArray1 = [functionScoped, blockScoped, constant1, numberArray1, stringArray1];

    return (
        <div id="wd-simple-arrays" className="mb-4">
            <h4>Simple Arrays</h4>
            <div className="p-3 bg-white border rounded">
                numberArray1 = {numberArray1}<br/>
                stringArray1 = {stringArray1}<br/>
                variableArray1 = {variableArray1}<br/>
                <strong>Todo list:</strong>
                <ol>{htmlArray1}</ol>
            </div>
            <hr/>
        </div>
    );
}
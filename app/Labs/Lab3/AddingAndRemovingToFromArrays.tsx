export default function AddingAndRemovingToFromArrays() {
    const numberArray1 = [1, 2, 3, 4, 5];
    const stringArray1 = ["string1", "string2"];
    const todoArray = [<li key="1">Buy milk</li>, <li key="2">Feed the pets</li>];

    // Adding items
    numberArray1.push(6);
    stringArray1.push("string3");
    todoArray.push(<li key="3">Walk the dogs</li>);

    // Removing items
    numberArray1.splice(2, 1);
    stringArray1.splice(1, 1);  // Remove 1 item at index 1

    return (
        <div id="wd-adding-removing-from-arrays" className="mb-4">
            <h4>Add/remove to/from arrays</h4>
            <div className="p-3 bg-white border rounded">
                numberArray1 = {numberArray1}<br/>
                stringArray1 = {stringArray1}<br/>
                Todo list:
                <ol>{todoArray}</ol>
            </div>
            <hr/>
        </div>
    );
}
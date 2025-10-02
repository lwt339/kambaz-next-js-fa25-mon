export default function VariablesAndConstants() {
    // Declare variables with different scopes
    var functionScoped = 2;  // Function-scoped variable
    let blockScoped = 5;     // Block-scoped variable
    const constant1 = functionScoped - blockScoped; // Constant value

    return (
        <div id="wd-variables-and-constants" className="mb-4">
            <h4>Variables and Constants</h4>
            <div className="p-3 bg-white border rounded">
                <code>functionScoped</code> = {functionScoped}<br/>
                <code>blockScoped</code> = {blockScoped}<br/>
                <code>constant1</code> = {constant1}
            </div>
            <hr/>
        </div>
    );
}
export default function VariableTypes() {
    // Demonstrate different JavaScript data types
    let numberVariable = 123;
    let floatingPointNumber = 234.345;
    let stringVariable = 'Hello World!';
    let booleanVariable = true;

    // Check the type of each variable using typeof operator
    let isNumber = typeof numberVariable;
    let isString = typeof stringVariable;
    let isBoolean = typeof booleanVariable;

    return (
        <div id="wd-variable-types" className="mb-4">
            <h4>Variable Types</h4>
            <div className="p-3 bg-white border rounded">
                <div className="mb-2">
                    <strong>Values:</strong><br/>
                    <code>numberVariable</code> = {numberVariable}<br/>
                    <code>floatingPointNumber</code> = {floatingPointNumber}<br/>
                    <code>stringVariable</code> = {stringVariable}<br/>
                    {/* Convert boolean to string for display */}
                    <code>booleanVariable</code> = {booleanVariable + ""}<br/>
                </div>
                <div>
                    <strong>Types:</strong><br/>
                    <code>isNumber</code> = {isNumber}<br/>
                    <code>isString</code> = {isString}<br/>
                    <code>isBoolean</code> = {isBoolean}
                </div>
            </div>
            <hr/>
        </div>
    );
}
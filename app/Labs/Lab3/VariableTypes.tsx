export default function VariableTypes() {

    let numberVariable = 123;
    let floatingPointNumber = 234.345;
    let stringVariable = 'Hello World!';
    let booleanVariable = true;


    let isNumber = typeof numberVariable;
    let isString = typeof stringVariable;
    let isBoolean = typeof booleanVariable;

    return (
        <div id="wd-variable-types" className="mb-4">
            <h4>Variable Types</h4>
            <div className="p-3 bg-white border rounded">
                <div className="mb-2">
                    numberVariable = {numberVariable}<br/>
                    floatingPointNumber = {floatingPointNumber}<br/>
                    stringVariable = {stringVariable}<br/>

                    booleanVariable = {booleanVariable + ""}<br/>
                    isNumber = {isNumber}<br/>
                    isString = {isString}<br/>
                    isBoolean = {isBoolean}
                </div>
            </div>
            <hr/>
        </div>
    );
}
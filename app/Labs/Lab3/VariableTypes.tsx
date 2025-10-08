export default function VariableTypes() {

    const numberVariable = 123;
    const floatingPointNumber = 234.345;
    const stringVariable = 'Hello World!';
    const booleanVariable = true;


    const isNumber = typeof numberVariable;
    const isString = typeof stringVariable;
    const isBoolean = typeof booleanVariable;

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
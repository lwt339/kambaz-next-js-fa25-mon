export default function VariablesAndConstants() {

    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;

    return (
        <div id="wd-variables-and-constants" className="mb-4">
            <h4>Variables and Constants</h4>
            <div className="p-3 bg-white border rounded">
                functionScoped = {functionScoped}<br/>
                blockScoped = {blockScoped}<br/>
                constant1 = {constant1}
            </div>
            <hr/>
        </div>
    );
}
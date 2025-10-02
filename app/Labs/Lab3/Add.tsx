export default function Add ({ a, b }: { a: number; b: number }) {
    return (
        <div id="wd-add" className="mb-4">
            <h4>Add</h4>
            <div className="p-3 bg-white border rounded">
                <strong>Parameters:</strong><br/>
                a = {a}<br/>
                b = {b}<br/>
                <strong>Result:</strong> a + b = {a + b}
            </div>
            <hr/>
        </div>
    );
}
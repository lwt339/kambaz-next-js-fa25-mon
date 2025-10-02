export default function ImpliedReturn() {
    // Implied return - no need for return keyword or curly braces
    const multiply = (a: number, b: number) => a * b;

    const fourTimesFive = multiply(4, 5);
    console.log('Implied return result:', fourTimesFive);

    return (
        <div id="wd-implied-return" className="mb-4">
            <h4>Implied return</h4>
            <div className="p-3 bg-white border rounded">
                <code>fourTimesFive</code> = {fourTimesFive}<br/>
                <code>multiply(4, 5)</code> = {multiply(4, 5)}
            </div>
            <hr/>
        </div>
    );
}
export default function TernaryOperator() {
    const loggedIn = true;

    return (
        <div id="wd-ternary-operator" className="mb-4">
            <h4>Ternary Conditional Operator</h4>
            <div className="p-3 bg-white border rounded">
                <h4>Logged In</h4><br/>
                {loggedIn ? <p >Welcome</p> :
                    <p >Please login</p>}
            </div>
            <hr/>
        </div>
    );
}
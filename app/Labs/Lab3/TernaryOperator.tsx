export default function TernaryOperator() {
    let loggedIn = true;

    return (
        <div id="wd-ternary-operator" className="mb-4">
            <h4>Ternary Conditional Operator</h4>
            <div className="p-3 bg-white border rounded">
                <h4>Logged In</h4><br/>
                {loggedIn ? <p className="text-success">Welcome</p> :
                    <p className="text-warning">Please login</p>}
            </div>
            <hr/>
        </div>
    );
}
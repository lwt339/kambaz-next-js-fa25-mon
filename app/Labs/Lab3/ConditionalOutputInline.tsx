export default function ConditionalOutputInline() {
    const loggedIn = false;

    return (
        <div id="wd-conditional-output-inline" className="mb-4">
            {loggedIn && <h4 className="text-success">Welcome Inline</h4>}
            {!loggedIn && <h4 className="text-warning">Please login Inline</h4>}
            <hr/>
        </div>
    );
}
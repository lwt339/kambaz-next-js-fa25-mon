export default function ConditionalOutputIfElse() {
    const loggedIn = true;

    if (loggedIn) {
        return (
            <div className="mb-4">
                <h4 id="wd-conditional-output-if-else-welcome" className="text-success">
                    Welcome If Else
                </h4>
                <hr/>
            </div>
        );
    } else {
        return (
            <div className="mb-4">
                <h4 id="wd-conditional-output-if-else-login" className="text-warning">
                    Please login If Else
                </h4>
                <hr/>
            </div>
        );
    }
}
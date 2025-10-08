export default function ConditionalOutputIfElse() {
    const loggedIn = true;

    if (loggedIn) {
        return (
            <div className="mb-4">
                <h2 id="wd-conditional-output-if-else-welcome" >
                    Welcome If Else
                </h2>

            </div>
        );
    } else {
        return (
            <div className="mb-4">
                <h2 id="wd-conditional-output-if-else-login" >
                    Please login If Else
                </h2>

            </div>
        );
    }
}
// Demonstrates boolean operations and comparisons
export default function BooleanVariables() {
    let numberVariable = 123;
    let floatingPointNumber = 234.345;

    // Boolean literals
    let true1 = true;
    let false1 = false;

    // Boolean AND operation
    let false2 = true1 && false1;

    // Boolean OR operation
    let true2 = true1 || false1;

    // Boolean NOT operation
    let true3 = !false2;

    // Equality comparison (always use === for strict equality)
    let true4 = numberVariable === 123;

    // Inequality comparison
    let true5 = floatingPointNumber !== 321.432;

    // Less than comparison
    let false3 = numberVariable < 100;

    return (
        <div id="wd-boolean-variables" className="mb-4 p-3 bg-gray-50 rounded">
            <h4 className="font-bold mb-2">Boolean Variables</h4>
            <div className="font-mono text-sm">
                true1 = {true1 + ""}<br />
                false1 = {false1 + ""}<br />
                false2 = {false2 + ""}<br />
                true2 = {true2 + ""}<br />
                true3 = {true3 + ""}<br />
                true4 = {true4 + ""}<br />
                true5 = {true5 + ""}<br />
                false3 = {false3 + ""}
            </div>
            <hr className="mt-2" />
        </div>
    );
}
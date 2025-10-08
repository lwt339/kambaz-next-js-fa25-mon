export default function IfElse() {
    let true1 = true, false1 = false;

    return (
        <div id="wd-if-else" className="mb-4">
            <h4>If Else</h4>
            <div className="p-3 bg-white border rounded">

                {true1 && <p >true1</p>}

                {!false1 ? <p >!false1</p> : <p>false1</p>}
            </div>
            <hr/>
        </div>
    );
}
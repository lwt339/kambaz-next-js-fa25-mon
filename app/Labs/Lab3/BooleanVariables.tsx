
export default function BooleanVariables() {
    const numberVariable = 123;
    const floatingPointNumber: number = 234.345;

    const true1 = true;
    const false1 = false;


    const false2 = true1 && false1;

    const true2 = true1 || false1;

    const true3 = !false2;

    const true4 = numberVariable === 123;

    const true5 = floatingPointNumber !== 321.432;

    const false3 = numberVariable < 100;

    return (
        <div id="wd-boolean-variables" className="mb-4 ">
            <h4 className="font-bold mb-2">Boolean Variables</h4>
            <div className="p-3 bg-white border rounded">
                true1 = {true1 + ""}<br />
                false1 = {false1 + ""}<br />
                false2 = {false2 + ""}<br />
                true2 = {true2 + ""}<br />
                true3 = {true3 + ""}<br />
                true4 = {true4 + ""}<br />
                true5 = {true5 + ""}<br />
                false3 = {false3 + ""}
            </div>
            <hr/>
        </div>
    );
}
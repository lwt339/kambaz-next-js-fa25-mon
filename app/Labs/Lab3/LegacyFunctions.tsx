export default function LegacyFunctions() {
    function add(a: number, b: number) {
        return a + b;
    }

    const twoPlusFour = add(2, 4);
    console.log('Legacy function result:', twoPlusFour);

    return (
        <div id="wd-legacy-functions" className="mb-4">
            <h4>Functions</h4>
            <h5>Legacy ES5 functions</h5>
            <div className="p-3 bg-white border rounded">
                twoPlusFour = {twoPlusFour}<br/>
                add(2, 4) = {add(2, 4)}
            </div>
            <hr/>
        </div>
    );
}
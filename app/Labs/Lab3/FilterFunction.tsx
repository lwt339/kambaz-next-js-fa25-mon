export default function FilterFunction() {
    let numberArray1 = [1, 2, 4, 5, 6];

    const numbersGreaterThan2 = numberArray1.filter((a) => a > 2);
    const evenNumbers = numberArray1.filter((a) => a % 2 === 0);
    const oddNumbers = numberArray1.filter((a) => a % 2 !== 0);

    return (
        <div id="wd-filter-function" className="mb-4">
            <h4 >Filter Function</h4>
            <div className="p-3 bg-white border rounded">
                numbersGreaterThan2 = {numbersGreaterThan2}<br/>
                evenNumbers = {evenNumbers}<br/>
                oddNumbers = {oddNumbers}
            </div>
            <hr/>
        </div>
    );
}
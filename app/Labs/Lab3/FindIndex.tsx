export default function FindIndex() {
    let numberArray1 = [1, 2, 4, 5, 6];
    let stringArray1 = ['string1', 'string3'];

    const fourIndex = numberArray1.findIndex(a => a === 4);
    const string3Index = stringArray1.findIndex(a => a === 'string3');

    return (
        <div id="wd-find-index" className="mb-4">
            <h4>FindIndex function</h4>
            <div className="p-3 bg-white border rounded">
                fourIndex = {fourIndex}<br/>
                string3Index = {string3Index}
            </div>
            <hr/>
        </div>
    );
}
export default function FunctionDestructing() {
    // Regular function with two parameters
    const add = (a: number, b: number) => a + b;
    const sum = add(1, 2);

    // Function with destructured object parameter
    const subtract = ({ a, b }: { a: number; b: number }) => a - b;
    const difference = subtract({ a: 4, b: 2 });

    return (
        <div id="wd-function-destructing" className="mb-4">
            <h2 >Function Destructing</h2>
            <div className="p-3 bg-white border rounded">
                <code>const add = (a, b) =&gt; a + b;</code><br/>
                <code>const sum = add(1, 2);</code><br/>


                <code>const subtract = (&#123; a, b &#125;) =&gt; a - b;</code><br/>
                <code>const difference = subtract(&#123; a: 4, b: 2 &#125;);</code><br/>
                sum = {sum}<br/>
                difference = {difference}
            </div>
            <hr/>
        </div>
    );
}
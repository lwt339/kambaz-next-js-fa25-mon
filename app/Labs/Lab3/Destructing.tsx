export default function Destructing() {
    const person = { name: "John", age: 25 };
    const { name, age } = person;

    const numbers = ["one", "two", "three"];
    const [first, second, third] = numbers;

    return (
        <div id="wd-destructing" className="mb-4">
            <h2>Destructing</h2>

            <h3>Object Destructing</h3>
            <div className="p-3 bg-white border rounded">
                const &#123; name, age &#125; = &#123; name: &quot;John&quot;, age: 25 &#125;<br/><br/>
                name = {name}<br/>
                age = {age}
            </div>

            <h3>Array Destructing</h3>
            <div className="p-3 bg-white border rounded">
                const [first, second, third] = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;]<br/><br/>
                first = {first}<br/>
                second = {second}<br/>
                third = {third}
            </div>
            <hr/>
        </div>
    );
}

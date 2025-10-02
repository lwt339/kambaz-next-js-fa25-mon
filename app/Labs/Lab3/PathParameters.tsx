import Link from "next/link";

export default function PathParameters() {
    return (
        <div id="wd-path-parameters" className="mb-4">
            <h2 >Path Parameters</h2>
            <div className="p-3 bg-white border rounded">
                <p>Click the links below to see path parameters in action:</p>
                <Link href="/Labs/Lab3/add/1/2" className="btn btn-primary me-2">
                    Calculate 1 + 2
                </Link>
                <Link href="/Labs/Lab3/add/3/4" className="btn btn-success">
                    Calculate 3 + 4
                </Link>
            </div>
        </div>
    );
}
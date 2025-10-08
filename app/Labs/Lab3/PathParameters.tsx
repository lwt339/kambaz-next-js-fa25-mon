import Link from "next/link";

export default function PathParameters() {
    return (
        <div id="wd-path-parameters" className="mb-4">
            <h2 >Path Parameters</h2>
            <div className="p-3 bg-white border rounded">
                <Link href="/Labs/Lab3/add/1/2" className="btn btn-primary me-2">
                    1 + 2
                </Link><br /><br />
                <Link href="/Labs/Lab3/add/3/4" className="btn btn-success">
                    3 + 4
                </Link>
            </div>
        </div>
    );
}
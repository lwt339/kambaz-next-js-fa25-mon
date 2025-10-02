"use client"
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AddPathParameters() {
    const { a, b } = useParams();

    return (
        <div id="wd-add" className="container mt-4">
            <h4 >Add Path Parameters</h4>
            <div className="p-3 bg-light border rounded">
                <h5>Calculation Result:</h5>
                {a} + {b} = {parseInt(a as string) + parseInt(b as string)}
            </div>
            <Link href="/Labs/Lab3" className="btn btn-secondary mt-3">
                Back to Lab 3
            </Link>
        </div>
    );
}
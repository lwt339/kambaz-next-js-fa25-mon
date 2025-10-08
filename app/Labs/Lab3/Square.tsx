import React, { ReactNode } from "react";

export default function Square({ children }: { children: ReactNode }) {

    const num = Number(children);

    return (
        <div className="p-3 bg-white border rounded">
        <span id="wd-square" >
      {num} squared = {num * num}

    </span>
        </div>
    );
}
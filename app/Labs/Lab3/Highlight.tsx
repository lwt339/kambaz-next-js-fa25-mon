import { ReactNode } from "react";

export default function Highlight({ children }: { children: ReactNode }) {
    return (
        <span id="wd-highlight" style={{
            backgroundColor: "yellow",
            color: "red",
            padding: "2px 5px",
            fontWeight: "bold"
        }}>
      {children}
    </span>
    );
}
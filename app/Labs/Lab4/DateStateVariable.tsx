// app/Labs/Lab4/DateStateVariable.tsx
"use client";

import { useState } from "react";

export default function DateStateVariable() {
    // Use fixed date string to avoid hydration mismatch
    const [startDate, setStartDate] = useState(new Date("2023-10-09"));

    const dateObjectToHtmlDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    return (
        <div id="wd-date-state-variables">
            <h2>Date State Variables</h2>
            <div className="p-3 bg-white border rounded">
                <h3>{JSON.stringify(startDate)}</h3>
                <h3>{dateObjectToHtmlDateString(startDate)}</h3>

                <input
                    type="date"
                    className="form-control"
                    value={dateObjectToHtmlDateString(startDate)}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                />
            </div>
            <hr />
        </div>
    );
}
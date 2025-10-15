// File: app/(Kambaz)/Courses/[cid]/People/page.tsx
// Main people page wrapper

import PeopleTable from "./Table/page";

export default function People() {
    return (
        <div id="wd-people">
            <h3>People</h3>
            <PeopleTable />
        </div>
    );
}
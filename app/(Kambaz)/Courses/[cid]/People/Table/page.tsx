/**
 * Data-Driven People Table Component
 * Chapter 3.8.9 Implementation
 * Displays users enrolled in the selected course
 */

import * as db from "../../../../Database";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

interface PeopleTableProps {
    params: Promise<{ cid: string }>;
}

export default async function PeopleTable({ params }: PeopleTableProps) {
    const { cid } = await params;
    const { users, enrollments } = db;

    // Filter users based on their enrollment in the current course
    const enrolledUsers = users.filter((user: any) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === user._id &&
                enrollment.course === cid
        )
    );

    // Sort users by role (Faculty first, then TA, then Students)
    const roleOrder = { FACULTY: 1, TA: 2, STUDENT: 3 };
    const sortedUsers = enrolledUsers.sort((a: any, b: any) => {
        return (roleOrder[a.role as keyof typeof roleOrder] || 4) -
            (roleOrder[b.role as keyof typeof roleOrder] || 4);
    });

    // Group users by role for better display
    const groupedUsers = sortedUsers.reduce((groups: any, user: any) => {
        if (!groups[user.role]) {
            groups[user.role] = [];
        }
        groups[user.role].push(user);
        return groups;
    }, {});

    return (
        <div id="wd-people-table" className="container-fluid">
            <h3>People</h3>

            {/* Search and Filter Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search people"
                />
                <select className="form-select w-25">
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="ta">Teaching Assistants</option>
                    <option value="faculty">Faculty</option>
                </select>
            </div>

            {/* People Table */}
            <Table striped hover>
                <thead>
                <tr>
                    <th className="text-start">Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user: any) => (
                    <tr key={user._id}>
                        <td className="wd-full-name text-nowrap">
                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                            <span className="wd-first-name">{user.firstName} </span>
                            <span className="wd-last-name">{user.lastName}</span>
                        </td>
                        <td className="wd-login-id">{user.loginId}</td>
                        <td className="wd-section">{user.section}</td>
                        <td className="wd-role">
                <span className={`badge ${
                    user.role === 'FACULTY' ? 'bg-primary' :
                        user.role === 'TA' ? 'bg-success' :
                            'bg-secondary'
                }`}>
                  {user.role}
                </span>
                        </td>
                        <td className="wd-last-activity">
                            {new Date(user.lastActivity).toLocaleDateString()}
                        </td>
                        <td className="wd-total-activity">{user.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Summary Statistics */}
            <div className="mt-4 p-3 bg-light rounded">
                <h5>Course Statistics</h5>
                <div className="row">
                    {Object.entries(groupedUsers).map(([role, roleUsers]) => (
                        <div key={role} className="col-md-4">
                            <strong>{role}:</strong> {(roleUsers as any[]).length}
                            {role === 'STUDENT' ? ' students' :
                                role === 'TA' ? ' teaching assistants' :
                                    ' faculty'}
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <strong>Total Enrolled:</strong> {enrolledUsers.length} people
                </div>
            </div>

            {/* Show message if no users found */}
            {enrolledUsers.length === 0 && (
                <div className="alert alert-info mt-3">
                    No users are enrolled in this course yet.
                </div>
            )}
        </div>
    );
}
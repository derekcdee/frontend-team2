import React from 'react';
import { MaterialReactTable } from 'material-react-table';

export default function AdminPage() {

    const data = [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 30 },
        { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25 },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', age: 22 },
        { id: 4, firstName: 'Bob', lastName: 'Brown', age: 45 },
        { id: 5, firstName: 'Carol', lastName: 'Martinez', age: 32 },
        { id: 6, firstName: 'Dave', lastName: 'Wilson', age: 28 },
        { id: 7, firstName: 'Eva', lastName: 'Davis', age: 35 },
        { id: 8, firstName: 'Frank', lastName: 'Garcia', age: 40 },
        { id: 9, firstName: 'Grace', lastName: 'Lee', age: 29 },
        { id: 10, firstName: 'Henry', lastName: 'Anderson', age: 31 },
        { id: 11, firstName: 'Isabel', lastName: 'Thomas', age: 26 },
        { id: 12, firstName: 'Jack', lastName: 'Moore', age: 23 },
        { id: 13, firstName: 'Laura', lastName: 'Taylor', age: 27 },
        { id: 14, firstName: 'Mike', lastName: 'Jackson', age: 33 },
        { id: 15, firstName: 'Nora', lastName: 'White', age: 34 },
        { id: 16, firstName: 'Oscar', lastName: 'Harris', age: 37 },
        { id: 17, firstName: 'Pamela', lastName: 'Clark', age: 38 },
    ];

    // Define columns for Material React Table
    const columns = [
        {
            accessorKey: 'firstName', // accessorKey is the key in the data
            header: 'First Name', // displayed header text
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
        },
        {
            accessorKey: 'age',
            header: 'Age',
        },
    ];

    return (
        <div>
            <AdminHeader /> {/* Include the AdminHeader component */}
            <div className='user-content'>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableColumnOrdering
                    enableColumnResizing
                    enableSorting
                />
            </div>
        </div>
    )
}

function AdminHeader() {
    return (
        <div className="admin-header">
            <ul className="admin-header-list">
                <li className="admin-header-item">
                    <button className="admin-button">Button 1</button>
                </li>
                <li className="admin-header-item">
                    <button className="admin-button">Button 2</button>
                </li>
                <li className="admin-header-item">
                    <button className="admin-button">Button 3</button>
                </li>
                <li className="admin-header-item">
                    <button className="admin-button">Button 4</button>
                </li>
            </ul>
        </div>
    )
}
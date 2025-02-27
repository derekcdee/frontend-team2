import React, { useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

export default function AdminPage() {
    const [adminPage, setAdminPage] = React.useState('Cues');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        // Simulate a data fetch
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            <AdminHeader setAdminPage={setAdminPage} adminPage={adminPage} loading={loading} />
            <div className='user-content'>
                <AdminContent adminPage={adminPage} loading={loading} setLoading={setLoading} />
            </div>
        </div>
    );
}

function AdminHeader({ setAdminPage, adminPage, loading }) {
    const pages = ['Cues', 'Accessories', 'Materials', 'Users'];

    return (
        <div className="admin-header">
            <ul className="admin-header-list">
                {pages.map((page) => (
                    <li key={page} className="admin-header-item">
                        <button
                            className={`admin-button ${adminPage === page ? 'active' : ''}`}
                            onClick={() => setAdminPage(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="admin-header-right">
                <button className={`admin-icon-button ${loading ? 'disabled' : ''}`} disabled={loading}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
    );
}

function AdminContent({ adminPage, loading, setLoading }) {
    const [cueData, setCueData] = React.useState([]);
    const [accessoryData, setAccessoryData] = React.useState([]);
    const [materialData, setMaterialData] = React.useState([]);
    const [userData, setUserData] = React.useState([]);

    const getData = async () => { 
        setLoading(false);
        
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        switch (adminPage) {
            case 'Cues':
                break;
            case 'Accessories':
                break;
            case 'Materials':
                break;
            case 'Users':
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getData();
    }, [adminPage]);

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

    if (loading) {
        return <SkeletonLoader />;
    }

    switch (adminPage) {
        case 'Cues':
            return <Cues data={data} />;
        case 'Accessories':
            return <Accessories data={data} />;
        case 'Materials':
            return <Materials data={data} />;
        case 'Users':
            return <Users data={data} />;
        default:
            return null;
    }
}

function SkeletonLoader() {
    return (
        <div className="skeleton-loader">
            <div className="skeleton-header"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
        </div>
    );
}

const tableProps = {
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
        <div className='admin-actions'> 
            <button className='fa-solid fa-pencil admin-action-button' />
            <button className='fa-solid fa-xmark admin-action-button'></button>
        </div>
    ),
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    positionGlobalFilter: 'left',
    initialState: {
        showGlobalFilter: true,
        pagination: {
            pageSize: 10,
        },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
        size: 'small',
        variant: 'outlined',
    },
    muiPaginationProps: {
        rowsPerPageOptions: [5, 10, 20, 30, 40, 50],
        shape: 'rounded',
        variant: 'outlined',
    },
};

function Cues({ data }) {
    const columns = [
        {
            accessorKey: 'firstName',
            header: 'First Name',
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
            <h2 className="admin-page-header">Cues</h2>
            <MaterialReactTable columns={columns} data={data} {...tableProps} />
        </div>
    );
}

function Accessories({ data }) {
    const columns = [
        {
            accessorKey: 'firstName',
            header: 'First Name',
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
            <h2 className="admin-page-header">Accessories</h2>
            <MaterialReactTable columns={columns} data={data} {...tableProps} />
        </div>
    );
}

function Materials({ data }) {
    const columns = [
        {
            accessorKey: 'firstName',
            header: 'First Name',
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
            <h2 className="admin-page-header">Materials</h2>
            <MaterialReactTable columns={columns} data={data} {...tableProps} />
        </div>
    );
}

function Users({ data }) {
    const columns = [
        {
            accessorKey: 'firstName',
            header: 'First Name',
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
            <h2 className="admin-page-header">Users</h2>
            <MaterialReactTable columns={columns} data={data} {...tableProps} />
        </div>
    );
}
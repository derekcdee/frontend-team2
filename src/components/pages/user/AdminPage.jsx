import React, { useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormField } from '../../util/Inputs';
import { DefaultButton } from '../../util/Buttons';
import { getUsers } from '../../../util/requests';

export default function AdminPage() {
    const [adminPage, setAdminPage] = React.useState('Cues');
    const [loading, setLoading] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogProps, setDialogProps] = React.useState({});

    useEffect(() => {
        // Simulate a data fetch
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleDialogOpen = (props) => {
        let title = '';

        switch (adminPage) {
            case 'Cues':
                title = 'Cue';
                break;
            case 'Accessories':
                title = 'Accessory';
                break;
            case 'Materials':
                title = 'Material';
                break;
            case 'Users':
                title = 'User';
                break;
            default:
                title = 'Item';
                break;
        }

        if (props.element) {
            title = `Edit ${title}`;
        } else {
            title = `New ${title}`;
        }

        setDialogProps({ ...props, title });
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogProps({});
    };

    return (
        <div>
            <AdminHeader setAdminPage={setAdminPage} adminPage={adminPage} loading={loading} onPlusClick={handleDialogOpen} />
            <div className='user-content'>
                <AdminContent adminPage={adminPage} loading={loading} setLoading={setLoading} onEditClick={handleDialogOpen} />
            </div>
            {adminPage === 'Cues' && <CueDialog open={dialogOpen} onClose={handleDialogClose} {...dialogProps} />}
            {adminPage === 'Accessories' && <AccessoryDialog open={dialogOpen} onClose={handleDialogClose} {...dialogProps} />}
            {adminPage === 'Materials' && <MaterialDialog open={dialogOpen} onClose={handleDialogClose} {...dialogProps} />}
            {adminPage === 'Users' && <UserDialog open={dialogOpen} onClose={handleDialogClose} {...dialogProps} />}
        </div>
    );
}

function AdminHeader({ setAdminPage, adminPage, loading, onPlusClick }) {
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
                <button
                    className={`admin-icon-button ${loading ? 'disabled' : ''}`}
                    disabled={loading}
                    onClick={onPlusClick}
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
    );
}

function CueDialog({ open, onClose, title, element = { cueNumber: '', name: '', description: '', price: '', overallWeight: '', overallLength: '' } }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: element
    });

    useEffect(() => {
        if (open) {
            reset(element);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };

    const cueNumber = watch("cueNumber");
    const name = watch("name");
    const description = watch("description");
    const price = watch("price");
    const overallWeight = watch("overallWeight");
    const overallLength = watch("overallLength");

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="cue-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
                        <FormField 
                            title="Cue Number"
                            type="text"
                            value={cueNumber}
                            error={errors.cueNumber && errors.cueNumber.message}
                            {...register("cueNumber", {
                                required: "Cue Number is required",
                                maxLength: {
                                    value: 50,
                                    message: "Cue Number must be at most 50 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Name"
                            type="text"
                            value={name}
                            error={errors.name && errors.name.message}
                            {...register("name", {
                                required: "Name is required",
                                maxLength: {
                                    value: 100,
                                    message: "Name must be at most 100 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Description"
                            type="text"
                            value={description}
                            error={errors.description && errors.description.message}
                            {...register("description", {
                                required: "Description is required",
                                maxLength: {
                                    value: 500,
                                    message: "Description must be at most 500 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Price"
                            type="number"
                            value={price}
                            error={errors.price && errors.price.message}
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 0,
                                    message: "Price must be a positive number"
                                }
                            })}
                        />
                        <FormField 
                            title="Overall Weight"
                            type="number"
                            value={overallWeight}
                            error={errors.overallWeight && errors.overallWeight.message}
                            {...register("overallWeight", {
                                required: "Overall Weight is required",
                                min: {
                                    value: 0,
                                    message: "Overall Weight must be a positive number"
                                }
                            })}
                        />
                        <FormField 
                            title="Overall Length"
                            type="number"
                            value={overallLength}
                            error={errors.overallLength && errors.overallLength.message}
                            {...register("overallLength", {
                                required: "Overall Length is required",
                                min: {
                                    value: 0,
                                    message: "Overall Length must be a positive number"
                                }
                            })}
                        />
                        <DialogActions>
                            <DefaultButton text={"Save"} />
                        </DialogActions>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AccessoryDialog({ open, onClose, title, element = { name: '', description: '', price: '', accessoryNumber: '' } }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: element
    });

    useEffect(() => {
        if (open) {
            reset(element);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };

    const name = watch("name");
    const description = watch("description");
    const price = watch("price");
    const accessoryNumber = watch("accessoryNumber");

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="accessory-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
                        <FormField
                            title="Name"
                            type="text"
                            value={name}
                            error={errors.name && errors.name.message}
                            {...register("name", {
                                required: "Name is required",
                                maxLength: {
                                    value: 100,
                                    message: "Name must be at most 100 characters long"
                                }
                            })}
                        />
                        <FormField
                            title="Description"
                            type="text"
                            value={description}
                            error={errors.description && errors.description.message}
                            {...register("description", {
                                required: "Description is required",
                                maxLength: {
                                    value: 500,
                                    message: "Description must be at most 500 characters long"
                                }
                            })}
                        />
                        <FormField
                            title="Accessory Number"
                            type="text"
                            value={accessoryNumber}
                            error={errors.accessoryNumber && errors.accessoryNumber.message}
                            {...register("accessoryNumber", {
                                required: "Accessory Number is required",
                                maxLength: {
                                    value: 50,
                                    message: "Accessory Number must be at most 50 characters long"
                                }
                            })}
                        />
                        <FormField
                            title="Price"
                            type="number"
                            value={price}
                            error={errors.price && errors.price.message}
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 0,
                                    message: "Price must be a positive number"
                                }
                            })}
                        />
                        <DialogActions>
                            <DefaultButton text={"Save"} />
                        </DialogActions>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function MaterialDialog({ open, onClose, title, element = { type: '', name: '', description: '', tier: '' } }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: element
    });

    useEffect(() => {
        if (open) {
            reset(element);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };

    const type = watch("type");
    const name = watch("name");
    const description = watch("description");
    const tier = watch("tier");

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="material-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
                        <FormField 
                            title="Type"
                            type="text"
                            value={type}
                            error={errors.type && errors.type.message}
                            {...register("type", {
                                required: "Type is required",
                                maxLength: {
                                    value: 100,
                                    message: "Type must be at most 100 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Name"
                            type="text"
                            value={name}
                            error={errors.name && errors.name.message}
                            {...register("name", {
                                required: "Name is required",
                                maxLength: {
                                    value: 100,
                                    message: "Name must be at most 100 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Description"
                            type="text"
                            value={description}
                            error={errors.description && errors.description.message}
                            {...register("description", {
                                required: "Description is required",
                                maxLength: {
                                    value: 500,
                                    message: "Description must be at most 500 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Tier"
                            type="text"
                            value={tier}
                            error={errors.tier && errors.tier.message}
                            {...register("tier", {
                                required: "Tier is required",
                                maxLength: {
                                    value: 50,
                                    message: "Tier must be at most 50 characters long"
                                }
                            })}
                        />
                        <DialogActions>
                            <DefaultButton text={"Save"} />
                        </DialogActions>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function UserDialog({ open, onClose, title, element = { email: '', password: '' } }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: element
    });

    useEffect(() => {
        if (open) {
            reset(element);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        console.log(data);
        onClose();
    };

    const email = watch("email");
    const password = watch("password");

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
                        <FormField 
                            title="Email"
                            type="text"
                            value={email}
                            error={errors.email && errors.email.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                },
                                maxLength: {
                                    value: 320,
                                    message: "Email must be at most 320 characters long"
                                }
                            })}
                        />
                        <FormField 
                            title="Password"
                            type="text"
                            value={password}
                            error={errors.password && errors.password.message}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                },
                                maxLength: {
                                    value: 64,
                                    message: "Password must be at most 64 characters long"
                                }
                            })}
                        />
                        <DialogActions>
                            <DefaultButton text={"Save"} />
                        </DialogActions>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AdminContent({ adminPage, loading, setLoading, onEditClick }) {
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
                getUsers()
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
            return <Cues data={data} onEditClick={onEditClick} />;
        case 'Accessories':
            return <Accessories data={data} onEditClick={onEditClick} />;
        case 'Materials':
            return <Materials data={data} onEditClick={onEditClick} />;
        case 'Users':
            return <Users data={data} onEditClick={onEditClick} />;
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

function Cues({ data, onEditClick }) {
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
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
                renderRowActions={({ row }) => (
                    <div className='admin-actions'>
                        <button
                            className='fa-solid fa-pencil admin-action-button'
                            onClick={() => onEditClick({ element: row.original })}
                        />
                        <button className='fa-solid fa-xmark admin-action-button' />
                    </div>
                )}
            />
        </div>
    );
}

function Accessories({ data, onEditClick }) {
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
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
                renderRowActions={({ row }) => (
                    <div className='admin-actions'>
                        <button
                            className='fa-solid fa-pencil admin-action-button'
                            onClick={() => onEditClick({ element: row.original })}
                        />
                        <button className='fa-solid fa-xmark admin-action-button' />
                    </div>
                )}
            />
        </div>
    );
}

function Materials({ data, onEditClick }) {
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
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
                renderRowActions={({ row }) => (
                    <div className='admin-actions'>
                        <button
                            className='fa-solid fa-pencil admin-action-button'
                            onClick={() => onEditClick({ element: row.original })}
                        />
                        <button className='fa-solid fa-xmark admin-action-button' />
                    </div>
                )}
            />
        </div>
    );
}

function Users({ data, onEditClick }) {
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
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
                renderRowActions={({ row }) => (
                    <div className='admin-actions'>
                        <button
                            className='fa-solid fa-pencil admin-action-button'
                            onClick={() => onEditClick({ element: row.original })}
                        />
                        <button className='fa-solid fa-xmark admin-action-button' />
                    </div>
                )}
            />
        </div>
    );
}
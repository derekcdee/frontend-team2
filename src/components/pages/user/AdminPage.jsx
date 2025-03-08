import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormField, FormTextArea, FormSelect, DefaultToggle } from '../../util/Inputs';
import { DefaultButton } from '../../util/Buttons';
import { getUsers, createUser, editUser, changePassword, deleteUser } from '../../../util/requests';
import { receiveResponse } from '../../../util/notifications';
import { AdminSkeletonLoader } from '../../util/Util';


export default function AdminPage() {
    const [adminPage, setAdminPage] = useState('Cues');
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({});
    const [passwordDialogProps, setPasswordDialogProps] = useState({});
    const [deleteDialogProps, setDeleteDialogProps] = useState({});

    const [cueData, setCueData] = useState([]);
    const [accessoryData, setAccessoryData] = useState([]);
    const [materialData, setMaterialData] = useState([]);
    const [userData, setUserData] = useState([]);

    const getData = async () => {
        setLoading(true);

        switch (adminPage) {
            case 'Cues':
                setLoading(false);
                break;
            case 'Accessories':
                setLoading(false);
                break;
            case 'Materials':
                setLoading(false);
                break;
            case 'Users':
                getUsers()
                    .then((res) => {
                        setLoading(false);
                        setUserData(res.data);
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getData();
    }, [adminPage]);

    const handleDialogOpen = (props) => {
        setDialogProps({ ...props });
        setDialogOpen(true);
    };

    const handlePasswordDialogOpen = (props) => {
        setPasswordDialogProps({ ...props, title: 'Change Password' });
        setPasswordDialogOpen(true);
    };

    const handleDeleteDialogOpen = (props) => {
        setDeleteDialogProps({ ...props });
        setDeleteDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogProps({});
    };

    const handlePasswordDialogClose = () => {
        setPasswordDialogOpen(false);
        setPasswordDialogProps({});
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setDeleteDialogProps({});
    };

    return (
        <div>
            <AdminHeader setAdminPage={setAdminPage} adminPage={adminPage} loading={loading} onPlusClick={handleDialogOpen} />
            <div className='user-content'>
                <AdminContent adminPage={adminPage} loading={loading} onEditClick={handleDialogOpen} onPasswordEditClick={handlePasswordDialogOpen} onDeleteClick={handleDeleteDialogOpen} cueData={cueData} accessoryData={accessoryData} materialData={materialData} userData={userData}/>
            </div>
            {adminPage === 'Cues' && <CueDialog open={dialogOpen} onClose={handleDialogClose} getData={getData} {...dialogProps} />}
            {adminPage === 'Accessories' && <AccessoryDialog open={dialogOpen} onClose={handleDialogClose} getData={getData} {...dialogProps} />}
            {adminPage === 'Materials' && <MaterialDialog open={dialogOpen} onClose={handleDialogClose} getData={getData} {...dialogProps} />}
            {adminPage === 'Users' && <UserDialog open={dialogOpen} onClose={handleDialogClose} getData={getData} {...dialogProps} />}
            {passwordDialogOpen && <PasswordDialog open={passwordDialogOpen} onClose={handlePasswordDialogClose} getData={getData} {...passwordDialogProps} />}
            {deleteDialogOpen && <DeleteDialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} getData={getData} adminPage={adminPage} {...deleteDialogProps} />}
        </div>
    );
}

function AdminHeader({ setAdminPage, adminPage, loading, onPlusClick }) {
    const pages = ['Cues', 'Accessories', 'Materials', 'Users'];

    const handlePlusClick = () => {
        let title = '';

        switch (adminPage) {
            case 'Cues':
                title = 'New Cue';
                break;
            case 'Accessories':
                title = 'New Accessory';
                break;
            case 'Materials':
                title = 'New Material';
                break;
            case 'Users':
                title = 'New User';
                break;
        }

        onPlusClick({ title: title });
    }

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
                    onClick={handlePlusClick}
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
    );
}

function AdminContent({ adminPage, loading, onEditClick, onPasswordEditClick, onDeleteClick, cueData, accessoryData, materialData, userData }) {
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
        return <AdminSkeletonLoader />;
    }

    switch (adminPage) {
        case 'Cues':
            return <CuesTable data={data} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
        case 'Accessories':
            return <AccessoriesTable data={data} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
        case 'Materials':
            return <MaterialsTable data={data} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
        case 'Users':
            return <UsersTable data={userData} onEditClick={onEditClick} onPasswordEditClick={onPasswordEditClick} onDeleteClick={onDeleteClick} />;
        default:
            return null;
    }
}

function CuesTable({ data, onEditClick }) {
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
        {
            id: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <div className='admin-actions'>
                    <button
                        className='fa-solid fa-pencil admin-action-button'
                        onClick={() => onEditClick({ element: row.original, title: `Edit Cue '${row.original.name}'` })}
                    />
                    <button className='fa-solid fa-trash admin-action-button' />
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="admin-page-header">Cues</h2>
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
            />
        </div>
    );
}

function AccessoriesTable({ data, onEditClick }) {
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
        {
            id: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <div className='admin-actions'>
                    <button
                        className='fa-solid fa-pencil admin-action-button'
                        onClick={() => onEditClick({ element: row.original })}
                    />
                    <button className='fa-solid fa-trash admin-action-button' />
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="admin-page-header">Accessories</h2>
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
            />
        </div>
    );
}

function MaterialsTable({ data, onEditClick }) {
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
        {
            id: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <div className='admin-actions'>
                    <button
                        className='fa-solid fa-pencil admin-action-button'
                        onClick={() => onEditClick({ element: row.original })}
                    />
                    <button className='fa-solid fa-trash admin-action-button' />
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="admin-page-header">Materials</h2>
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
            />
        </div>
    );
}

function UsersTable({ data, onEditClick, onPasswordEditClick, onDeleteClick }) {
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
            accessorKey: 'email',
            header: 'Email',
        },
        {
            header: 'Password',
            Cell: ({ row }) => (
                <div className='admin-actions'>
                    <button
                        className='fa-solid fa-pencil admin-action-button'
                        onClick={() => onPasswordEditClick({ element: row.original })}
                    />
                </div>
            ),
        },
        {
            header: 'Actions',
            Cell: ({ row }) => (
                <div className='admin-actions'>
                    <button
                        className='fa-solid fa-pencil admin-action-button'
                        onClick={() => onEditClick({ element: row.original, title: `Edit User '${row.original.firstName}'` })}
                    />
                    <button
                        className='fa-solid fa-trash admin-action-button'
                        onClick={() => onDeleteClick({ element: row.original, title: `Delete User '${row.original.firstName}'` })}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="admin-page-header">Users</h2>
            <MaterialReactTable
                columns={columns}
                data={data}
                {...tableProps}
            />
        </div>
    );
}

function CueDialog({ open, onClose, title, getData, element = {
    cueNumber: '',
    name: '',
    description: '',
    price: '',
    overallWeight: '',
    overallLength: '',
    tipSize: '',
    ferruleMaterial: '',
    shaftMaterial: '',
    shaftTaper: '',
    jointPinSize: '',
    jointPinMaterial: '',
    jointCollarMaterial: '',
    forearmMaterial: '',
    handleMaterial: '',
    handleWrapMaterial: '',
    buttSleeveMaterial: '',
    jointRings: '',
    handleRings: '',
    buttRings: '',
    buttWeight: '',
    buttLength: '',
    buttCapMaterial: '',
    status: '',
    forearmInlayQuantity: '',
    forearmInlaySize: '',
    buttsleeveInlayQuantity: '',
    buttsleeveInlaySize: '',
    ringsInlayQuantity: '',
    ringsInlaySize: '',
    forearmPointQuantity: '',
    forearmPointSize: '',
    forearmPointVeneerColor: '',
    buttSleevePointQuantity: '',
    buttSleevePointSize: '',
    buttSleevePointVeneerColor: ''
  }}) {
    const [includeWrap, setIncludeWrap] = useState(false);
    const [includeForearmPointVeneers, setIncludeForearmPointVeneers] = useState(false);
    const [includeButtSleevePointVeneers, setIncludeButtSleevePointVeneers] = useState(false);
    const [includeInlays, setIncludeInlays] = useState(false);

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
    const status = watch("status");
    const tipSize = watch("tipSize");
    const ferruleMaterial = watch("ferruleMaterial");
    const shaftMaterial = watch("shaftMaterial");
    const shaftTaper = watch("shaftTaper");
    const jointPinSize = watch("jointPinSize");
    const jointPinMaterial = watch("jointPinMaterial");
    const jointCollarMaterial = watch("jointCollarMaterial");
    const forearmMaterial = watch("forearmMaterial");
    const handleMaterial = watch("handleMaterial");
    const handleWrapMaterial = watch("handleWrapMaterial");
    const buttSleeveMaterial = watch("buttSleeveMaterial");
    const jointRings = watch("jointRings");
    const handleRings = watch("handleRings");
    const buttRings = watch("buttRings");
    const buttWeight = watch("buttWeight");
    const buttLength = watch("buttLength");
    const buttCapMaterial = watch("buttCapMaterial");
    const forearmPointQuantity = watch("forearmPointQuantity");
    const forearmPointSize = watch("forearmPointSize");
    const forearmPointVeneerColor = watch("forearmPointVeneerColor");
    const buttSleevePointQuantity = watch("buttSleevePointQuantity");
    const buttSleevePointSize = watch("buttSleevePointSize");
    const buttSleevePointVeneerColor = watch("buttSleevePointVeneerColor");
    const forearmInlayQuantity = watch("forearmInlayQuantity");
    const forearmInlaySize = watch("forearmInlaySize");
    const buttsleeveInlayQuantity = watch("buttsleeveInlayQuantity");
    const buttsleeveInlaySize = watch("buttsleeveInlaySize");
    const ringsInlayQuantity = watch("ringsInlayQuantity");
    const ringsInlaySize = watch("ringsInlaySize");

    const sizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
    ];

    const materialOptions = [
        { value: 'juma', label: 'Juma' },
        { value: 'rubber', label: 'Rubber' },
        { value: 'wood', label: 'Wood' }
    ];

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem', marginLeft: '10px' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="cue-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
                        <div>
                            <h3 className="dialog-header">General Attributes</h3>
                            <div className="form-column">
                                <div className="form-row">
                                    <div className="flex-1">
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
                                    </div>
                                    <div className="flex-2">
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
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="flex-1">
                                        <FormField
                                            title="Price"
                                            type="number"
                                            value={price}
                                            {...register("price")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <FormField
                                            title="Overall Weight (oz)"
                                            type="number"
                                            value={overallWeight}
                                            {...register("overallWeight")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <FormField
                                            title="Overall Length (in)"
                                            type="number"
                                            value={overallLength}
                                            {...register("overallLength")}
                                        />
                                    </div>
                                </div>
                                <FormTextArea
                                    title="Description"
                                    value={description}
                                    {...register("description")}
                                />
                                <FormSelect
                                    title="Status"
                                    value={status}
                                    options={sizeOptions}
                                    displayKey="label"
                                    {...register("status")}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="dialog-header">Shaft</h3>
                            <div>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Shaft Material"
                                            value={shaftMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("shaftMaterial")}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Shaft Taper"
                                            value={shaftTaper}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("shaftTaper")}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Tip Size (mm)"
                                            value={tipSize}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("tipSize")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="dialog-header2">Ferrule</h2>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Ferrule Material"
                                            value={ferruleMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("ferruleMaterial")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="dialog-header">Butt</h3>
                            <div>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormField
                                            title="Butt Weight (oz)"
                                            type="number"
                                            value={buttWeight}
                                            {...register("buttWeight")}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormField
                                            title="Butt Length (in)"
                                            type="number"
                                            value={buttLength}
                                            {...register("buttLength")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="dialog-header2">Joint Pin</h2>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Joint Pin Size (in)"
                                            value={jointPinSize}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("jointPinSize")}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Joint Pin Material"
                                            value={jointPinMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("jointPinMaterial")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="dialog-header2">Joint Collar</h2>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Joint Collar Material"
                                            value={jointCollarMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("jointCollarMaterial")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="dialog-header2">Forearm</h2>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Forearm Material"
                                            value={forearmMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("forearmMaterial")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='form-row'>
                                    <h2 className="dialog-header2">Handle</h2>
                                    <DefaultToggle titleOn={"Include Wrap"} titleOff={"Exclude Wrap"} onChange={setIncludeWrap}/>
                                </div>
                                
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        {includeWrap ? 
                                            <FormSelect
                                            title="Handle Wrap Material"
                                            value={handleWrapMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("handleWrapMaterial")}
                                            />
                                        :
                                            <FormSelect
                                                title="Handle Material"
                                                value={handleMaterial}
                                                options={materialOptions}
                                                displayKey="label"
                                                {...register("handleMaterial")}
                                            />}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="dialog-header2">Butt Sleeve</h2>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Butt Sleeve Material"
                                            value={buttSleeveMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("buttSleeveMaterial")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="dialog-header2">Butt Cap</h2>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Butt Cap Material"
                                            value={buttCapMaterial}
                                            options={materialOptions}
                                            displayKey="label"
                                            {...register("buttCapMaterial")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="dialog-header">Rings</h3>
                            <div className='form-row'>
                                <div className='flex-1'>
                                    <FormSelect
                                        title="Joint Rings Material"
                                        value={jointRings}
                                        options={materialOptions}
                                        displayKey="label"
                                        {...register("jointRings")}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <FormSelect
                                        title="Handle Rings Material"
                                        value={handleRings}
                                        options={materialOptions}
                                        displayKey="label"
                                        {...register("handleRings")}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <FormSelect
                                        title="Butt Rings Material"
                                        value={buttRings}
                                        options={materialOptions}
                                        displayKey="label"
                                        {...register("buttRings")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="dialog-header">Points</h3>
                            <div>
                                <div className='form-row'>
                                    <h2 className="dialog-header2">Forearm Point</h2>
                                    <DefaultToggle titleOn={"Include Veneers"} titleOff={"Exclude Veneers"} onChange={setIncludeForearmPointVeneers}/>
                                </div>
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormField
                                            title="Quantity"
                                            type="number"
                                            value={forearmPointQuantity}
                                            {...register("forearmPointQuantity")}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Size"
                                            value={forearmPointSize}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("forearmPointSize")}
                                        />
                                    </div>
                                    {includeForearmPointVeneers &&
                                        <div className='flex-1'>
                                        <FormSelect
                                            title="Point Veneer Color"
                                            value={forearmPointVeneerColor}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("forearmPointVeneerColor")}
                                        />
                                    </div>}
                                </div>
                            </div>
                            <div>
                                <div className='form-row'>
                                    <h2 className="dialog-header2">Butt Sleeve Point</h2>
                                    <DefaultToggle titleOn={"Include Veneers"} titleOff={"Exclude Veneers"} onChange={setIncludeButtSleevePointVeneers}/>
                                </div>
                                
                                <div className='form-row'>
                                    <div className='flex-1'>
                                        <FormField
                                            title="Quantity"
                                            type="number"
                                            value={buttSleevePointQuantity}
                                            {...register("buttSleevePointQuantity")}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <FormSelect
                                            title="Size"
                                            value={buttSleevePointSize}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("buttSleevePointSize")}
                                        />
                                    </div>
                                    {includeButtSleevePointVeneers &&
                                        <div className='flex-1'>
                                        <FormSelect
                                            title="Point Veneer Color"
                                            value={buttSleevePointVeneerColor}
                                            options={sizeOptions}
                                            displayKey="label"
                                            {...register("buttSleevePointVeneerColor")}
                                        />
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='form-row'>
                                <h3 className="dialog-header">Inlays</h3>
                                <DefaultToggle titleOn={"Include Inlays"} titleOff={"Exclude Inlays"} onChange={setIncludeInlays}/>
                            </div>
                            {includeInlays && <>
                                <div>
                                    <h2 className="dialog-header2">Forearm Inlay</h2>
                                    <div className='form-row'>
                                        <div className='flex-1'>
                                            <FormField
                                                title="Quantity"
                                                type="number"
                                                value={forearmInlayQuantity}
                                                {...register("forearmInlayQuantity")}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <FormSelect
                                                title="Size"
                                                value={forearmInlaySize}
                                                options={sizeOptions}
                                                displayKey="label"
                                                {...register("forearmInlaySize")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="dialog-header2">Buttsleeve Inlay</h2>
                                    <div className='form-row'>
                                        <div className='flex-1'>
                                            <FormField
                                                title="Quantity"
                                                type="number"
                                                value={buttsleeveInlayQuantity}
                                                {...register("buttsleeveInlayQuantity")}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <FormSelect
                                                title="Size"
                                                value={buttsleeveInlaySize}
                                                options={sizeOptions}
                                                displayKey="label"
                                                {...register("buttsleeveInlaySize")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="dialog-header2">Rings Inlay</h2>
                                    <div className='form-row'>
                                        <div className='flex-1'>
                                            <FormField
                                                title="Quantity"
                                                type="number"
                                                value={ringsInlayQuantity}
                                                {...register("ringsInlayQuantity")}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <FormSelect
                                                title="Size"
                                                value={ringsInlaySize}
                                                options={sizeOptions}
                                                displayKey="label"
                                                {...register("ringsInlaySize")}
                                            />
                                        </div>
                                    </div>
                                </div> 
                            </>}
                        </div>
                        <DialogActions>
                            <DefaultButton text={"Save"} />
                        </DialogActions>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AccessoryDialog({ open, onClose, title, getData, element = { name: '', description: '', price: '', accessoryNumber: '', status: '' } }) {
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
    const status = watch("status");

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem', marginLeft: '10px' }}
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
                        <FormTextArea
                            title="Description"
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
                        <FormSelect
                            title="Status"
                            value={status}
                            error={errors.status && errors.status.message}
                            options={statusOptions}
                            displayKey="label"
                            {...register("status", {
                                required: "Status is required"
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

function MaterialDialog({ open, onClose, title, getData, element = false}) {
    const [materialType, setMaterialType] = useState("");
    
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

    const materialTypeOptions = [
        { value: 'wood', label: 'Wood' },
        { value: 'crystal', label: 'Stone/Crystal' }
    ];

    const renderWoodAttributes = () => (
        <>

        </>
    )

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem', marginLeft: '10px' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="material-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
                        <FormSelect
                            title="Material Type"
                            value={materialType}
                            onChange={(e) => setMaterialType(e.target.value)}
                            options={materialTypeOptions}
                            displayKey="label"
                        />
                        {materialType === 'wood' && renderWoodAttributes()}
                        {materialType === 'crystal' && renderCrystalAttributes()}
                        {materialType &&
                            <DialogActions>
                                <DefaultButton text={"Save"} />
                            </DialogActions>}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function UserDialog({ open, onClose, title, getData, element = { email: '', password: '', firstName: '', lastName: '' } }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: element
    });

    const existingUser = !!element.email;

    useEffect(() => {
        if (open) {
            reset(element);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        const userData = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
        }
        if (!existingUser) {
            userData.password = data.password;
        }

        if (!existingUser) {
            createUser(userData.email, userData.firstName, userData.lastName, userData.password)
                .then((res) => {
                    receiveResponse(res);
                    getData();
                    onClose();
                });
        } else {
            editUser(element.email, userData.email, userData.firstName, userData.lastName)
                .then((res) => {
                    receiveResponse(res);
                    getData();
                    onClose();
                });
        }
    };

    const email = watch("email");
    const password = watch("password");
    const firstName = watch("firstName");
    const lastName = watch("lastName");

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem', marginLeft: '10px' }}
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
                            title="First Name"
                            type="text"
                            value={firstName}
                            error={errors.firstName && errors.firstName.message}
                            {...register("firstName", {
                                required: "First Name is required",
                                maxLength: {
                                    value: 100,
                                    message: "First Name must be at most 100 characters long"
                                }
                            })}
                        />
                        <FormField
                            title="Last Name"
                            type="text"
                            value={lastName}
                            error={errors.lastName && errors.lastName.message}
                            {...register("lastName", {
                                required: "Last Name is required",
                                maxLength: {
                                    value: 100,
                                    message: "Last Name must be at most 100 characters long"
                                }
                            })}
                        />
                        {!existingUser && (
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
                        )}
                        <DialogActions>
                            <DefaultButton text={"Save"} />
                        </DialogActions>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function DeleteDialog({ open, onClose, title, adminPage, getData, element }) {
    const handleDelete = () => {
        switch (adminPage) {
            case 'Cues':

                break;
            case 'Accessories':

                break;
            case 'Materials':

                break;
            case 'Users':
                deleteUser(element.email)
                    .then((res) => {
                        receiveResponse(res);
                        getData();
                        onClose();
                    });
                break;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>
                {title}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem', marginLeft: '10px' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <div className="form-column">
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                    <DialogActions>
                        <div className='form-row'>
                            <DefaultButton text={"Cancel"} onClick={onClose} />
                            <DefaultButton text={"Confirm"} onClick={handleDelete} />
                        </div>
                    </DialogActions>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function PasswordDialog({ open, onClose, title, element = { password: '', firstName: '' } }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: element
    });

    useEffect(() => {
        if (open) {
            reset(element);
        }
    }, [open, reset]);

    const onSubmit = (data) => {
        changePassword(element.email, data.password)
            .then((res) => {
                receiveResponse(res);
            });
        onClose();
    };

    const firstName = element.firstName;
    const password = watch("password");

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>
                {title} {firstName && `'${firstName}'`}
                <button
                    className='fa-solid fa-xmark admin-action-button'
                    style={{ display: 'inline-block', float: 'right', justifySelf: 'right', fontSize: '1.5rem', marginTop: '-0.05rem', marginLeft: '10px' }}
                    onClick={onClose}
                />
            </DialogTitle>
            <DialogContent>
                <form className="password-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-column">
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

const tableProps = {
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
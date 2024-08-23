import { useState } from "react";
import { User } from "../../models/User.model";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface UsersListProps {
    users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
    const [userRows, setUserRows] = useState(users.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        rol: user.rol,
        email: user.email,
    })));
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<"success" | "warning" | "error">("success");

    const handleRoleChange = async (id: string, currentRole: string) => {
        if (currentRole === 'admin') {
            setAlertMessage("No se puede cambiar el rol de un administrador.");
            setAlertSeverity("warning");
            setOpenSnackbar(true);
            return;
        }

        const newRole = currentRole === 'usuario' ? 'premium' : 'usuario';

        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}/toggleRol`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentRole: newRole }),
            });

            if (!response.ok) {
                throw new Error('Failed to change role');
            }

            setUserRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, rol: newRole } : row
                )
            );

            setAlertMessage("Rol cambiado correctamente.");
            setAlertSeverity("success");
            setOpenSnackbar(true);

        } catch (error) {
            console.error(error);
            setAlertMessage('Failed to change role');
            setAlertSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleUserDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUserRows((prevRows) =>
                prevRows.filter((row) => row.id !== id)
            );

            setAlertMessage("Usuario eliminado correctamente.");
            setAlertSeverity("success");
            setOpenSnackbar(true);

        } catch (error) {
            console.error(error);
            setAlertMessage('Failed to delete user');
            setAlertSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'rol', headerName: 'Rol', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: "changeRole",
            headerName: "Change Role",
            width: 180,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRoleChange(params.row.id, params.row.rol)}
                >
                    Change Role
                </Button>
            ),
        },
        {
            field: "deleteUser",
            headerName: "Delete User",
            width: 180,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleUserDelete(params.row.id)}
                >
                    Delete User
                </Button>
            ),
        },
    ];

    return (
        <div style={{width: '100%' }}>
            <DataGrid
                rows={userRows}
                columns={columns}
            />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default UsersList;

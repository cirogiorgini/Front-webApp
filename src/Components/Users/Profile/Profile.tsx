import React from 'react';
import { useUser } from '../../../context/UserContext'
import Loader from '../../Loaders/Loader';
import { Container, Avatar, Typography, Box, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Profile: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return <Loader />
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 80, height: 80 }}>
                    <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Box sx={{ mt: 2, padding: 2, }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Role:</strong> {user.rol}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Age:</strong> {user.age}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {user.email}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;

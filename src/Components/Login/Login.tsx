import React from 'react';
import { Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Divider, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await fetch('http://localhost:8080/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                console.log(userData)
            }
    
           navigate('/home')
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };
    

    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#121212',
                        padding: 4,
                        borderRadius: 2,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                        Sign in
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', marginBottom: 2 }}>
                        Welcome user, please sign in to continue
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        sx={{ marginBottom: 2, backgroundColor: '#424242' }}
                    >
                        Sign In With GitHub
                    </Button>
                    <Divider sx={{ width: '100%', marginBottom: 2, color: 'white' }}>or</Divider>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        InputLabelProps={{ style: { color: '#b0b0b0' } }}
                        InputProps={{ style: { color: 'white' } }}
                        {...register('email', { required: 'Email is required' })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputLabelProps={{ style: { color: '#b0b0b0' } }}
                        InputProps={{ style: { color: 'white' } }}
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" sx={{ color: 'white' }} />}
                        label="Remember me"
                        sx={{ color: 'white' }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#424242' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default Login;

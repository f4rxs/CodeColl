import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUp.css';
import {
    Container,
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import { styled } from '@mui/system';

const AnimatedBox = styled(Box)({
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
    },
});

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

      

        try {
            const response = await axios.post('http://localhost:5000/codeColl/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 200) {
                setSuccessMessage('User Logged successfully!');
                setErrorMessage('');
                setFormData({
                    email: '',
                    password: '',

                });
                setSnackbarOpen(true);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error in logging user');
            setSuccessMessage('');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setErrorMessage('');
        setSuccessMessage(false);
    };

    return (
        <Container maxWidth="sm">
            <AnimatedBox sx={{ bgcolor: '#f5f5f5', padding: 4, borderRadius: 2, boxShadow: 3, marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                                color="primary"
                            />
                        }
                        label="Show Password"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert onClose={handleSnackbarClose} severity={errorMessage ? 'error' : 'success'}>
                        {errorMessage || successMessage}
                    </Alert>
                </Snackbar>
            </AnimatedBox>
        </Container>
    );
};

export default Login;

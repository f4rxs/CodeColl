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

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/codeColl/user', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 201) {
                setSuccessMessage('User created successfully!');
                setErrorMessage('');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setSnackbarOpen(true);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error in creating user');
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
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="username"
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
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
                    <TextField
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginTop: 2 }}
                    >
                        Sign Up
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

export default SignUp;

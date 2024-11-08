import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authenticationService from '../services/authenticationService';

const EmailVerification = () => {
    const { id, token } = useParams(); // Extract ID and token from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await authenticationService.emailVerification(id, token);
                toast.success(response.message, { autoClose: 3000 });
                navigate('/login'); // Navigate to login page after verification
            } catch (error) {
                toast.error(error.response?.data?.message || 'Email verification failed', { autoClose: 3000 });
                navigate('/signup'); // Redirect back to signup on failure
            }
        };

        verifyEmail();
    }, [id, token, navigate]);

    return (
        <div className="email-verification">
            <h2>Verifying Email...</h2>
        </div>
    );
};

export default EmailVerification;
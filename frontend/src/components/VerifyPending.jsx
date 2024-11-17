import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authenticationService from '../services/authenticationService';
import '../styles/VerifyPending.css'; 

const VerifyPending = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkVerificationStatus = async () => {
            const userId = localStorage.getItem('userId'); 

            if (!userId) {
                setLoading(false); 
                return; 
            }

            try {
                const response = await authenticationService.checkEmailVerification(userId);
                if (response.data.message === 'Email verified') {
                    toast.success('Email verified successfully.');
                    setTimeout(() => navigate('/signin'), 2000); 
                } else {
                    setIsVerified(false);
                }
            } catch (error) {
                console.error("Error verifying email:", error);
            }
            setLoading(false); 
        };


        const intervalId = setInterval(checkVerificationStatus, 5000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <div className="verify-pending-container">
            <h2 className="verify-pending-header">Check your email</h2>
            <p className="verify-pending-description">A verification link has been sent to your email. Please click the link to complete your registration.</p>
            
            {loading ? (
                <div className="spinner"></div>  
            ) : (
                <p className="verify-pending-message">Please wait while we verify your email...</p>
            )}

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeButton={true} />
        </div>
    );
};

export default VerifyPending;

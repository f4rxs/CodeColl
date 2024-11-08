import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authenticationService from '../services/authenticationService';
import '../styles/Signin.css';
import FadeIn from './animation/FadeIn';
import Footer from './Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authenticationService.signin({ email, password });
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('loggedUser', JSON.stringify(response.data.user));
      toast.success(response.data.message);
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      // Retrieve the full error message sent from the backend
      const errorMessage = err.response?.data?.message || 'Failed to log in. Please check your credentials.';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <FadeIn>
      <div className="signin-container">
        <h1 className="signin-title">Sign in to CodeColl</h1>
        <div className="signin-card">
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <div className="show-password">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label>Show Password</label>
              </div>
            </div>
            <button type="submit" className="signin-button">Sign In</button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          backgroundColor: '#0d1117',
          color: '#f0f6fc',
          borderRadius: '8px',
          fontSize : 12,
          padding: '16px',
        }}
      />
    </FadeIn>
  );
};

export default SignIn;

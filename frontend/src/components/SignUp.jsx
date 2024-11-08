import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authenticationService from '../services/authenticationService';
import '../styles/Signup.css';
import FadeIn from './animation/FadeIn';
import Footer from './Footer';
import zxcvbn from 'zxcvbn';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    const result = zxcvbn(password);
    setPasswordStrength(result.score); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticationService.signup({ username, email, password });
      localStorage.setItem('userId', response.data.user.id);  
      localStorage.setItem('confirmationToken', response.data.user.confirmation_token);
      toast.success(response.data.message);
      setTimeout(()=>navigate('/verify-pending'),1000)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to sign up. Please try again.';
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

  const getStrengthBarColor = () => {
    if (passwordStrength === 0) return 'red';
    if (passwordStrength === 1) return 'orange';
    if (passwordStrength === 2) return 'yellow';
    if (passwordStrength === 3) return 'lightgreen';
    if (passwordStrength === 4) return 'green';
  };

  return (
    <FadeIn>
      <div className="signup-container">
        <h1 className="signup-title">Sign up for CodeColl</h1>
        <div className="signup-card">
          <form onSubmit={handleSubmit} className="signup-form">
            {/* Username Field */}
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
            <div className="input-group">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
              {password && (
                <div className="password-strength">
                  <div
                    className="password-strength-bar"
                    style={{
                      width: `${(passwordStrength + 1) * 20}%`,
                      backgroundColor: getStrengthBarColor(),
                    }}
                  />
                  <span className="strength-label">
                    {passwordStrength === 0
                      ? 'Very Weak'
                      : passwordStrength === 1
                      ? 'Weak'
                      : passwordStrength === 2
                      ? 'Fair'
                      : passwordStrength === 3
                      ? 'Good'
                      : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            {/* Show Password Option */}
            <div className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label>Show Password</label>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
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
          fontSize: 12,
          padding: '16px',
        }}
      />
    </FadeIn>
  );
};

export default SignUp;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Signin from '../src/components/Signin'
import SignUp from './components/signup';
import EmailVerification from './components/EmailVerification';
import VerifyPending from './components/VerifyPending';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email/:id/:token" element={<EmailVerification />} />
        <Route path="/verify-pending" element={<VerifyPending />} />
        <Route path="/home" element={<UserPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

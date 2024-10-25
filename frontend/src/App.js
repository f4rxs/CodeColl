import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import MainPage from './pages/MainPage.jsx';
import Users from './components/usersTable.jsx';  

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />  {/* Main page route */}
                <Route path="/signup" element={<SignUp />} />  {/* SignUp page route */}
                <Route path="/login" element={<Login />} />  {/* Login page route */}
                <Route path="/users" element={<Users />} />  {/* Users page route */}
            </Routes>
        </Router>
    );
}

export default App;

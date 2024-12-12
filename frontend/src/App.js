import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Signin from './components/Signin';
import SignUp from './components/signup';
import EmailVerification from './components/EmailVerification';
import VerifyPending from './components/VerifyPending';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
import ProjectCreationPage from './pages/ProjectCreationPage';
import MyProjects from './pages/MyProjectsPage';
import ProjectPage from './pages/ProjectPage';
import CollaboratorProfilePage from './components/ProfileCollaborator';
import FileVersionPage from './components/FileVersion';
import SessionPage from './components/Session';
import { SocketProvider } from './Context/SocketContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Check token existence

  const handleLogout = () => {
    setIsAuthenticated(false); // Update state
  };

  return (
    <Router>
      {isAuthenticated ? (
        <SocketProvider>
          <AuthenticatedRoutes onLogout={handleLogout} />
        </SocketProvider>
      ) : (
        <UnauthenticatedRoutes setIsAuthenticated={setIsAuthenticated} />
      )}
    </Router>
  );
}

// Routes for authenticated users
function AuthenticatedRoutes({ onLogout }) {
  return (
    <Routes>
      <Route path="/home" element={<UserPage onLogout={onLogout} />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/create-project" element={<ProjectCreationPage />} />
      <Route path="/my-projects" element={<MyProjects />} />
      <Route path="/projects/:projectId" element={<ProjectPage />} />
      <Route path="/collaborator/:userId/permissions/:projectId" element={<CollaboratorProfilePage />} />
      <Route path="/file/:fileId/version/:versionNumber" element={<FileVersionPage />} />
      <Route path="/projects/:projectId/session/:sessionId" element={<SessionPage />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

// Routes for unauthenticated users
function UnauthenticatedRoutes({ setIsAuthenticated }) {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email/:id/:token" element={<EmailVerification />} />
      <Route path="/verify-pending" element={<VerifyPending />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

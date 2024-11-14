// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, json } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Signin from '../src/components/Signin'
import SignUp from './components/signup';
import EmailVerification from './components/EmailVerification';
import VerifyPending from './components/VerifyPending';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
import ProjectCreationPage from './pages/ProjectCreationPage';
import MyProjects from './pages/MyProjectsPage';
import ProjectPage from './pages/ProjectPage';
import CollaboratorProfilePage from './components/ProfileCollaborator';

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
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
        <Route path="/create-project" element={<ProjectCreationPage/>}/>
        <Route path="/my-projects" element={<MyProjects/>}/>
        <Route path="/projects/:projectId" element={<ProjectPage />} /> {/* Updated path */}
        <Route path="/collaborator/:userId/permissions/:projectId" element={<CollaboratorProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

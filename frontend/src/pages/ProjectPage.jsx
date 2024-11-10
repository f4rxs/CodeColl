// src/pages/ProjectPage.js
import React from "react";
import { useParams } from 'react-router-dom';
import AppNavbar from "../components/NavBar";
import Project from '../components/Project';
const ProjectPage = () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userId = loggedUser ? loggedUser.id : null;
    const { projectId } = useParams(); // Fetch projectId from URL parameters
    
    return (
        <div>
            <AppNavbar userId={userId} /> {/* Render the Navbar */}
            <Project projectId={projectId} /> {/* Pass projectId to Project */}
        </div>
    );
};

export default ProjectPage;

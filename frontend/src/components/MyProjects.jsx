import React, { useEffect, useState } from 'react';
import projectService from '../services/projectService'; 
import { useNavigate } from 'react-router-dom';
import '../styles/MyProjects.css'; 

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userId = loggedUser ? loggedUser.id : null;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectService.findProjectsByUser(userId);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Could not load projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId]);

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return (
        <div className="my-projects-container">
            <h2>My Projects</h2>
            {loading ? (
                <p>Loading projects...</p>
            ) : error ? (
                <p className="error-text">{error}</p>
            ) : projects.length > 0 ? (
                <div className="project-list">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card"
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <h3>{project.project_name}</h3>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default MyProjects;

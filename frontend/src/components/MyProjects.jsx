import React, { useEffect, useState } from 'react';
import projectService from '../services/projectService';
import collaborationSessionService from '../services/collaborationSessionService';
import { useNavigate } from 'react-router-dom';
import '../styles/MyProjects.css';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sessions, setSessions] = useState({});
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userId = loggedUser ? loggedUser.id : null;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectService.findProjectsByUser(userId);
                setProjects(response.data);
                const projectsData = response.data;
                const sessionPromises = projectsData.map(async (project) => {
                    const sessionResponse = await collaborationSessionService.getActiveSessionsByProject(project.id);
                    return { projectId: project.id, session: sessionResponse.data[0] }; // Assume one active session per project
                });

                const sessionsData = await Promise.all(sessionPromises);
                const sessionsMap = sessionsData.reduce((map, sessionInfo) => {
                    map[sessionInfo.projectId] = sessionInfo.session;
                    return map;
                }, {});

                setProjects(projectsData);
                setSessions(sessionsMap);
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

    const handleStartSession = async (projectId) => {
        try {
            const sessionResponse = await collaborationSessionService.startSession(projectId, {
                active_users: [userId], // Start session with the project owner
            });
            const newSession = sessionResponse.data;
            setSessions((prev) => ({ ...prev, [projectId]: newSession }));
            alert('Session started successfully!');
        } catch (error) {
            console.error('Error starting session:', error);
            alert('Failed to start session.');
        }
    };

    const handleJoinSession = (projectId) => {
        const session = sessions[projectId]; // Get the session for the project
    
        // Check if session exists
        if (session) {
            // Navigate to the session page using the correct session ID
            navigate(`/projects/${projectId}/session/${session.session._id}`);
        } else {
            alert('No active session to join.');
        }
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
                    {projects.map((project) => {
                        const session = sessions[project.id];
                        const isOwner = userId === project.owner_id;

                        return (
                            <div key={project.id} className="project-card">
                                <h3>{project.project_name}</h3>
                                <p>{project.description}</p>
                                <div className="project-actions">
                                    {isOwner && !session && (
                                        <button
                                            className="start-session-button"
                                            onClick={() => handleStartSession(project.id)}
                                        >
                                            Start Session
                                        </button>
                                    )}
                                    {session && (
                                        <button
                                            className="join-session-button"
                                            onClick={() => handleJoinSession(project.id)}
                                        >
                                            Join Session
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );  
};

export default MyProjects;

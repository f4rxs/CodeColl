import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fileService from '../services/fileService';
import projectCollaboratorService from '../services/projectCollaboratorService';
import projectService from '../services/projectService';
import FileEditor from '../components/FIleEditor';
import FileTree from '../components/FIleTree'; 
import '../styles/Project.css';

const Project = ({ projectId }) => {
    const [files, setFiles] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [project, setProject] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    const fetchFiles = async () => {
        try {
            const response = await fileService.getFilesByProjectId(projectId);
            setFiles(response.data.files); 
        } catch (error) {
            console.error("Error fetching files:", error);
            setFiles([]);
        }
    };

    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const response = await projectCollaboratorService.findCollaboratorsByProject(projectId);
                setCollaborators(response.data.collaborators || []);
            } catch (error) {
                console.error("Error fetching collaborators:", error);
                setCollaborators([]);
            }
        };

        const fetchProjectDetails = async () => {
            try {
                const response = await projectService.findProjectById(projectId);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchFiles();
        fetchCollaborators();
        fetchProjectDetails();
    }, [projectId]);

    // Function to handle navigating to the collaborator's profile page
    const navigateToProfile = (userId) => {
        
        navigate(`/profile/${userId}`);  // Navigate to the profile page of the collaborator
    };

    return (
        <div className="project-page">
            <h2 className="project-title">{project ? project.project_name : "Loading Project..."}</h2>
           
            <div className="project-container">
                {/* File Sidebar */}
                <div className="file-sidebar">
                    <FileTree files={files} onSelectFile={setSelectedFileId} projectId={projectId} />
                </div>

                {/* Main Content (IDE) */}
                <div className="main-content">
                    {selectedFileId ? (
                        <FileEditor fileId={selectedFileId} />
                    ) : (
                        <p>Select a file to edit</p>
                    )}
                </div>

                {/* Collaborators Sidebar */}
                <div className="collaborators-sidebar">
                    <h3>Collaborators</h3>
                    <ul>
                        {collaborators.map(collaborator => (
                            <li key={collaborator.id}>
                                {/* Clickable collaborator username */}
                                <button 
                                    className="collaborator-btn"
                                    onClick={() => navigateToProfile(collaborator.user_id)}
                                    
                                >
                                    {collaborator.user.username} - {collaborator.role}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Project;

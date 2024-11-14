import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fileService from '../services/fileService';
import projectCollaboratorService from '../services/projectCollaboratorService';
import projectService from '../services/projectService';
import FileEditor from '../components/FIleEditor';
import FileTree from '../components/FIleTree';
import InviteModal from '../components/InviteModal';
import '../styles/Project.css';

const Project = ({ projectId }) => {
    const [files, setFiles] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [project, setProject] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [isEditingProjectName, setIsEditingProjectName] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [isCollaborator, setIsCollaborator] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [userPermissions, setUserPermissions] = useState({});

    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const isOwner = loggedUser && project && loggedUser.id === project.owner_id;

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

                // Check if logged user is a collaborator
                const userCollaborator = response.data.collaborators.find(
                    collaborator => collaborator.user_id === loggedUser.id
                );

                setIsCollaborator(!!userCollaborator);
                setUserPermissions(userCollaborator ? userCollaborator.permissions : {});
            } catch (error) {
                console.error("Error fetching collaborators:", error);
                setCollaborators([]);
            }
        };

        const fetchProjectDetails = async () => {
            try {
                const response = await projectService.findProjectById(projectId);
                setProject(response.data);
                setNewProjectName(response.data.project_name);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchFiles();
        fetchCollaborators();
        fetchProjectDetails();
    }, [projectId]);

    const navigateToProfile = (userId) => {
        if (userPermissions.can_manage_collaborators) {
            navigate(`/collaborator/${userId}/permissions`, { state:  projectId  });
        } else {
            navigate(`/profile/${userId}`);
        }
    };

    const handleDeleteFile = async (fileId) => {
        try {
            await fileService.deleteFile(fileId);
            setFiles(files.filter(file => file.id !== fileId));
        } catch (error) {
            console.error("Error deleting file:", error);
            alert('Failed to delete file.');
        }
    };

    const handleRenameProject = async () => {
        try {
            await projectService.updateProject(projectId, { project_name: newProjectName });
            setProject(prevProject => ({ ...prevProject, project_name: newProjectName }));
            setIsEditingProjectName(false);
        } catch (error) {
            console.error("Error renaming project:", error);
            alert('Failed to rename project.');
        }
    };

    if (!project) return <p>Loading project...</p>;

    return (
        <div className="project-page">
            <h2 
                className="project-title"
                onDoubleClick={() => isOwner && setIsEditingProjectName(true)}
            >
                {isEditingProjectName ? (
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        onBlur={handleRenameProject}
                        onKeyDown={(e) => e.key === 'Enter' && handleRenameProject()}
                        autoFocus
                    />
                ) : (
                    project.project_name
                )}
            </h2>

            {!isCollaborator ? (
                <div className="project-overview">
                    <p>Created on: {new Date(project.created_at).toLocaleDateString()}</p>
                    <p>Number of files: {files.length}</p>
                    <p>Number of collaborators: {collaborators.length}</p>
                </div>
            ) : (
                <div className="project-container">
                    <div className="file-sidebar">
                        <FileTree 
                            files={files} 
                            onSelectFile={setSelectedFileId} 
                            projectId={projectId} 
                            onDeleteFile={isOwner ? handleDeleteFile : null}
                        />
                    </div>

                    <div className="main-content">
                        {selectedFileId ? (
                            <FileEditor fileId={selectedFileId} />
                        ) : (
                            <p>Select a file to edit</p>
                        )}
                    </div>

                    <div className="collaborators-sidebar">
                        <div className="collaborators-header">
                            <h3>Collaborators</h3>
                            {isOwner && (
                                <button 
                                    className="invite-button" 
                                    onClick={() => setIsInviteModalOpen(true)}
                                >
                                    + Invite
                                </button>
                            )}
                        </div>
                        <ul>
                            {collaborators.map(collaborator => (
                                <li key={collaborator.id} className="collaborator-item">
                                    <button 
                                        className="collaborator-btn"
                                        onClick={() => navigateToProfile(collaborator.user_id)}
                                    >
                                        {collaborator.user.username} - {collaborator.role}
                                    </button>
                                    <div className="permissions">
                                        <ul>
                                            <li>Edit: {collaborator.permissions.can_edit ? 'Yes' : 'No'}</li>
                                            <li>Lock Files: {collaborator.permissions.can_lock_files ? 'Yes' : 'No'}</li>
                                            <li>Manage Collaborators: {collaborator.permissions.can_manage_collaborators ? 'Yes' : 'No'}</li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <InviteModal 
                show={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                projectId={projectId}
                ownerName={project.owner_name}  
                projectTitle={project.project_name}
            />
        </div>
    );
};

export default Project;

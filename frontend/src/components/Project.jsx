import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChat, BsPersonPlus } from 'react-icons/bs'; 
import collaborationSessionService from '../services/collaborationSessionService'; // 
import fileService from '../services/fileService';
import projectCollaboratorService from '../services/projectCollaboratorService';
import projectService from '../services/projectService';
import FileEditor from '../components/FIleEditor';
import FileTree from '../components/FIleTree';
import InviteModal from '../components/InviteModal';
import activityService from '../services/activitylogService';
import defaultPfp from '../assests/defaultpfp.png'
import '../styles/Project.css';

const Project = ({ projectId }) => {
    const [files, setFiles] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [project, setProject] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [lockedFiles, setLockedFiles] = useState({});
    const [isEditingProjectName, setIsEditingProjectName] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [isCollaborator, setIsCollaborator] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [userPermissions, setUserPermissions] = useState({});
    const [activityDescription, setActivityDescription] = useState('');
    const [isFileTreeVisible, setIsFileTreeVisible] = useState(true);
    const [isCollaboratorsVisible, setIsCollaboratorsVisible] = useState(true);
    const [activeSession, setActiveSession] = useState(null);

    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const isOwner = loggedUser && project && loggedUser.id === project.owner_id;

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fileService.getFilesByProjectId(projectId);
                const filesWithLockState = response.data.files.map(file => ({
                    ...file,
                    locked_by: file.locked_by || null,
                }));
                setFiles(filesWithLockState);
            } catch (error) {
                console.error("Error fetching files:", error);
                setFiles([]);
            }
        };

        const fetchCollaborators = async () => {
            try {
                const response = await projectCollaboratorService.findCollaboratorsByProject(projectId);
                setCollaborators(response.data.collaborators || []);

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
        const fetchActiveSession = async () => {
            try {
                const response = await collaborationSessionService.getActiveSessionsByProject(projectId);
                console.log(response);
                if (response.data.sessions.length > 0) {
                    setActiveSession(response.data.sessions[0]); // Assuming one active session per project
                }
            } catch (error) {
                console.error("Error fetching active session:", error);
            }
        };

        fetchFiles();
        fetchCollaborators();
        fetchProjectDetails();
        fetchActiveSession();
    }, [projectId]);


    const handleJoinSession = () => {
        if (activeSession) {
            navigate(`/projects/${projectId}/session/${activeSession._id}`);
        } else {
            alert('No active session to join.');
        }
    };

    const navigateToProfile = (userId) => {
        if (userPermissions.can_manage_collaborators) {
            navigate(`/collaborator/${userId}/permissions/${projectId}`);
        } else {
            navigate(`/profile/${userId}`);
        }
    };

    const handleLockFile = async (fileId) => {
        try {
            const file = files.find(f => f.id === fileId);
            const isLocked = !!file.locked_by;

            if (isLocked) {
                await fileService.unlockFile(fileId);
            } else {
                await fileService.lockFile(fileId, loggedUser.id);
            }

            setFiles(files.map(f =>
                f.id === fileId
                    ? { ...f, locked_by: isLocked ? null : loggedUser.id }
                    : f
            ));
        } catch (error) {
            console.error("Error locking/unlocking file:", error);
            alert("Failed to lock/unlock file.");
        }
    };

    const handlePostActivity = async () => {
        try {
            if (activityDescription.trim()) {
                await activityService.logActivity(
                    loggedUser.id, projectId, activityDescription
                );
                alert("Activity has been posted");
                setActivityDescription("");
            } else {
                alert("Activity description cannot be empty!");
            }
        } catch (error) {
            console.error("Error posting activity:", error);
            alert("Failed to post activity.");
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
            alert("Failed to rename project.");
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
                        onKeyDown={(e) => e.key === "Enter" && handleRenameProject()}
                        autoFocus
                    />
                ) : (
                    project.project_name
                )}
            </h2>


            {/* Toolbar for toggles */}
            <div className="project-toolbar">
                <div className="toggle-controls">
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isFileTreeVisible}
                            onChange={() => setIsFileTreeVisible(!isFileTreeVisible)}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">File Tree</span>

                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isCollaboratorsVisible}
                            onChange={() => setIsCollaboratorsVisible(!isCollaboratorsVisible)}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">Collaborators</span>
                    {activeSession && (
                        <BsPersonPlus
                            className="session-icon"
                            onClick={handleJoinSession}
                            title="Join Active Session"
                        />
                    )}
                </div>
            </div>


            {!isCollaborator ? (
                <div className="project-overview">
                    <p>Created on: {new Date(project.created_at).toLocaleDateString()}</p>
                    <p>Number of files: {files.length}</p>
                    <p>Number of collaborators: {collaborators.length}</p>
                </div>
            ) : (


                <div className="project-container">
                    {isFileTreeVisible && (
                        <div className="file-sidebar">
                            <FileTree
                                files={files}
                                onSelectFile={setSelectedFileId}
                                projectId={projectId}
                                onDeleteFile={isOwner ? handleDeleteFile : null}
                                onLockFile={handleLockFile}
                                showLockOption={isOwner || userPermissions.can_lock_files}
                                userId={loggedUser.id}
                                collaborators={collaborators}
                                canEdit={userPermissions.can_edit}
                            />

                        </div>
                    )}
                    <div className="main-content">
                        {selectedFileId ? (
                            <div>
                                <FileEditor
                                    fileId={selectedFileId}
                                    canEdit={isOwner || userPermissions.can_edit}
                                />
                                <div className="activity-input">
                                    <input
                                        type="text"
                                        value={activityDescription}
                                        onChange={(e) => setActivityDescription(e.target.value)}
                                        placeholder="Enter activity description..."
                                    />
                                    <button
                                        className="post-activity-button"
                                        onClick={handlePostActivity}
                                    >
                                        Post Activity
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p>Select a file to edit</p>
                        )}
                    </div>


                    {isCollaboratorsVisible && (
                        <div className="collaborators-sidebar">
                            <div className="collaborators-header">
                                <h3>Collaborators</h3>
                                {(isOwner || userPermissions.can_manage_collaborators) && (
                                    <button
                                        className="invite-button"
                                        onClick={() => setIsInviteModalOpen(true)}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                            <ul>
                                {collaborators.map(collaborator => (
                                    <li key={collaborator.user_id} className="collaborator-item">
                                        <button
                                            className="collaborator-btn"
                                            onClick={() => navigateToProfile(collaborator.user_id)}
                                        >
                                            <img
                                                src={collaborator.user.profile_pic || defaultPfp}
                                                alt={collaborator.name}
                                                className="collaborator-avatar"
                                            />
                                            <div className="collaborator-details">
                                                <strong>{collaborator.user.username}</strong>
                                                <span className="collaborator-role">{collaborator.role}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <InviteModal
                show={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                projectId={projectId}
                projectTitle={project.project_name}
            />
        </div>
    );
};

export default Project;
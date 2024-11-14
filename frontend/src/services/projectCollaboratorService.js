import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

const addCollaborator = (projectId, userId, role, permissions) => {
    return httpCommon.post(`/projectCollaborators/${projectId}/${userId}`, 
    { role, permissions },
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const findCollaboratorsByProject = (projectId) => {
    return httpCommon.get(`/project/collaborator/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const updateCollaboratorRole = (projectId, userId, newRole) => {
    return httpCommon.put(`/projectCollaborators/${projectId}/${userId}`, 
    { newRole },
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const removeCollaborator = (projectId, userId) => {
    return httpCommon.delete(`/projectCollaborators/${projectId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const getCollaboratorUsernames = (projectId) => {
    return httpCommon.get(`/projectCollaborators/usernames/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};
const getUserProjectsController = (userId) => {
    return httpCommon.get(`project/collaborator/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};


const updateCollaboratorPermissions = (userId, projectId, permissions) => {
    return httpCommon.put(`/project/collaborator/permission/${projectId}/${userId}/permissions`, { permissions }, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
};


// Export all functions as a service object
const projectCollaboratorService = {
    addCollaborator,
    findCollaboratorsByProject,
    updateCollaboratorRole,
    removeCollaborator,
    getCollaboratorUsernames,
    getUserProjectsController,
    updateCollaboratorPermissions
    
};

export default projectCollaboratorService;
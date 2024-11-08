import { getToken } from '../utils/utils';
import httpCommon from "../http-common";


// CREATE a new project
const createProject = (data) => {
    return httpCommon.post('/projects', data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// GET project by ID
const findProjectById = (projectId) => {
    return httpCommon.get(`/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// GET projects owned by a specific user
const findProjectsByUser = (userId) => {
    return httpCommon.get(`/projects/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// UPDATE a project by ID
const updateProject = (projectId, data) => {
    return httpCommon.put(`/projects/${projectId}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// DELETE a project by ID
const deleteProject = (projectId) => {
    return httpCommon.delete(`/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// SEARCH projects by term
const searchProjects = (term) => {
    return httpCommon.get(`/projects/search/${term}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// GET project overview
const getProjectOverview = (projectId) => {
    return httpCommon.get(`/projects/overview/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// ARCHIVE a project by ID
const archiveProject = (projectId) => {
    return httpCommon.put(`/projects/archive/${projectId}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// RESTORE an archived project by ID
const restoreArchivedProject = (projectId) => {
    return httpCommon.put(`/projects/restore/${projectId}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// DUPLICATE a project by ID
const duplicateProject = (projectId) => {
    return httpCommon.post(`/projects/duplicate/${projectId}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// GET all archived projects
const getArchivedProjects = () => {
    return httpCommon.get('/projects/project/archived', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const projectService = {
    createProject,
    findProjectById,
    findProjectsByUser,
    updateProject,
    deleteProject,
    searchProjects,
    getProjectOverview,
    archiveProject,
    restoreArchivedProject,
    duplicateProject,
    getArchivedProjects
};

export default projectService;

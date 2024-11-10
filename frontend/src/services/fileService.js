import httpCommon from "../http-common";
import { getTokenBearer } from '../utils/utils';

// Get a file by ID
const getFileById = (fileId) => {
    return httpCommon.get(`/files/${fileId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Get files by project ID
const getFilesByProjectId = (projectId) => {
    return httpCommon.get(`/files/project/${projectId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Create a new file in a project
const createFile = (projectId, filename, content) => {
    return httpCommon.post(`/files/${projectId}`, { filename, content }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Update a file by ID
const updateFile = (fileId, updatedData) => {
    return httpCommon.put(`/files/${fileId}`, updatedData, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Lock a file for editing
const lockFileForEditing = (fileId, userId) => {
    return httpCommon.put(`/files/lock/${fileId}`, { userId }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Unlock a file after editing
const unlockFileAfterEditing = (fileId, userId) => {
    return httpCommon.put(`/files/unlock/${fileId}`, { userId }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Delete a file by ID
const deleteFile = (fileId) => {
    return httpCommon.delete(`/files/${fileId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Export all functions as part of the fileService object
const fileService = {
    getFileById,
    getFilesByProjectId,
    createFile,
    updateFile,
    lockFileForEditing,
    unlockFileAfterEditing,
    deleteFile
};

export default fileService;

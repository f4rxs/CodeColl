import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Create a new file version
const createFileVersion = (fileId, versionData) => {
    return httpCommon.post(`/file/version/${fileId}`, versionData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Find all versions for a specific file
const findFileVersions = (fileId) => {
    return httpCommon.get(`/file/version/${fileId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const getFileVersionContext = (fileId, versionNumber) => {
    return httpCommon.get(`/file/version/${fileId}/version/${versionNumber}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Find the latest version for a specific file
const findLatestFileVersion = (fileId) => {
    return httpCommon.get(`/file/version/latest/${fileId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Restore a specific file version
const restoreFileVersion = (fileId, versionId) => {
    return httpCommon.put(`/file/version/restore/${fileId}/${versionId}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const fileVersionService = {
    createFileVersion,
    findFileVersions,
    getFileVersionContext,
    findLatestFileVersion,
    restoreFileVersion
};

export default fileVersionService;

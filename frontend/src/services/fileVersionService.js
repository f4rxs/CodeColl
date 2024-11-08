import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Create a new file version
const createFileVersion = (fileId, versionData) => {
    return httpCommon.post(`/file-versions/${fileId}`, versionData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Find all versions for a specific file
const findFileVersions = (fileId) => {
    return httpCommon.get(`/file-versions/${fileId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Find the latest version for a specific file
const findLatestFileVersion = (fileId) => {
    return httpCommon.get(`/file-versions/latest/${fileId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Restore a specific file version
const restoreFileVersion = (fileId, versionId) => {
    return httpCommon.put(`/file-versions/restore/${fileId}/${versionId}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const fileVersionService = {
    createFileVersion,
    findFileVersions,
    findLatestFileVersion,
    restoreFileVersion
};

export default fileVersionService;

// fileChangeEventService.js
import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Log a file change event
const logFileChangeEvent = (data) => {
    return httpCommon.post('/file-changes', data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get file change events by session ID
const getFileChangeEventsBySession = (sessionId) => {
    return httpCommon.get(`/file-changes/session/${sessionId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get file change events by file ID
const getFileChangeEventsByFile = (fileId) => {
    return httpCommon.get(`/file-changes/${fileId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const fileChangeEventService = {
    logFileChangeEvent,
    getFileChangeEventsBySession,
    getFileChangeEventsByFile
};

export default fileChangeEventService;

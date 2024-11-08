// collaborationSessionService.js
import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Start a new collaboration session
const startSession = (projectId, data) => {
    return httpCommon.post(`/collaboration-sessions/${projectId}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// End a collaboration session by session ID
const endSession = (sessionId) => {
    return httpCommon.put(`/collaboration-sessions/end/${sessionId}`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get all active sessions by project ID
const getActiveSessionsByProject = (projectId) => {
    return httpCommon.get(`/collaboration-sessions/active/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get all sessions (active and ended) by project ID
const getAllSessionsByProject = (projectId) => {
    return httpCommon.get(`/collaboration-sessions/all/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const collaborationSessionService = {
    startSession,
    endSession,
    getActiveSessionsByProject,
    getAllSessionsByProject
};

export default collaborationSessionService;

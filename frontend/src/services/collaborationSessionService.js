// collaborationSessionService.js
import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Start a new collaboration session
const startSession = (projectId, data) => {
    return httpCommon.post(`/collaboration/session/${projectId}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// End a collaboration session by session ID
const endSession = (sessionId) => {
    return httpCommon.put(`/collaboration/session/end/${sessionId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get session by id 

const getSessionById =  async (sessionId) => {
    try {
        const response = await httpCommon.get(`/collaboration/session/${sessionId}`,
           {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
           }
           
        );
        return response.data.session;
    } catch (error) {
        console.error(`Error fetching session with ID ${sessionId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Could not fetch the session');
    }
}
// Get all active sessions by project ID
const getActiveSessionsByProject = (projectId) => {
    return httpCommon.get(`/collaboration/session/active/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get all sessions (active and ended) by project ID
const getAllSessionsByProject = (projectId) => {
    return httpCommon.get(`/collaboration/session/all/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const collaborationSessionService = {
    startSession,
    endSession,
    getSessionById,
    getActiveSessionsByProject,
    getAllSessionsByProject
};

export default collaborationSessionService;

import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Log a new activity for a user in a project
const logActivity = (user_id, project_id, action) => {
    return httpCommon.post('/acitivtylog', { user_id, project_id, action }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Find activities associated with a specific project
const findActivitiesByProject = (projectId) => {
    return httpCommon.get(`/acitivtylog/project/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Find activities associated with a specific user
const findActivitiesByUser = (userId) => {
    return httpCommon.get(`/acitivtylog/user/${userId}/activities`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Track file edit activity for a user in a project
const trackFileEditActivity = (userId, projectId, fileName) => {
    return httpCommon.post('/acitivtylog/file/edit/activity', { userId, projectId, fileName }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Track a comment activity for a user in a project
const trackCommentActivity = (userId, projectId, comment) => {
    return httpCommon.post('/acitivtylog/comment/activity', { userId, projectId, comment }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get an overview of activities in a specific project
const getActivityOverview = (projectId) => {
    return httpCommon.get(`/acitivtylog/overview/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const logActivityService = {
    logActivity,
    findActivitiesByProject,
    findActivitiesByUser,
    trackFileEditActivity,
    trackCommentActivity,
    getActivityOverview
};

export default logActivityService;

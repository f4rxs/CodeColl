const CollaborationSession = require('../models/mongodb/collaborationSession');
const User = require('../models/postgresql/user');
const Project = require('../models/postgresql/project');

const startSession = async (sessionData) => {
    const { project_id, active_users } = sessionData;

    const project = await Project.findByPk(project_id);
    if (!project) {
        throw new Error(`Project with ID ${project_id} does not exist`);
    }

    for (let user_id of active_users) {
        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error(`User with ID ${user_id} does not exist`);
        }
    }

    try {
        const session = new CollaborationSession(sessionData);
        return await session.save();
    } catch (error) {
        throw new Error(`Error starting session: ${error.message}`);
    }
};

const endSession = async (sessionId) => {
    try {
        const session = await CollaborationSession.findByIdAndUpdate(sessionId, { ended_at: Date.now() }, { new: true });
        if (!session) {
            throw new Error(`Session with ID ${sessionId} not found`);
        }
        return session;
    } catch (error) {
        throw new Error(`Error ending session: ${error.message}`);
    }
};

// Get all active collaboration sessions for a project
const getActiveSessionsByProject = async (projectId) => {
    try {
        const sessions = await CollaborationSession.find({ project_id: projectId, ended_at: { $exists: false } });
        return sessions;
    } catch (error) {
        throw new Error(`Error fetching active sessions for project ${projectId}: ${error.message}`);
    }
};

const getAllSessionsByProject = async (projectId) => {
    try {
        const sessions = await CollaborationSession.find({ project_id: projectId });
        return sessions;
    } catch (error) {
        throw new Error(`Error fetching sessions for project ${projectId}: ${error.message}`);
    }
};

module.exports = {
    startSession,
    endSession,
    getActiveSessionsByProject,
    getAllSessionsByProject
};
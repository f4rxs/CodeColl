const CollaborationSession = require('./collaborationSession');
const User = require('../User/user');
const Project = require('../Project/project');

const collaborationSessionService = {
     startSession : async (sessionData) => {
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
    },


    addUserToSession: async (sessionId, userId) => {
        try {
            const session = await CollaborationSession.findById(sessionId);
            if (!session) {
                throw new Error(`Session with ID ${sessionId} does not exist`);
            }

            // Add user to active users
            if (!session.active_users.includes(userId)) {
                session.active_users.push(userId);
                await session.save();
            }

            return session;
        } catch (error) {
            throw new Error(`Error adding user to session: ${error.message}`);
        }
    },


     // Method to remove a user from the session
     removeUserFromSession: async (sessionId, userId) => {
        try {
            const session = await CollaborationSession.findById(sessionId);
            if (!session) {
                throw new Error(`Session with ID ${sessionId} does not exist`);
            }

            // Remove user from active users array
            session.active_users = session.active_users.filter(user => user.toString() !== userId.toString());

            await session.save();

            return session;
        } catch (error) {
            throw new Error(`Error removing user from session: ${error.message}`);
        }
    },



    getSessionById: async (sessionId) => {
        try {
            const session = await CollaborationSession.findById(sessionId)
                
            
            if (!session) {
                throw new Error(`Session with ID ${sessionId} not found`);
            }
            return session;
        } catch (error) {
            throw new Error(`Error fetching session by ID ${sessionId}: ${error.message}`);
        }
    },
    
     endSession : async (sessionId) => {
        try {
            const session = await CollaborationSession.findByIdAndUpdate(sessionId, { ended_at: Date.now() }, { new: true });
            if (!session) {
                throw new Error(`Session with ID ${sessionId} not found`);
            }
            return session;
        } catch (error) {
            throw new Error(`Error ending session: ${error.message}`);
        }
    },
    
    // Get all active collaboration sessions for a project
     getActiveSessionsByProject : async (projectId) => {
        try {
            const sessions = await CollaborationSession.find({ project_id: projectId, ended_at: { $exists: false } });
            return sessions;
        } catch (error) {
            throw new Error(`Error fetching active sessions for project ${projectId}: ${error.message}`);
        }
    },
    
     getAllSessionsByProject : async (projectId) => {
        try {
            const sessions = await CollaborationSession.find({ project_id: projectId });
            return sessions;
        } catch (error) {
            throw new Error(`Error fetching sessions for project ${projectId}: ${error.message}`);
        }
    }
}



module.exports = collaborationSessionService;
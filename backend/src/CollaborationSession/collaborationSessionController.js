const collaborationSessionService = require('./collaborationSessionService');

const collaborationSessionController = {
     startSessionController : async (req, res) => {
        const {project_id} = req.params;
        const {  active_users } = req.body;
        try {
            const session = await collaborationSessionService.startSession({ project_id, active_users });
            res.status(201).json({ message: 'Session started successfully', session });
        } catch (error) {
            res.status(500).json({ message: 'Error starting session', error: error.message });
        }
    },
    
    // End a collaboration session
     endSessionController : async (req, res) => {
        const { session_id } = req.params;
        try {
            const session = await collaborationSessionService.endSession(session_id);
            res.status(200).json({ message: 'Session ended successfully', session });
        } catch (error) {
            res.status(500).json({ message: 'Error ending session', error: error.message });
        }
    },
    // Get active collaboration sessions by project
     getActiveSessionsByProjectController : async (req, res) => {
        const { project_id } = req.params;
        try {
            const sessions = await collaborationSessionService.getActiveSessionsByProject(project_id);
            res.status(200).json({ sessions });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching active sessions', error: error.message });
        }
    },
    
    
     getAllSessionsByProjectController : async (req, res) => {
        const { project_id } = req.params;
        try {
            const sessions = await collaborationSessionService.getAllSessionsByProject(project_id);
            res.status(200).json({ sessions });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching all sessions', error: error.message });
        }
    }
    
}

// Start a collaboration session

module.exports = collaborationSessionController;
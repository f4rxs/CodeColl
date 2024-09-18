const { startSession, endSession, getActiveSessionsByProject, getAllSessionsByProject } = require('../services/collaborationSessionService');

// Start a collaboration session
const startSessionController = async (req, res) => {
    const { project_id, active_users } = req.body;
    try {
        const session = await startSession({ project_id, active_users });
        res.status(201).json({ message: 'Session started successfully', session });
    } catch (error) {
        res.status(500).json({ message: 'Error starting session', error: error.message });
    }
};

// End a collaboration session
const endSessionController = async (req, res) => {
    const { session_id } = req.params;
    try {
        const session = await endSession(session_id);
        res.status(200).json({ message: 'Session ended successfully', session });
    } catch (error) {
        res.status(500).json({ message: 'Error ending session', error: error.message });
    }
};

// Get active collaboration sessions by project
const getActiveSessionsByProjectController = async (req, res) => {
    const { project_id } = req.params;
    try {
        const sessions = await getActiveSessionsByProject(project_id);
        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active sessions', error: error.message });
    }
};


const getAllSessionsByProjectController = async (req, res) => {
    const { project_id } = req.params;
    try {
        const sessions = await getAllSessionsByProject(project_id);
        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all sessions', error: error.message });
    }
};

module.exports = {
    startSessionController,
    endSessionController,
    getActiveSessionsByProjectController,
    getAllSessionsByProjectController
};
const { logFileChangeEvent, getFileChangeEventsBySession, getFileChangeEventsByFile } = require('../services/fileChangeService');

const logFileChangeEventController = async (req, res) => {
    const { session_id, file_id, user_id, change_type, content } = req.body;
    try {
        const fileChange = await logFileChangeEvent({ session_id, file_id, user_id, change_type, content });
        res.status(201).json({ message: 'File change event logged successfully', fileChange });
    } catch (error) {
        res.status(500).json({ message: 'Error logging file change event', error: error.message });
    }
};

const getFileChangeEventsBySessionController = async (req, res) => {
    const { session_id } = req.params;
    try {
        const fileChanges = await getFileChangeEventsBySession(session_id);
        res.status(200).json({ fileChanges });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching file change events for session', error: error.message });
    }
};

const getFileChangeEventsByFileController = async (req, res) => {
    const { file_id } = req.params;
    try {
        const fileChanges = await getFileChangeEventsByFile(file_id);
        res.status(200).json({ fileChanges });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching file change events for file', error: error.message });
    }
};

module.exports = {
    logFileChangeEventController,
    getFileChangeEventsBySessionController,
    getFileChangeEventsByFileController
};

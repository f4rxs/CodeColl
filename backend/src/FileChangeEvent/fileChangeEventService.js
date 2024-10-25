const FileChangeEvent = require('../FileChangeEvent/fileChangeEvent');
const CollaborationSession = require('../CollaborationSession/collaborationSession');
const User = require('../User/user');
const File = require('../File/file');

const fileChangeService = {
    logFileChangeEvent: async (fileChangeData) => {
        const { session_id, file_id, user_id } = fileChangeData;

        const session = await CollaborationSession.findById(session_id);
        if (!session) {
            throw new Error(`Session with ID ${session_id} does not exist`);
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error(`User with ID ${user_id} does not exist`);
        }

        const file = await File.findByPk(file_id);
        if (!file) {
            throw new Error(`File with ID ${file_id} does not exist`);
        }

        try {
            const fileChange = new FileChangeEvent(fileChangeData);
            return await fileChange.save();
        } catch (error) {
            throw new Error(`Error logging file change event: ${error.message}`);
        }
    },

    // Get all file change events for a session
    getFileChangeEventsBySession: async (sessionId) => {
        try {
            const fileChanges = await FileChangeEvent.find({ session_id: sessionId }).sort({ timestamp: 1 });
            return fileChanges;
        } catch (error) {
            throw new Error(`Error fetching file change events for session ${sessionId}: ${error.message}`);
        }
    },

    // Get all file change events for a specific file
    getFileChangeEventsByFile: async (fileId) => {
        try {
            const fileChanges = await FileChangeEvent.find({ file_id: fileId }).sort({ timestamp: 1 });
            return fileChanges;
        } catch (error) {
            throw new Error(`Error fetching file change events for file ${fileId}: ${error.message}`);
        }
    }
}



module.exports = fileChangeService;
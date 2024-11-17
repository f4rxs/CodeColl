const fileService = require('./fileService');

const fileController = {
    createFileController: async (req, res) => {
        const { projectId } = req.params;
        const { filename, content } = req.body;
        try {
            const newFile = await fileService.createFile(projectId, filename, content); 
            res.status(201).json({ message: 'File created successfully', file: newFile });
        } catch (error) {
            res.status(400).json({ message: 'Error creating file', error: error.message });
        }
    },

    findFileByIdController: async (req, res) => {
        const { fileId } = req.params;
        try {
            const file = await fileService.findFileById(fileId);
            res.status(200).json({ file });
        } catch (error) {
            res.status(404).json({ message: `Error finding file with ID ${fileId}`, error: error.message });
        }
    },

    findFilesByProjectController: async (req, res) => {
        const { projectId } = req.params;
        try {
            const files = await fileService.findFilesByProject(projectId);
            res.status(200).json({ files });
        } catch (error) {
            res.status(404).json({ message: `Error finding files for project ID ${projectId}`, error: error.message });
        }
    },

    updateFileController: async (req, res) => {
        const { fileId } = req.params;
        const updateData = req.body;
        try {
            const updatedFile = await fileService.updateFile(fileId, updateData);
            res.status(200).json({ message: 'File updated successfully', file: updatedFile });
        } catch (error) {
            res.status(400).json({ message: `Error updating file with ID ${fileId}`, error: error.message });
        }
    },

    deleteFileController: async (req, res) => {
        const { fileId } = req.params;
        try {
            const result = await fileService.deleteFile(fileId);
            res.status(200).json({ message: 'File deleted successfully', result });
        } catch (error) {
            res.status(404).json({ message: `Error deleting file with ID ${fileId}`, error: error.message });
        }
    },    

    lockFileForEditingController: async (req, res) => {
        const { fileId } = req.params;
        const { userId } = req.body;
        try {
            const result = await fileService.lockFileForEditing(fileId, userId);
            res.status(200).json({ message: 'File locked for editing', result });
        } catch (error) {
            res.status(400).json({ message: `Error locking file for editing`, error: error.message });
        }
    },

    unlockFileAfterEditingController: async (req, res) => {
        const { fileId } = req.params;
        const { userId } = req.body;
        try {
            const result = await fileService.unlockFileAfterEditing(fileId, userId);
            res.status(200).json({ message: 'File unlocked successfully', result });
        } catch (error) {
            res.status(400).json({ message: `Error unlocking file`, error: error.message });
        }
    }

}



module.exports = fileController;

const { 
    createFile,
    findFileById,
    updateFile,
    findFilesByProject,
    deleteFile,
    getLatestFileVersion,
    restoreFileVersion,
    lockFileForEditing,
    unlockFileAfterEditing
} = require('../services/fileService');

// Controller to create a new file
const createFileController = async (req, res) => {
    const fileData = req.body;
    try {
        const newFile = await createFile(fileData);
        res.status(201).json({ message: 'File created successfully', file: newFile });
    } catch (error) {
        res.status(400).json({ message: 'Error creating file', error: error.message });
    }
};

// Controller to get a file by ID
const findFileByIdController = async (req, res) => {
    const { fileId } = req.params;
    try {
        const file = await findFileById(fileId);
        res.status(200).json({ file });
    } catch (error) {
        res.status(404).json({ message: `Error finding file with ID ${fileId}`, error: error.message });
    }
};

// Controller to get files by project ID
const findFilesByProjectController = async (req, res) => {
    const { projectId } = req.params;
    try {
        const files = await findFilesByProject(projectId);
        res.status(200).json({ files });
    } catch (error) {
        res.status(404).json({ message: `Error finding files for project ID ${projectId}`, error: error.message });
    }
};

// Controller to update a file
const updateFileController = async (req, res) => {
    const { fileId } = req.params;
    const updateData = req.body;
    try {
        const updatedFile = await updateFile(fileId, updateData);
        res.status(200).json({ message: 'File updated successfully', file: updatedFile });
    } catch (error) {
        res.status(400).json({ message: `Error updating file with ID ${fileId}`, error: error.message });
    }
};

// Controller to delete a file
const deleteFileController = async (req, res) => {
    const { fileId } = req.params;
    try {
        const result = await deleteFile(fileId);
        res.status(200).json({ message: 'File deleted successfully', result });
    } catch (error) {
        res.status(404).json({ message: `Error deleting file with ID ${fileId}`, error: error.message });
    }
};

// Controller to get the latest version of a file
const getLatestFileVersionController = async (req, res) => {
    const { fileId } = req.params;
    try {
        const latestVersion = await getLatestFileVersion(fileId);
        res.status(200).json({ latestVersion });
    } catch (error) {
        res.status(404).json({ message: `Error getting latest version for file ID ${fileId}`, error: error.message });
    }
};

// Controller to restore a file version
const restoreFileVersionController = async (req, res) => {
    const { fileId, versionId } = req.params;
    try {
        const restoredFile = await restoreFileVersion(fileId, versionId);
        res.status(200).json({ message: 'File version restored successfully', file: restoredFile });
    } catch (error) {
        res.status(404).json({ message: `Error restoring file version ${versionId} for file ID ${fileId}`, error: error.message });
    }
};

// Controller to lock a file for editing
const lockFileForEditingController = async (req, res) => {
    const { fileId } = req.params;
    const { userId } = req.body;
    try {
        const result = await lockFileForEditing(fileId, userId);
        res.status(200).json({ message: 'File locked for editing', result });
    } catch (error) {
        res.status(400).json({ message: `Error locking file for editing`, error: error.message });
    }
};

// Controller to unlock a file after editing
const unlockFileAfterEditingController = async (req, res) => {
    const { fileId } = req.params;
    const { userId } = req.body;
    try {
        const result = await unlockFileAfterEditing(fileId, userId);
        res.status(200).json({ message: 'File unlocked successfully', result });
    } catch (error) {
        res.status(400).json({ message: `Error unlocking file`, error: error.message });
    }
};

module.exports = {
    createFileController,
    findFileByIdController,
    findFilesByProjectController,
    updateFileController,
    deleteFileController,
    getLatestFileVersionController,
    restoreFileVersionController,
    lockFileForEditingController,
    unlockFileAfterEditingController
};

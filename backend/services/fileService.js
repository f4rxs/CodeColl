const File = require('../models/postgresql/file');


const createFile = async (fileData) => {
    const { project_id, filename, content } = fileData;
    try {
        const existingFile = await File.findOne({ where: { project_id, filename } });
        if (existingFile) {
            throw new Error('The file that you are trying to create already exists');
        }

        const newFile = await File.create({ project_id, filename, content });
        return newFile;
    } catch (error) {
        throw new Error(`Error creating file: ${error.message}`);
    }
};


const findFileById = async (fileId) => {
    try {
        const file = await File.findByPk(fileId);
        if (!file) {
            throw new Error(`File with the id ${fileId} is not found`);
        }
        return file;
    } catch (error) {
        throw new Error(`Error in finding file by id ${fileId}: ${error.message}`);
    }
};

const findFilesByProject = async (project_id) => {
    try {
        const files = await File.findAll({ where: { project_id } });
        if (files.length === 0) {
            throw new Error(`No files found for project ID ${project_id}`);
        }
        return files;
    } catch (error) {
        throw new Error(`Error finding files for project ID ${project_id}: ${error.message}`);
    }
};

const updateFile = async (fileId, updateData) => {
    try {
        const file = await File.findByPk(fileId);
        if (!file) {
            throw new Error(`File with ID ${fileId} not found`);
        }
        await file.update(updateData);
        return file;
    } catch (error) {
        throw new Error(`Error updating file with ID ${fileId}: ${error.message}`);
    }
};


const deleteFile = async (fileId) => {
    try {
        const file = await File.findByPk(fileId);
        if (!file) {
            throw new Error(`File with ID ${fileId} not found`);
        }
        await file.destroy();
        return { message: `File with ID ${fileId} deleted successfully` };
    } catch (error) {
        throw new Error(`Error deleting file with ID ${fileId}: ${error.message}`);
    }
};


const getLatestFileVersion = async (fileId) => {
    try {
        const file = await File.findByPk(fileId);
        if (!file) {
            throw new Error(`File with ID ${fileId} not found`);
        }

        const latestVersion = await FileChange.findOne({
            where: { file_id: fileId },
            order: [['createdAt', 'DESC']]  
        });

        if (!latestVersion) {
            throw new Error(`No versions found for file ID ${fileId}`);
        }

        return latestVersion;
    } catch (error) {
        throw new Error(`Error getting latest version for file ID ${fileId}: ${error.message}`);
    }
};


const restoreFileVersion = async (fileId, versionId) => {
    try {
        const fileVersion = await FileChange.findOne({ where: { id: versionId, file_id: fileId } });
        if (!fileVersion) {
            throw new Error(`Version ${versionId} not found for file ID ${fileId}`);
        }

        // Restore file content from the version
        const file = await File.findByPk(fileId);
        await file.update({ content: fileVersion.content });

        return file;
    } catch (error) {
        throw new Error(`Error restoring file version ${versionId} for file ID ${fileId}: ${error.message}`);
    }
};


const lockFileForEditing = async (fileId, userId) => {
    try {
        const file = await File.findByPk(fileId);
        if (!file) {
            throw new Error(`File with ID ${fileId} not found`);
        }

        if (file.locked_by) {
            throw new Error(`File is already locked by another user`);
        }

        await file.update({ locked_by: userId });
        return { message: `File with ID ${fileId} locked for editing by user ${userId}` };
    } catch (error) {
        throw new Error(`Error locking file for editing: ${error.message}`);
    }
};

const unlockFileAfterEditing = async (fileId, userId) => {
    try {
        const file = await File.findByPk(fileId);
        if (!file) {
            throw new Error(`File with ID ${fileId} not found`);
        }

        if (file.locked_by !== userId) {
            throw new Error(`User ${userId} does not have permission to unlock this file`);
        }

        await file.update({ locked_by: null });
        return { message: `File with ID ${fileId} unlocked successfully` };
    } catch (error) {
        throw new Error(`Error unlocking file: ${error.message}`);
    }
};


module.exports = {
    createFile,
    findFileById,
    updateFile,
    findFilesByProject,
    deleteFile,
    getLatestFileVersion,
    restoreFileVersion,
    lockFileForEditing,
    unlockFileAfterEditing
}
const FileVersion = require('./fileVersion');
const File = require('../File/file');
const fileService = require('../File/fileService');
const filleVersionService = {
    createFileVersion: async (fileId, versionData) => {
        try {
            // Step 1: Find the latest version for the given file
            const latestVersion = await FileVersion.findOne({
                where: { file_id: fileId },
                order: [['version_number', 'DESC']] // Get the latest version by descending order
            });

            let newVersionNumber;

            if (latestVersion) {
                // If a version exists, increment the minor version
                const [major, minor] = latestVersion.version_number.split('.').map(Number);
                newVersionNumber = `${major}.${minor + 1}`;
            } else {
                // If no version exists, start with version 1.0
                newVersionNumber = '1.0';
            }

            // Step 2: Create the new version
            const newFileVersion = await FileVersion.create({
                file_id: fileId,
                version_number: newVersionNumber,  // Set the version number
                content: versionData.content,      // Save the content
                timestamp: versionData.timestamp,  // Save the timestamp
                context: versionData.context       // Save the context (if provided)
            });

            return newFileVersion;
        } catch (error) {
            throw new Error(`Error creating file version: ${error.message}`);
        }
    },


    findFileVersions: async (fileId) => {
        try {
            const fileVersions = await FileVersion.findAll({
                where: { file_id: fileId },
                order: [['created_at', 'DESC']]
            });
            return fileVersions;
        } catch (error) {
            throw new Error(`Error finding file versions: ${error.message}`);
        }
    },

    getFileVersionContext: async (fileId, versionNumber) => {
        try {
            const version = await FileVersion.findOne({
                where: { file_id: fileId, version_number: versionNumber },
            });

            if (!version) {
                throw new Error('Version not found');
            }

            return version;
        } catch (error) {
            throw new Error(error.message || 'Error fetching file version');
        }
    },


    findLatestFileVersion: async (fileId) => {
        try {
            const latestFileVersion = await FileVersion.findOne({
                where: { file_id: fileId },
                order: [['created_at', 'DESC']]
            });
            if (!latestFileVersion) {
                throw new Error('No versions found for the file');
            }
            return latestFileVersion;
        } catch (error) {
            throw new Error(`Error finding latest file version: ${error.message}`);
        }
    },


    restoreFileVersion: async (fileId, versionId) => {
        try {
            const fileVersion = await FileVersion.findByPk(versionId);
            

            // Fetch the file with Sequelize
            const file = await File.findByPk(fileId, {
                attributes: ['id', 'filename', 'content', 'locked_by', 'project_id', 'updated_at'],
            });

            if (!file) {
                throw new Error('File not found');
            }
            // Update the file content
            file.content = fileVersion.context;


            // Save the updated file
            await file.save();

            return file;
        } catch (error) {
            throw new Error(`Error restoring file version: ${error.message}`);
        }
    }
}



module.exports = filleVersionService;
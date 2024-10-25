const FileVersion = require('./fileVersion');

const filleVersionService = {
     createFileVersion : async (fileId, versionData) => {
        try {
            const newFileVersion = await FileVersion.create({
                file_id: fileId,
                ...versionData
            });
            return newFileVersion;
        } catch (error) {
            throw new Error(`Error creating file version: ${error.message}`);
        }
    },
    
     findFileVersions : async (fileId) => {
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
    
    
     findLatestFileVersion : async (fileId) => {
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
    
    
     restoreFileVersion : async (fileId, versionId) => {
        try {
            const fileVersion = await FileVersion.findByPk(versionId);
            if (!fileVersion || fileVersion.file_id !== fileId) {
                throw new Error('File version not found or does not match the file');
            }
    
            // Update the file with the content from the version to restore
            const file = await File.findByPk(fileId);
            if (!file) {
                throw new Error('File not found');
            }
    
            file.content = fileVersion.content;
            await file.save();
    
            return file;
        } catch (error) {
            throw new Error(`Error restoring file version: ${error.message}`);
        }
    }
}



module.exports= filleVersionService;
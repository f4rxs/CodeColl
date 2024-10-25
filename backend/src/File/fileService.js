const { Json } = require('sequelize/lib/utils');
const File = require('./file');

const fileService = {
     createFile : async (project_id,filename,content) => {
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
    },
    
    
     findFileById : async (fileId) => {
        try {
            const file = await File.findByPk(fileId);
            if (!file) {
                throw new Error(`File with the id ${fileId} is not found`);
            }
            return file;
        } catch (error) {
            throw new Error(`Error in finding file by id ${fileId}: ${error.message}`);
        }
    },
    
     findFilesByProject : async (project_id) => {
        try {
            const files = await File.findAll({ where: { project_id } });
            if (files.length === 0) {
                throw new Error(`No files found for project ID ${project_id}`);
            }
            return files;
        } catch (error) {
            throw new Error(`Error finding files for project ID ${project_id}: ${error.message}`);
        }
    },
     updateFile : async (fileId, updateData) => {
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
    },
    
    
     deleteFile : async (fileId) => {
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
    },    
     lockFileForEditing : async (fileId, userId) => {
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
    },
    
     unlockFileAfterEditing : async (fileId, userId) => {
        try {
            const file = await File.findByPk(fileId);
            if (!file) {
                throw new Error(`File with ID ${fileId} not found`);
            }
                
            
    
            await file.update({ locked_by: null });
            return { message: `File with ID ${fileId} unlocked successfully` };
        } catch (error) {
            throw new Error(`Error unlocking file: ${error.message}`);
        }
    }
    
}


module.exports = fileService;
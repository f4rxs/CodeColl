const { model } = require('mongoose');
const filleVersionService = require('./fileVersionService');

const fileVersionController = {
     createFileVersionController : async (req, res) => {
        try {
            const { fileId } = req.params;
            const versionData = req.body;
    
            const newFileVersion = await filleVersionService.createFileVersion(fileId, versionData);
            res.status(201).json(newFileVersion);
        } catch (error) {
            res.status(400).json({ message: 'Error creating file version', error: error.message });
        }
    },
    
    
     findFileVersionsController : async (req, res) => {
        try {
            const { fileId } = req.params;
    
            const fileVersions = await filleVersionService.findFileVersions(fileId);
            res.status(200).json(fileVersions);
        } catch (error) {
            res.status(404).json({ message: 'Error finding file versions', error: error.message });
        }
    },
    
    
     findLatestFileVersionController : async (req, res) => {
        try {
            const { fileId } = req.params;
    
            const latestFileVersion = await filleVersionService.findLatestFileVersion(fileId);
            res.status(200).json(latestFileVersion);
        } catch (error) {
            res.status(404).json({ message: 'Error finding latest file version', error: error.message });
        }
    },
    
    
     restoreFileVersionController : async (req, res) => {
        try {
            const { fileId, versionId } = req.params;
    
            // Restore a specific version of a file
            const restoredFile = await filleVersionService.restoreFileVersion(fileId, versionId);
            res.status(200).json(restoredFile);
        } catch (error) {
            res.status(400).json({ message: 'Error restoring file version', error: error.message });
        }
    }
    
}



module.exports = fileVersionController;
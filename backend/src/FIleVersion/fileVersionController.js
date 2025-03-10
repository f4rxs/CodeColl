const { model } = require('mongoose');
const filleVersionService = require('./fileVersionService');

const fileVersionController = {
    createFileVersionController: async (req, res) => {
        try {
            const { fileId } = req.params;
            const versionData = req.body;

            const newFileVersion = await filleVersionService.createFileVersion(fileId, versionData);
            res.status(201).json(newFileVersion);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Error creating file version', error: error.message });
        }
    },


    findFileVersionsController: async (req, res) => {
        try {
            const { fileId } = req.params;

            const fileVersions = await filleVersionService.findFileVersions(fileId);
            res.status(200).json(fileVersions);
        } catch (error) {
            res.status(404).json({ message: 'Error finding file versions', error: error.message });
        }
    },

     getFileVersionContextController : async (req, res) => {
        const { fileId, versionNumber } = req.params;
      
        try {
          const version = await filleVersionService.getFileVersionContext(fileId, versionNumber);
          return res.status(200).json(version);
        } catch (error) {
          console.error("Error in getFileVersionContextController:", error.message);
          return res.status(404).json({ message: error.message });
        }
      },
      
      
    findLatestFileVersionController: async (req, res) => {
        try {
            const { fileId } = req.params;

            const latestFileVersion = await filleVersionService.findLatestFileVersion(fileId);
            res.status(200).json(latestFileVersion);
        } catch (error) {
            res.status(404).json({ message: 'Error finding latest file version', error: error.message });
        }
    },


    restoreFileVersionController: async (req, res) => {
        try {
            const { fileId, versionId } = req.params;

            const restoredFile = await filleVersionService.restoreFileVersion(fileId, versionId);
            res.status(200).json(restoredFile);
        } catch (error) {
            res.status(400).json({ message: 'Error restoring file version', error: error.message });
        }
    }

}



module.exports = fileVersionController;
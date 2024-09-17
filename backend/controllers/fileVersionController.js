const { model } = require('mongoose');
const {
    createFileVersion,
    findFileVersions,
    findLatestFileVersion,
    restoreFileVersion
} = require('../services/fileVersionService');


const createFileVersionController = async (req, res) => {
    try {
        const { fileId } = req.params;
        const versionData = req.body;

        const newFileVersion = await createFileVersion(fileId, versionData);
        res.status(201).json(newFileVersion);
    } catch (error) {
        res.status(400).json({ message: 'Error creating file version', error: error.message });
    }
};


const findFileVersionsController = async (req, res) => {
    try {
        const { fileId } = req.params;

        const fileVersions = await findFileVersions(fileId);
        res.status(200).json(fileVersions);
    } catch (error) {
        res.status(404).json({ message: 'Error finding file versions', error: error.message });
    }
};


const findLatestFileVersionController = async (req, res) => {
    try {
        const { fileId } = req.params;

        const latestFileVersion = await findLatestFileVersion(fileId);
        res.status(200).json(latestFileVersion);
    } catch (error) {
        res.status(404).json({ message: 'Error finding latest file version', error: error.message });
    }
};


const restoreFileVersionController = async (req, res) => {
    try {
        const { fileId, versionId } = req.params;

        // Restore a specific version of a file
        const restoredFile = await restoreFileVersion(fileId, versionId);
        res.status(200).json(restoredFile);
    } catch (error) {
        res.status(400).json({ message: 'Error restoring file version', error: error.message });
    }
};


module.exports = {
    createFileVersionController,
    findFileVersionsController,
    findLatestFileVersionController,
    restoreFileVersionController
}
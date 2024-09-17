const express = require('express');
const {
    createFileVersionController,
    findFileVersionsController,
    findLatestFileVersionController,
    restoreFileVersionController
} = require('../controllers/fileVersionController');

const router = express.Router();

// Route to create a new file version
router.post('/file/:fileId/version', createFileVersionController); 

// Route to get all versions of a specific file
router.get('/file/:fileId/versions', findFileVersionsController);

// Route to get the latest version of a specific file
router.get('/file/:fileId/version/latest', findLatestFileVersionController);

// Route to restore a specific version of a file
router.put('/file/:fileId/version/:versionId/restore', restoreFileVersionController);

module.exports = router;


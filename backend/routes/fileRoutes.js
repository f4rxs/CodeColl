const express = require('express');
const router = express.Router();
const {
    createFileController,
    findFileByIdController,
    findFilesByProjectController,
    updateFileController,
    deleteFileController,
    getLatestFileVersionController,
    restoreFileVersionController,
    lockFileForEditingController,
    unlockFileAfterEditingController
} = require('../controllers/fileController');

router.post('/file', createFileController); //tested

router.get('/file/:fileId', findFileByIdController); //tested

router.get('/files/:projectId', findFilesByProjectController); //tested

router.put('/file/:fileId', updateFileController); //tested

router.delete('/file/:fileId', deleteFileController); //tested

router.get('/file/latest-version/:fileId', getLatestFileVersionController);  // needs the table file versions ig

router.put('/file/:fileId/restore/:versionId', restoreFileVersionController);  //same

router.put('/file/:fileId/lock', lockFileForEditingController);  //tested

router.put('/file/:fileId/unlock', unlockFileAfterEditingController);  //not working 

module.exports = router;

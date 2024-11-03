const express = require('express');
const router = express.Router();
const fileController = require('../src/File/fileController');
const validateRequest = require('../utils/validateRequest');
const {
    validateFileId,
    validateProjectId,
    validateFileBody,
    validateUserId,
    validateVersionId
} = require('../src/File/fileValidator');

//GET ROUTES (2/2)
router.get('/:fileId', validateFileId, validateRequest, fileController.findFileByIdController); //tested*
router.get('/project/:projectId', validateProjectId, validateRequest, fileController.findFilesByProjectController); //tested*

//POST ROUTES 
router.post('/:projectId', validateProjectId, validateFileBody, validateRequest, fileController.createFileController); //tested*

//PUT ROUTES (4/4) 
router.put('/:fileId', validateFileId, validateFileBody, validateRequest, fileController.updateFileController); //tested*
router.put('/lock/:fileId', validateFileId, validateUserId, validateRequest, fileController.lockFileForEditingController);  //tested*
router.put('/unlock/:fileId', validateFileId, validateUserId, validateRequest, fileController.unlockFileAfterEditingController);  //tested* 

//DELETE ROUTES
router.delete('/:fileId', validateFileId, validateRequest, fileController.deleteFileController); //tested*





module.exports = router;

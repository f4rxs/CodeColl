const express = require('express');
const fileVersionController = require('../src/FIleVersion/fileVersionController');
const validateRequest = require('../utils/validateRequest');
const {
    validateFileId,
    validateVersionId,
    validateVersionBody
} = require('../src/FIleVersion/fileVersionValidator');
const router = express.Router();
const auth = require('../middleware/auth');
//GET ROUTES
router.get('/:fileId',auth ,validateFileId, validateRequest, fileVersionController.findFileVersionsController); //tested
router.get('/latest/:fileId',auth ,validateFileId, validateRequest, fileVersionController.findLatestFileVersionController); //tested
router.get('/:fileId/version/:versionNumber', auth, fileVersionController.getFileVersionContextController);


//POST ROUTES
router.post('/:fileId',auth ,validateRequest, fileVersionController.createFileVersionController);  //tested

//PUT ROUTES
router.put('/restore/:fileId/:versionId',auth ,validateVersionId, validateRequest, fileVersionController.restoreFileVersionController);// not wokring (will implement it during front end)


module.exports = router;


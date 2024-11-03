const express = require('express');
const fileVersionController = require('../src/FIleVersion/fileVersionController');
const validateRequest = require('../utils/validateRequest');
const {
    validateFileId,
    validateVersionId,
    validateVersionBody
} = require('../src/FIleVersion/fileVersionValidator');
const router = express.Router();

//GET ROUTES
router.get('/:fileId', validateFileId, validateRequest, fileVersionController.findFileVersionsController); //tested
router.get('/latest/:fileId', validateFileId, validateRequest, fileVersionController.findLatestFileVersionController); //tested

//POST ROUTES
router.post('/:fileId', validateFileId, validateVersionBody, validateRequest, fileVersionController.createFileVersionController);  //tested

//PUT ROUTES
router.put('/restore/:fileId/:versionId', validateVersionId, validateRequest, fileVersionController.restoreFileVersionController);// not wokring (will implement it during front end)


module.exports = router;


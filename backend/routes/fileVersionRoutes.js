const express = require('express');
const fileVersionController = require('../src/FIleVersion/fileVersionController');

const router = express.Router();

//GET ROUTES
router.get('/:fileId', fileVersionController.findFileVersionsController); //tested
router.get('/latest/:fileId', fileVersionController.findLatestFileVersionController); //tested

//POST ROUTES
router.post('/:fileId', fileVersionController.createFileVersionController);  //tested

//PUT ROUTES
router.put('/restore/:fileId/:versionId', fileVersionController.restoreFileVersionController);// not wokring (will implement it during front end)


module.exports = router;


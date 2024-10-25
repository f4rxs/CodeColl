const express = require('express');
const router = express.Router();
const fileController = require('../src/File/fileController');

//GET ROUTES (2/2)
router.get('/:fileId', fileController.findFileByIdController); //tested*
router.get('/project/:projectId', fileController.findFilesByProjectController); //tested*

//POST ROUTES 
router.post('/:projectId', fileController.createFileController); //tested*

//PUT ROUTES (4/4)
router.put('/:fileId', fileController.updateFileController); //tested*
router.put('/lock/:fileId', fileController.lockFileForEditingController);  //tested*
router.put('/unlock/:fileId', fileController.unlockFileAfterEditingController);  //tested* 

//DELETE ROUTES
router.delete('/:fileId', fileController.deleteFileController); //tested*





module.exports = router;

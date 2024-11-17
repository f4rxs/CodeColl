const projectCollaboratorsController = require('../src/ProjectCollaborator/projectCollaboratorController');
const validateRequest = require('../utils/validateRequest');
const {
    validateProjectAndUserIds,
    validateRole,
    validatePermissions,
} = require('../src/ProjectCollaborator/projectCollaboratorValidators');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//GET ROUTES (2/2)
router.get('/:projectId',auth ,validateProjectAndUserIds[0], validateRequest, projectCollaboratorsController.findCollaboratorsByProjectController); // tested
router.get('/usernames/:projectId',auth ,validateProjectAndUserIds[0], validateRequest, projectCollaboratorsController.getCollaboratorUsernamesController); //tested
router.get('/user/:userId',auth ,projectCollaboratorsController.getUserProjectsController);
//POST ROUTES (1/1)
router.post('/:projectId/:userId',auth ,validateProjectAndUserIds, validateRole, validatePermissions, validateRequest, projectCollaboratorsController.addCollaboratorController); // tested

//PUT ROUTES  (1/1)
router.put('/:projectId/:userId',auth ,validateProjectAndUserIds, validateRequest, projectCollaboratorsController.updateCollaboratorRoleController);  //tested
router.put('/permissions/:projectId/:userId',auth ,projectCollaboratorsController.updateCollaboratorPermissionsController);


//DELETE (1/1)
router.delete('/:projectId/:userId',auth ,validateProjectAndUserIds, validateRequest, projectCollaboratorsController.removeCollaboratorController);  //tested



module.exports = router;
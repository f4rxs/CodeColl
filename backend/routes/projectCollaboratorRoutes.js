const projectCollaboratorsController = require('../src/ProjectCollaborator/projectCollaboratorController');
const validateRequest = require('../utils/validateRequest');
const {
    validateProjectAndUserIds,
    validateRole,
    validatePermissions,
} = require('../src/ProjectCollaborator/projectCollaboratorValidators');
const express = require('express');

const router = express.Router();


//GET ROUTES (2/2)
router.get('/:projectId', validateProjectAndUserIds[0], validateRequest, projectCollaboratorsController.findCollaboratorsByProjectController); // tested
router.get('/usernames/:projectId', validateProjectAndUserIds[0], validateRequest, projectCollaboratorsController.getCollaboratorUsernamesController); //tested
router.get('/user/:userId', projectCollaboratorsController.getUserProjectsController);
//POST ROUTES (1/1)
router.post('/:projectId/:userId', validateProjectAndUserIds, validateRole, validatePermissions, validateRequest, projectCollaboratorsController.addCollaboratorController); // tested

//PUT ROUTES  (1/1)
router.put('/:projectId/:userId', validateProjectAndUserIds, validateRequest, projectCollaboratorsController.updateCollaboratorRoleController);  //tested

//DELETE (1/1)
router.delete('/:projectId/:userId', validateProjectAndUserIds, validateRequest, projectCollaboratorsController.removeCollaboratorController);  //tested



module.exports = router;
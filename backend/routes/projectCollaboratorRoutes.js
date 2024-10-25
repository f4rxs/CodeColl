const projectCollaboratorsController = require('../src/ProjectCollaborator/projectCollaboratorController');

const express = require('express');

const router = express.Router();


//GET ROUTES (2/2)
router.get('/:projectId', projectCollaboratorsController.findCollaboratorsByProjectController); // tested
router.get('/usernames/:projectId', projectCollaboratorsController.getCollaboratorUsernamesController); //tested

//POST ROUTES (1/1)
router.post('/:projectId/:userId', projectCollaboratorsController.addCollaboratorController); // tested

//PUT ROUTES  (1/1)
router.put('/:projectId/:userId', projectCollaboratorsController.updateCollaboratorRoleController);  //tested

//DELETE (1/1)
router.delete('/:projectId/:userId', projectCollaboratorsController.removeCollaboratorController);  //tested



module.exports = router;
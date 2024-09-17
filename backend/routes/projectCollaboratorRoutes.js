const {
    addCollaboratorController,
    findCollaboratorsByProjectController,
    updateCollaboratorRoleController,
    removeCollaboratorController , 
} = require('../controllers/projectCollaboratorController');

const express = require('express');

const router = express.Router();

router.get('/collab/project/:projectId', findCollaboratorsByProjectController); // tested

router.put('/collab-role', updateCollaboratorRoleController);  //tested

router.delete('/collab-remove', removeCollaboratorController);  //tested

router.post('/collab', addCollaboratorController); // tested

router.get('/project/:projectId/collab/usernames', findCollaboratorsByProjectController); //tested

module.exports = router;
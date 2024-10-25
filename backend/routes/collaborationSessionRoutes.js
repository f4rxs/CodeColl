const express = require('express');
const collaborationSessionController = require('../src/CollaborationSession/collaborationSessionController');

const router = express.Router();

//POST ROUTES
router.post('/:project_id', collaborationSessionController.startSessionController); //tested

//GET ROUTES
router.get('/active/:project_id', collaborationSessionController.getActiveSessionsByProjectController); //tested
router.get('/all/:project_id', collaborationSessionController.getAllSessionsByProjectController); //tested

//PUT ROUTES
router.put('/end/:session_id', collaborationSessionController.endSessionController);  //tested


module.exports = router;
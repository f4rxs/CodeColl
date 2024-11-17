const express = require('express');
const collaborationSessionController = require('../src/CollaborationSession/collaborationSessionController');

const router = express.Router();
const auth = require('../middleware/auth');
//POST ROUTES
router.post('/:project_id',auth ,collaborationSessionController.startSessionController); //tested

//GET ROUTES
router.get('/active/:project_id',auth ,collaborationSessionController.getActiveSessionsByProjectController); //tested
router.get('/all/:project_id',auth ,collaborationSessionController.getAllSessionsByProjectController); //tested

//PUT ROUTES
router.put('/end/:session_id',auth ,collaborationSessionController.endSessionController);  //tested


module.exports = router;
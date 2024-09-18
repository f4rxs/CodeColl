const express = require('express');
const {
    startSessionController,
    endSessionController,
    getActiveSessionsByProjectController,
    getAllSessionsByProjectController
} = require('../controllers/collaborationSessionController');

const router = express.Router();

// POST route to start a collaboration session
router.post('/collaboration-session', startSessionController); //tested

// PUT route to end a collaboration session
router.put('/collaboration-end/:session_id', endSessionController);  //tested

// GET route to get active sessions by project
router.get('/collaboration-session/active/:project_id', getActiveSessionsByProjectController); //tested

// GET route to get all sessions by project
router.get('/collaboration-session/all/:project_id', getAllSessionsByProjectController); //tested

module.exports = router;
const express = require('express');
const fileChangeController = require('../src/FileChangeEvent/fileChangeEventController');

const router = express.Router();

const auth = require('../middleware/auth');
//POST ROUTES
router.post('/',auth, fileChangeController.logFileChangeEventController); // tested

//GET ROUTES
router.get('/session/:session_id',auth ,fileChangeController.getFileChangeEventsBySessionController); // tested
router.get('/:file_id',auth ,fileChangeController.getFileChangeEventsByFileController); //tested


module.exports = router;

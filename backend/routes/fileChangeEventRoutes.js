const express = require('express');
const fileChangeController = require('../src/FileChangeEvent/fileChangeEventController');

const router = express.Router();


//POST ROUTES
router.post('/', fileChangeController.logFileChangeEventController); // tested

//GET ROUTES
router.get('/session/:session_id', fileChangeController.getFileChangeEventsBySessionController); // tested
router.get('/:file_id', fileChangeController.getFileChangeEventsByFileController); //tested


module.exports = router;
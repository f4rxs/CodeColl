const express = require('express');
const {
    logFileChangeEventController,
    getFileChangeEventsBySessionController,
    getFileChangeEventsByFileController
} = require('../controllers/fileChangeEventController');

const router = express.Router();

router.post('/file-change-event', logFileChangeEventController); // tested

router.get('/file-change-event/session/:session_id', getFileChangeEventsBySessionController); // tested

router.get('/file-change-event/file/:file_id', getFileChangeEventsByFileController); //tested

module.exports = router;
const express = require('express');
const {
    sendMessageController,
    getChatBySessionController,
    getChatByUserInSessionController
} = require('../controllers/chatController');

const router = express.Router();

router.post('/chat', sendMessageController); //tested

router.get('/chat/session/:session_id', getChatBySessionController); //tested

router.get('/chat/session/:session_id/user/:user_id', getChatByUserInSessionController); // tested

module.exports = router;
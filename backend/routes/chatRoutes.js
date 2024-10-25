const express = require('express');
const chatController= require('../src/Chat/chatController');

const router = express.Router();

//GET ROUTES
router.get('/session/:session_id', chatController.getChatBySessionController); //tested
router.get('/session/:session_id/user/:user_id', chatController.getChatByUserInSessionController); // tested

//POST ROUTES
router.post('/', chatController.sendMessageController); //tested



module.exports = router;
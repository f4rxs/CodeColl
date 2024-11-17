const express = require('express');
const chatController= require('../src/Chat/chatController');

const router = express.Router();
const auth = require('../middleware/auth');
//GET ROUTES
router.get('/session/:session_id',auth ,chatController.getChatBySessionController); //tested
router.get('/session/:session_id/user/:user_id',auth ,chatController.getChatByUserInSessionController); // tested

//POST ROUTES
router.post('/', chatController.sendMessageController); //tested



module.exports = router;
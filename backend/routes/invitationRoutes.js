const express = require('express');
const invationController = require('../src/Invitation/invitationController');
const authMiddleware  =require('../middleware/auth');

const router = express.Router();

//GET ROUTES 
router.get('/:inviterId', invationController.findInvitationsByUserController); //tested*
router.get('/invitations/pending', invationController.findAllPendingInvitationsController); //tested*

//POST ROUTES
router.post('/', authMiddleware,invationController.sendInvitationController); //tested*

//PUT ROUTES
router.put('/:invitationId/respond', invationController.respondToInvitationController); //tested*

//DELETE ROUTES
router.delete('/:invitationId', invationController.cancelInvitationController);//tested*


module.exports = router;
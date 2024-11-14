const express = require('express');
const invationController = require('../src/Invitation/invitationController');
const authMiddleware = require('../middleware/auth');
const validateRequest = require('../utils/validateRequest');
const {
    validateUserId,
    validateInvitationId,
    validateInvitationBody,
    validateResponseStatus,
} = require('../src/Invitation/invitationValidator');

const router = express.Router();

//GET ROUTES 
router.get('/:inviterId', validateUserId, validateRequest, invationController.findInvitationsByUserController); //tested*
router.get('/invitations/pending', invationController.findAllPendingInvitationsController); //tested*
router.get('/user/:inviteeId',invationController.findPendingInvitationForUserController);

//POST ROUTES
router.post('/', authMiddleware, validateRequest, invationController.sendInvitationController); //tested*

//PUT ROUTES
router.put('/:invitationId/respond', validateResponseStatus, validateRequest, invationController.respondToInvitationController); //tested*

//DELETE ROUTES
router.delete('/:invitationId', validateInvitationId, validateRequest, invationController.cancelInvitationController);//tested*


module.exports = router;
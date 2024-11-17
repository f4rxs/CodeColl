const express = require('express');
const invationController = require('../src/Invitation/invitationController');
const validateRequest = require('../utils/validateRequest');
const {
    validateUserId,
    validateInvitationId,
    validateInvitationBody,
    validateResponseStatus,
} = require('../src/Invitation/invitationValidator');

const router = express.Router();
const auth = require('../middleware/auth');
//GET ROUTES 
router.get('/:inviterId',auth ,validateUserId, validateRequest, invationController.findInvitationsByUserController); //tested*
router.get('/invitations/pending',auth ,invationController.findAllPendingInvitationsController); //tested*
router.get('/user/:inviteeId',invationController.findPendingInvitationForUserController);

//POST ROUTES
router.post('/',auth ,validateRequest, invationController.sendInvitationController); //tested*

//PUT ROUTES
router.put('/:invitationId/respond',auth ,validateResponseStatus, validateRequest, invationController.respondToInvitationController); //tested*

//DELETE ROUTES
router.delete('/:invitationId',auth ,validateInvitationId, validateRequest, invationController.cancelInvitationController);//tested*


module.exports = router;
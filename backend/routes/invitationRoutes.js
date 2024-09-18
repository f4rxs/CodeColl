const express = require('express');
const {
    sendInvitationController,
    findInvitationsByUserController,
    respondToInvitationController,
    cancelInvitationController,
    findAllPendingInvitationsController
} = require('../controllers/invitationController');

const router = express.Router();

router.post('/invitation', sendInvitationController); // not wokring

router.get('/invitations/:userId', findInvitationsByUserController); // not working

router.put('/invitation/:invitationId/respond', respondToInvitationController); 

router.delete('/invitation/:invitationId', cancelInvitationController);

router.get('/invitations/pending', findAllPendingInvitationsController);

module.exports = router;
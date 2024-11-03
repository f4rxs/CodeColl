const { param, body } = require('express-validator');

const allowedStatuses = ['pending', 'accepted'];

const validateUserId = param('inviterId')
    .isInt()
    .withMessage('Inviter ID must be an integer');

const validateInvitationId = param('invitationId')
    .isInt()
    .withMessage('Invitation ID must be an integer');

const validateInvitationBody = [
    body('invitee_id')
        .isInt()
        .withMessage('Invitee ID must be an integer'),
    body('project_id')
        .isInt()
        .withMessage('Project ID must be an integer')
];

const validateResponseStatus = body('response')
    .isString()
    .isIn(allowedStatuses)
    .withMessage(`Status must be one of the following: ${allowedStatuses.join(', ')}`);

module.exports = {
    validateUserId,
    validateInvitationId,
    validateInvitationBody,
    validateResponseStatus,
};